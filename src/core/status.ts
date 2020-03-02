import { files, resync } from "@core";
import { registerModules, staff } from "@modules";
import {
	day,
	isOnline,
	minute,
	num,
	second,
	store
	} from "@utils";
import { observable } from "mobx";
import { Md5 } from "ts-md5";

const demoHosts: string[] = [
	"localhost:8000",
	"demo.apexo.app",
	"192.168.0.101:8000",
	"192.168.0.102:8000"
];

export enum LoginStep {
	loadingData,
	allDone,
	chooseUser,
	initial
}

class Status {
	@observable server: string = "";
	@observable currentUserID: string = "";

	@observable keepOffline = false;

	@observable step: LoginStep = LoginStep.initial;

	@observable online: boolean = false;

	@observable dropboxActive: boolean = false;

	@observable tryOffline: boolean = false;

	constructor() {
		setInterval(() => this.validateOnlineStatus(), second * 2);

		setTimeout(() => this.validateDropBoxToken(), second * 5); // initial

		setInterval(() => this.validateDropBoxToken(), minute); // then every minute
	}

	async initialCheck(server: string) {
		// If we're on a demo host
		if (demoHosts.indexOf(location.host) !== -1) {
			console.log("Login: Demo mode");
			return await this.startDemoServer();
		}

		// if we're running on no server mode
		if (store.found("no_server_mode")) {
			console.log("Login: No server mode");
			return await this.startNoServer();
		}

		this.server = server;

		const activeSession = await this.activeSession(this.server);

		if (navigator.onLine) {
			if (activeSession) {
				console.log("Login: using active session");
				await this.start({ server });
				store.set("LSL_TS", new Date().getTime().toString());
			}
		} else if (store.found("LSL_hash")) {
			const now = new Date().getTime();
			const then = new Date(num(store.get("LSL_TS"))).getTime();
			if (now - then < 7 * day) {
				this.start({ server });
			}
		}
	}

	async loginWithCredentials({
		username,
		password,
		server
	}: {
		username: string;
		password: string;
		server: string;
	}) {
		if (!navigator.onLine && store.found("LSL_hash")) {
			return this.loginWithCredentialsOffline({
				username,
				password,
				server
			});
		}

		const onlineServer = await isOnline(server);

		if (navigator.onLine && onlineServer) {
			return this.loginWithCredentialsOnline({
				username,
				password,
				server
			});
		} else {
			if (store.found("LSL_hash")) {
				this.tryOffline = true;
			}
			return `
				An error occured, please make sure that the server is online and it\'s accessible.
				Click "change" to change into another server
			`;
		}
	}

	async loginWithCredentialsOnline({
		username,
		password,
		server
	}: {
		username: string;
		password: string;
		server: string;
	}) {
		const PouchDB: PouchDB.Static = ((await import("pouchdb-browser")) as any)
			.default;
		const auth: PouchDB.Plugin = ((await import("pouchdb-authentication")) as any)
			.default;
		PouchDB.plugin(auth);

		try {
			await new PouchDB(server, { skip_setup: true }).logIn(
				username,
				password
			);
			store.set(
				"LSL_hash",
				Md5.hashStr(server + username + password).toString()
			);
			store.set("LSL_TS", new Date().getTime().toString());
			this.start({ server });
			return true;
		} catch (e) {
			console.error(e);
			return (e.reason as string) || "Could not login";
		}
	}

	async loginWithCredentialsOffline({
		username,
		password,
		server
	}: {
		username: string;
		password: string;
		server: string;
	}) {
		const LSL_hash = store.get("LSL_hash");
		if (LSL_hash === Md5.hashStr(server + username + password).toString()) {
			this.start({ server });
			return true;
		} else {
			return "This was not the last username/password combination you used!";
		}
	}

	async startDemoServer() {
		await this.startNoServer();
		(await import("core/demo")).loadDemoData();
	}

	async startNoServer() {
		this.online = false;
		this.keepOffline = true;
		await this.start({
			server: "http://apexo-no-server-mode"
		});
		store.set("LSL_hash", Md5.hashStr("no server mode").toString());
		store.set("no_server_mode", "true");
	}

	async start({ server }: { server: string }) {
		this.server = server;
		store.set("server_location", server);
		this.step = LoginStep.loadingData;
		try {
			await registerModules();
		} catch (e) {
			console.log("Registering modules failed", e);
		}
		if (!this.checkUserID()) {
			this.step = LoginStep.chooseUser;
		}
	}
	async logout() {
		const PouchDB: PouchDB.Static = ((await import("pouchdb-browser")) as any)
			.default;
		const auth: PouchDB.Plugin = ((await import("pouchdb-authentication")) as any)
			.default;
		PouchDB.plugin(auth);
		if (navigator.onLine && !this.keepOffline) {
			try {
				await new PouchDB(this.server, { skip_setup: true }).logOut();
			} catch (e) {
				console.log("Failed to logout", e);
			}
		}
		store.clear();
		location.reload();
	}

	checkUserID() {
		const userID = store.get("user_id");
		if (userID && staff.getIndexByID(userID) !== -1) {
			this.setUser(userID);
			return true;
		} else {
			return false;
		}
	}
	resetUser() {
		this.step = LoginStep.chooseUser;
		this.currentUserID = "";
		store.remove("user_id");
	}
	setUser(id: string) {
		this.currentUserID = id;
		this.step = LoginStep.allDone;
		store.set("user_id", id);
	}

	validateDropBoxToken() {
		files
			.status()
			.then(x => {
				this.dropboxActive = true;
			})
			.catch(e => {
				this.dropboxActive = false;
			});
	}

	async activeSession(server: string) {
		const PouchDB: PouchDB.Static = ((await import("pouchdb-browser")) as any)
			.default;
		const auth: PouchDB.Plugin = ((await import("pouchdb-authentication")) as any)
			.default;
		PouchDB.plugin(auth);
		try {
			if (navigator.onLine && (await isOnline(server))) {
				return !!(await new PouchDB(server, {
					skip_setup: true
				}).getSession()).userCtx.name;
			}
		} catch (e) {}
		return false;
	}

	validateOnlineStatus() {
		if (this.keepOffline) {
			return;
		}
		isOnline(this.server).then(online => {
			if (online && !this.online) {
				console.log("getting back online");
				resync.resync();
			}
			this.online = online;
		});
	}
}

export const status = new Status();
