import { Col, DataTableComponent, ProfileSquaredComponent, Row, SectionComponent } from "@common-components";
import { router, text, user } from "@core";
import { itemFormToString, PrescriptionItem, prescriptionItemForms, prescriptions, stringToItemForm } from "@modules";
import { num } from "@utils";
import { computed, observable } from "mobx";
import { observer } from "mobx-react";
import { Dropdown, IconButton, Panel, PanelType, TextField } from "office-ui-fabric-react";
import {  Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from "office-ui-fabric-react";
import PrintPrescriptionPage from "./dialog";
import * as React from "react";

@observer
export class PrescriptionsPage extends React.Component<{}, {}> {
	@observable showMenu: boolean = true;

	@observable selectedID: string = router.currentLocation.split("/")[1];

	@computed
	get selectedIndex() {
		return prescriptions.list.findIndex(x => x._id === this.selectedID);
	}

	@computed
	get selectedPrescription() {
		return prescriptions.list[this.selectedIndex];
	}

	@computed get canEdit() {
		return user.currentUser.canEditPrescriptions;
	}

	render() {
		return (
			<div className="pc-pg p-15 p-l-10 p-r-10">
				<DataTableComponent
					onPrint={this.canEdit
						? id => 
							{
								<Dialog
            hidden={false}
            //onDismiss={this.props.onDismiss}
            dialogContentProps={{
                type: DialogType.largeHeader,
                title: 'Type your Name and Upload an Icon as A Dentist',
                subText: 'Follow instructions'
            }}
            modalProps={{
                isBlocking: false,
                styles: { main: { maxWidth: 450 } }
            }}
            >
                                    <TextField
											label="Dentist's Name: "
											type="text"
											
										/>
                                    <br/>
                                    <TextField
											label="Print Logo: "
											type="file"
											
										/>
            
             
            </Dialog>
							}		
					  
					: undefined}
					onDelete={
						this.canEdit
							? id => {
									prescriptions.deleteModal(id);
							  }
							: undefined
					}
					commands={
						this.canEdit
							? [
									{
										key: "addNew",
										title: "Add new",
										name: text("Add new"),
										onClick: () => {
											const prescription = new PrescriptionItem();
											prescriptions.list.push(
												prescription
											);
											this.selectedID = prescription._id;
										},
										iconProps: {
											iconName: "Add"
										}
									}
							  ]
							: []
					}
					heads={[
						text("Item name"),
						text("Dose"),
						text("Frequency"),
						text("Form")
					]}
					rows={prescriptions.list.map(prescription => {
						return {
							id: prescription._id,
							searchableString: prescription.searchableString,
							cells: [
								{
									dataValue: prescription.name,
									component: (
										<ProfileSquaredComponent
											text={prescription.name}
											subText={`${
												prescription.doseInMg
											}${text("mg")} ${
												prescription.timesPerDay
											}X${
												prescription.unitsPerTime
											} ${text(
												itemFormToString(
													prescription.form
												)
											)}`}
										/>
									),
									onClick: () => {
										this.selectedID = prescription._id;
									},
									className: "no-label"
								},
								{
									dataValue: prescription.doseInMg,
									component: (
										<span>
											{prescription.doseInMg} {text("mg")}
										</span>
									),
									className: "hidden-xs"
								},
								{
									dataValue: prescription.timesPerDay,
									component: (
										<span>
											{prescription.timesPerDay} *{" "}
											{prescription.unitsPerTime}
										</span>
									),
									className: "hidden-xs"
								},
								{
									dataValue: prescription.form,
									component: (
										<span>
											{text(
												itemFormToString(
													prescription.form
												)
											)}
										</span>
									),
									className: "hidden-xs"
								}
							]
						};
					})}
					maxItemsOnLoad={20}
				/>

				{this.selectedPrescription ? (
					<Panel
						isOpen={!!this.selectedPrescription}
						type={PanelType.medium}
						closeButtonAriaLabel="Close"
						isLightDismiss={true}
						onDismiss={() => {
							this.selectedID = "";
						}}
						onRenderNavigation={() => (
							<Row className="panel-heading">
								<Col span={20}>
									{this.selectedPrescription ? (
										<ProfileSquaredComponent
											text={
												this.selectedPrescription.name
											}
											subText={`${
												this.selectedPrescription
													.doseInMg
											}${text("mg")} ${
												this.selectedPrescription
													.timesPerDay
											}X${
												this.selectedPrescription
													.unitsPerTime
											} ${text(
												itemFormToString(
													this.selectedPrescription
														.form
												)
											)}`}
										/>
									) : (
										<p />
									)}
								</Col>
								<Col span={4} className="close">
									<IconButton
										iconProps={{ iconName: "cancel" }}
										onClick={() => {
											this.selectedID = "";
										}}
									/>
								</Col>
							</Row>
						)}
					>
						<div className="prescription-editor">
							<SectionComponent
								title={text("Prescription Details")}
							>
								<TextField
									label={text("Item name")}
									value={this.selectedPrescription.name}
									onChange={(ev, val) =>
										(prescriptions.list[
											this.selectedIndex
										].name = val!)
									}
									disabled={!this.canEdit}
								/>

								<Row gutter={6}>
									<Col md={8}>
										<TextField
											label={text("Dosage in mg")}
											type="number"
											value={this.selectedPrescription.doseInMg.toString()}
											onChange={(ev, val) =>
												(prescriptions.list[
													this.selectedIndex
												].doseInMg = num(val!))
											}
											disabled={!this.canEdit}
										/>
									</Col>
									<Col md={8}>
										<TextField
											label={text("Times per day")}
											type="number"
											value={this.selectedPrescription.timesPerDay.toString()}
											onChange={(ev, val) =>
												(prescriptions.list[
													this.selectedIndex
												].timesPerDay = num(val!))
											}
											disabled={!this.canEdit}
										/>
									</Col>
									<Col md={8}>
										<TextField
											label={text("Units per time")}
											type="number"
											value={this.selectedPrescription.unitsPerTime.toString()}
											onChange={(ev, val) =>
												(prescriptions.list[
													this.selectedIndex
												].unitsPerTime = num(val!))
											}
											disabled={!this.canEdit}
										/>
									</Col>
								</Row>
								<Dropdown
									disabled={!this.canEdit}
									label={text("Item form")}
									className="form-picker"
									selectedKey={itemFormToString(
										this.selectedPrescription.form
									)}
									options={prescriptionItemForms.map(form => {
										return {
											key: form,
											text: text(form)
										};
									})}
									onChange={(ev, newValue) => {
										prescriptions.list[
											this.selectedIndex
										].form = stringToItemForm(
											newValue!.text
										);
									}}
								/>
								 <TextField label="Notes" multiline rows={4} value={this.selectedPrescription.notes.toString()}  
									onChange={(ev, val) =>
										(prescriptions.list[
											this.selectedIndex
										].notes = val!)
									} />
							</SectionComponent>
						</div>
					</Panel>
				) : (
					""
				)}
			</div>
		);
	}
}
