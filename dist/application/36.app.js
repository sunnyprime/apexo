(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[36],{

/***/ "./src/modules/prescriptions/components/page.prescriptions.tsx":
/*!*********************************************************************!*\
  !*** ./src/modules/prescriptions/components/page.prescriptions.tsx ***!
  \*********************************************************************/
/*! exports provided: PrescriptionsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PrescriptionsPage\", function() { return PrescriptionsPage; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @common-components */ \"./src/common-components/index.ts\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core */ \"./src/core/index.ts\");\n/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @modules */ \"./src/modules/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @utils */ \"./src/utils/index.ts\");\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mobx */ \"./node_modules/mobx/lib/mobx.module.js\");\n/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mobx-react */ \"./node_modules/mobx-react/index.module.js\");\n/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! office-ui-fabric-react */ \"./node_modules/office-ui-fabric-react/lib/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\n\nlet PrescriptionsPage = class PrescriptionsPage extends react__WEBPACK_IMPORTED_MODULE_8__[\"Component\"] {\n    constructor() {\n        super(...arguments);\n        this.showMenu = true;\n        this.selectedID = _core__WEBPACK_IMPORTED_MODULE_2__[\"router\"].currentLocation.split(\"/\")[1];\n    }\n    get selectedIndex() {\n        return _modules__WEBPACK_IMPORTED_MODULE_3__[\"prescriptions\"].list.findIndex(x => x._id === this.selectedID);\n    }\n    get selectedPrescription() {\n        return _modules__WEBPACK_IMPORTED_MODULE_3__[\"prescriptions\"].list[this.selectedIndex];\n    }\n    get canEdit() {\n        return _core__WEBPACK_IMPORTED_MODULE_2__[\"user\"].currentUser.canEditPrescriptions;\n    }\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"div\", { className: \"pc-pg p-15 p-l-10 p-r-10\" },\n            react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"DataTableComponent\"], { onPrint: this.canEdit\n                    ? id => {\n                        react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Dialog\"], { hidden: false, \n                            //onDismiss={this.props.onDismiss}\n                            dialogContentProps: {\n                                type: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"DialogType\"].largeHeader,\n                                title: 'Type your Name and Upload an Icon as A Dentist',\n                                subText: 'Follow instructions'\n                            }, modalProps: {\n                                isBlocking: false,\n                                styles: { main: { maxWidth: 450 } }\n                            } },\n                            react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TextField\"], { label: \"Dentist's Name: \", type: \"text\" }),\n                            react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"br\", null),\n                            react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TextField\"], { label: \"Print Logo: \", type: \"file\" }));\n                    }\n                    : undefined, onDelete: this.canEdit\n                    ? id => {\n                        _modules__WEBPACK_IMPORTED_MODULE_3__[\"prescriptions\"].deleteModal(id);\n                    }\n                    : undefined, commands: this.canEdit\n                    ? [\n                        {\n                            key: \"addNew\",\n                            title: \"Add new\",\n                            name: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Add new\"),\n                            onClick: () => {\n                                const prescription = new _modules__WEBPACK_IMPORTED_MODULE_3__[\"PrescriptionItem\"]();\n                                _modules__WEBPACK_IMPORTED_MODULE_3__[\"prescriptions\"].list.push(prescription);\n                                this.selectedID = prescription._id;\n                            },\n                            iconProps: {\n                                iconName: \"Add\"\n                            }\n                        }\n                    ]\n                    : [], heads: [\n                    Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Item name\"),\n                    Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Dose\"),\n                    Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Frequency\"),\n                    Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Form\")\n                ], rows: _modules__WEBPACK_IMPORTED_MODULE_3__[\"prescriptions\"].list.map(prescription => {\n                    return {\n                        id: prescription._id,\n                        searchableString: prescription.searchableString,\n                        cells: [\n                            {\n                                dataValue: prescription.name,\n                                component: (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileSquaredComponent\"], { text: prescription.name, subText: `${prescription.doseInMg}${Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"mg\")} ${prescription.timesPerDay}X${prescription.unitsPerTime} ${Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(Object(_modules__WEBPACK_IMPORTED_MODULE_3__[\"itemFormToString\"])(prescription.form))}` })),\n                                onClick: () => {\n                                    this.selectedID = prescription._id;\n                                },\n                                className: \"no-label\"\n                            },\n                            {\n                                dataValue: prescription.doseInMg,\n                                component: (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"span\", null,\n                                    prescription.doseInMg,\n                                    \" \",\n                                    Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"mg\"))),\n                                className: \"hidden-xs\"\n                            },\n                            {\n                                dataValue: prescription.timesPerDay,\n                                component: (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"span\", null,\n                                    prescription.timesPerDay,\n                                    \" *\",\n                                    \" \",\n                                    prescription.unitsPerTime)),\n                                className: \"hidden-xs\"\n                            },\n                            {\n                                dataValue: prescription.form,\n                                component: (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"span\", null, Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(Object(_modules__WEBPACK_IMPORTED_MODULE_3__[\"itemFormToString\"])(prescription.form)))),\n                                className: \"hidden-xs\"\n                            }\n                        ]\n                    };\n                }), maxItemsOnLoad: 20 }),\n            this.selectedPrescription ? (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Panel\"], { isOpen: !!this.selectedPrescription, type: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PanelType\"].medium, closeButtonAriaLabel: \"Close\", isLightDismiss: true, onDismiss: () => {\n                    this.selectedID = \"\";\n                }, onRenderNavigation: () => (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Row\"], { className: \"panel-heading\" },\n                    react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], { span: 20 }, this.selectedPrescription ? (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileSquaredComponent\"], { text: this.selectedPrescription.name, subText: `${this.selectedPrescription\n                            .doseInMg}${Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"mg\")} ${this.selectedPrescription\n                            .timesPerDay}X${this.selectedPrescription\n                            .unitsPerTime} ${Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(Object(_modules__WEBPACK_IMPORTED_MODULE_3__[\"itemFormToString\"])(this.selectedPrescription\n                            .form))}` })) : (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"p\", null))),\n                    react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], { span: 4, className: \"close\" },\n                        react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { iconProps: { iconName: \"cancel\" }, onClick: () => {\n                                this.selectedID = \"\";\n                            } })))) },\n                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"div\", { className: \"prescription-editor\" },\n                    react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"SectionComponent\"], { title: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Prescription Details\") },\n                        react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TextField\"], { label: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Item name\"), value: this.selectedPrescription.name, onChange: (ev, val) => (_modules__WEBPACK_IMPORTED_MODULE_3__[\"prescriptions\"].list[this.selectedIndex].name = val), disabled: !this.canEdit }),\n                        react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Row\"], { gutter: 6 },\n                            react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], { md: 8 },\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TextField\"], { label: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Dosage in mg\"), type: \"number\", value: this.selectedPrescription.doseInMg.toString(), onChange: (ev, val) => (_modules__WEBPACK_IMPORTED_MODULE_3__[\"prescriptions\"].list[this.selectedIndex].doseInMg = Object(_utils__WEBPACK_IMPORTED_MODULE_4__[\"num\"])(val)), disabled: !this.canEdit })),\n                            react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], { md: 8 },\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TextField\"], { label: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Times per day\"), type: \"number\", value: this.selectedPrescription.timesPerDay.toString(), onChange: (ev, val) => (_modules__WEBPACK_IMPORTED_MODULE_3__[\"prescriptions\"].list[this.selectedIndex].timesPerDay = Object(_utils__WEBPACK_IMPORTED_MODULE_4__[\"num\"])(val)), disabled: !this.canEdit })),\n                            react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], { md: 8 },\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TextField\"], { label: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Units per time\"), type: \"number\", value: this.selectedPrescription.unitsPerTime.toString(), onChange: (ev, val) => (_modules__WEBPACK_IMPORTED_MODULE_3__[\"prescriptions\"].list[this.selectedIndex].unitsPerTime = Object(_utils__WEBPACK_IMPORTED_MODULE_4__[\"num\"])(val)), disabled: !this.canEdit }))),\n                        react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Dropdown\"], { disabled: !this.canEdit, label: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Item form\"), className: \"form-picker\", selectedKey: Object(_modules__WEBPACK_IMPORTED_MODULE_3__[\"itemFormToString\"])(this.selectedPrescription.form), options: _modules__WEBPACK_IMPORTED_MODULE_3__[\"prescriptionItemForms\"].map(form => {\n                                return {\n                                    key: form,\n                                    text: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(form)\n                                };\n                            }), onChange: (ev, newValue) => {\n                                _modules__WEBPACK_IMPORTED_MODULE_3__[\"prescriptions\"].list[this.selectedIndex].form = Object(_modules__WEBPACK_IMPORTED_MODULE_3__[\"stringToItemForm\"])(newValue.text);\n                            } }),\n                        react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TextField\"], { label: \"Notes\", multiline: true, rows: 4, value: this.selectedPrescription.notes.toString(), onChange: (ev, val) => (_modules__WEBPACK_IMPORTED_MODULE_3__[\"prescriptions\"].list[this.selectedIndex].notes = val) }))))) : (\"\")));\n    }\n};\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"observable\"]\n], PrescriptionsPage.prototype, \"showMenu\", void 0);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"observable\"]\n], PrescriptionsPage.prototype, \"selectedID\", void 0);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"computed\"]\n], PrescriptionsPage.prototype, \"selectedIndex\", null);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"computed\"]\n], PrescriptionsPage.prototype, \"selectedPrescription\", null);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"computed\"]\n], PrescriptionsPage.prototype, \"canEdit\", null);\nPrescriptionsPage = tslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx_react__WEBPACK_IMPORTED_MODULE_6__[\"observer\"]\n], PrescriptionsPage);\n\n\n\n//# sourceURL=webpack:///./src/modules/prescriptions/components/page.prescriptions.tsx?");

/***/ })

}]);