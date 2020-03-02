var webpack = require("webpack");
var production = process.argv.find(x => x === "-p");
var fs = require("fs");

var nonJSAssets = [
	"style.css",
	"fonts/fabric-icons-d40e9e78.woff",
	"fonts/segoeui-westeuropean/segoeui-light.woff",
	"fonts/segoeui-westeuropean/segoeui-light.woff2",
	"fonts/segoeui-westeuropean/segoeui-regular.woff",
	"fonts/segoeui-westeuropean/segoeui-regular.woff2",
	"fonts/segoeui-westeuropean/segoeui-semibold.woff",
	"fonts/segoeui-westeuropean/segoeui-semibold.woff2",
	"fonts/segoeui-westeuropean/segoeui-semilight.woff",
	"fonts/segoeui-westeuropean/segoeui-semilight.woff2"
];

var processHTML = {
	apply: compiler => {
		compiler.hooks.afterEmit.tap("AfterEmitPlugin", compilation => {
			const assets = JSON.stringify(
				Object.keys(compilation.assets).concat(nonJSAssets)
			).replace(/\[|\]/g, "");
			const HTMLFile = fs.readFileSync("./src/index.html", {
				encoding: "utf8"
			});
			fs.writeFileSync(
				"./dist/application/index.html",
				HTMLFile.replace("/*ASSETS_PLACEHOLDER*/", assets)
			);
		});
	}
};

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
	entry: "./src/app.tsx",
	output: {
		filename: "app.js",
		path: __dirname + "/dist/application"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss"],
		plugins: [new TsconfigPathsPlugin({})]
	},
	externals: {
		moment: "moment"
	},
	mode:  "development",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader"
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.css$/,  
				include: /node_modules/,  
				loaders: ['style-loader', 'css-loader'],
		   }
		]
	},

	plugins: production
		? [
				processHTML,
				new webpack.DefinePlugin({
					"process.env.NODE_ENV": JSON.stringify("production")
				})
		  ]
		: [processHTML]
};
