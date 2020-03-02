(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./src/modules/endodontic/components/cephalometric.tsx":
/*!*************************************************************!*\
  !*** ./src/modules/endodontic/components/cephalometric.tsx ***!
  \*************************************************************/
/*! exports provided: CephalometricEditorPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CephalometricEditorPanel\", function() { return CephalometricEditorPanel; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @common-components */ \"./src/common-components/index.ts\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core */ \"./src/core/index.ts\");\n/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @modules */ \"./src/modules/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @utils */ \"./src/utils/index.ts\");\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mobx */ \"./node_modules/mobx/lib/mobx.module.js\");\n/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mobx-react */ \"./node_modules/mobx-react/index.module.js\");\n/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! office-ui-fabric-react */ \"./node_modules/office-ui-fabric-react/lib/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\nlet CephalometricEditorPanel = class CephalometricEditorPanel extends react__WEBPACK_IMPORTED_MODULE_8__[\"Component\"] {\n    constructor() {\n        super(...arguments);\n        this.loading = true;\n    }\n    componentDidMount() {\n        setTimeout(() => tslib__WEBPACK_IMPORTED_MODULE_0__[\"__awaiter\"](this, void 0, void 0, function* () {\n            const iFrame = document.getElementById(\"cephalometric\");\n            iFrame.onload = () => {\n                _modules__WEBPACK_IMPORTED_MODULE_3__[\"endoCases\"].toCephString(this.props.item).then(cephString => {\n                    iFrame.contentWindow.postMessage(\"cephalometric-open:\" + cephString, \"*\");\n                    this.loading = false;\n                });\n            };\n            // wait for response\n            onmessage = e => {\n                if (e.data && typeof e.data === \"string\") {\n                    if (e.data.startsWith(\"cephalometric-save:\")) {\n                        this.props.item.pointCoordinates = _modules__WEBPACK_IMPORTED_MODULE_3__[\"endoCases\"].getCephCoordinates(e.data.split(\"cephalometric-save:\")[1]);\n                        this.props.onDismiss();\n                        _modules__WEBPACK_IMPORTED_MODULE_3__[\"endoCases\"].triggerUpdate++;\n                    }\n                }\n            };\n        }), 100);\n    }\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Panel\"], { isOpen: !!this.props.item, type: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PanelType\"].largeFixed, closeButtonAriaLabel: \"Close\", isLightDismiss: true, onDismiss: () => {\n                this.props.onDismiss();\n            }, className: \"ex-pnl\", onRenderNavigation: () => {\n                return (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Row\"], { className: \"panel-heading\" },\n                    react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], { span: 22 },\n                        react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"input\", { style: {\n                                height: 0,\n                                width: 0,\n                                position: \"absolute\"\n                            } }),\n                        react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"DatePicker\"], { placeholder: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Select a date\"), value: new Date(this.props.item.date), onSelectDate: date => {\n                                if (date) {\n                                    this.props.item.date = new Date(date).getTime();\n                                }\n                            }, formatDate: d => Object(_utils__WEBPACK_IMPORTED_MODULE_4__[\"formatDate\"])(d || 0, _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"date_format\")) })),\n                    react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], { span: 2, className: \"close\" },\n                        react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { iconProps: { iconName: \"cancel\" }, onClick: () => {\n                                this.props.onDismiss();\n                            } }))));\n            } },\n            react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"iframe\", { style: { display: this.loading ? \"none\" : \"block\" }, id: \"cephalometric\", src: \"https://cephalometric.apexo.app\" }),\n            this.loading ? (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"div\", { style: {\n                    fontSize: 38,\n                    marginTop: 60,\n                    textAlign: \"center\"\n                } },\n                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Icon\"], { iconName: \"sync\", className: \"rotate\" }))) : (\"\")));\n    }\n};\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"observable\"]\n], CephalometricEditorPanel.prototype, \"loading\", void 0);\nCephalometricEditorPanel = tslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx_react__WEBPACK_IMPORTED_MODULE_6__[\"observer\"]\n], CephalometricEditorPanel);\n\n\n\n//# sourceURL=webpack:///./src/modules/endodontic/components/cephalometric.tsx?");

/***/ })

}]);