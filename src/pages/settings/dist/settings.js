"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var moment_1 = require("moment");
var header_1 = require("../../component/header/header");
var loader_1 = require("../../component/loader/loader");
var menu_1 = require("../../component/menu/menu");
var auth_service_1 = require("../../service/auth.service");
require("./settings.css");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_i18next_1 = require("react-i18next");
var errorComponent_1 = require("../../component/error/errorComponent");
var goBack_1 = require("../../component/goBack/goBack");
function Settings() {
    var _this = this;
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useState(''), email = _a[0], setMailAddress = _a[1];
    var _b = react_1.useState(''), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(''), userName = _c[0], setUserName = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = react_1.useState(false), isModify = _e[0], setIsModify = _e[1];
    var _f = react_1.useState(''), memberSince = _f[0], setMemberSince = _f[1];
    var t = react_i18next_1.useTranslation().t;
    var _g = react_1.useState({}), informationMe = _g[0], setInformationMe = _g[1];
    var _h = react_1.useState(false), error = _h[0], setError = _h[1];
    var _j = react_1.useState({}), errorMessage = _j[0], setErrorMessage = _j[1];
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, getInfo()];
                    case 1:
                        _a.sent();
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    function getInfo() {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, auth_service_1.InformationMe()];
                    case 1:
                        user = _a.sent();
                        if ((user === null || user === void 0 ? void 0 : user.code) == 200 && (user === null || user === void 0 ? void 0 : user.dataUser)) {
                            setError(false);
                            setInformationMe(user.dataUser);
                            setMemberSince(moment_1["default"](user.dataUser.creationDate, "YYYYMMDD").fromNow());
                            console.log(memberSince);
                        }
                        else {
                            setError(true);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    var handleSubmit = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var body, modifySuccess;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    console.log(event);
                    body = {
                        userName: userName || (informationMe === null || informationMe === void 0 ? void 0 : informationMe.userName),
                        email: email || null,
                        password: password || (informationMe === null || informationMe === void 0 ? void 0 : informationMe.password)
                    };
                    console.log("J'envoie mes données à la route adéquat");
                    return [4 /*yield*/, auth_service_1.UpdateInformationMe(body)];
                case 1:
                    modifySuccess = _a.sent();
                    console.log(modifySuccess);
                    if (modifySuccess.code === 200) {
                        setError(false);
                        navigate('/');
                    }
                    else {
                        console.log("Erreur lors de la modification");
                        setErrorMessage(modifySuccess.dataUser);
                        setError(true);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var deconnect = function (event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            event.preventDefault();
            console.log(event);
            navigate('/login');
            localStorage.clear();
            return [2 /*return*/];
        });
    }); };
    var modifyInformation = function (event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            event.preventDefault();
            setIsModify(true);
            return [2 /*return*/];
        });
    }); };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "settings" }, !loading &&
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(header_1["default"], { barCodeScannerIsTrue: false }),
                react_1["default"].createElement(goBack_1["default"], { name: t('My settings') }),
                react_1["default"].createElement("div", { className: "centerDiv" },
                    !isModify &&
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("div", { className: 'settingsCards' },
                                react_1["default"].createElement("div", { className: 'divButtonModify' },
                                    react_1["default"].createElement("button", { className: 'buttonModify', onClick: modifyInformation },
                                        react_1["default"].createElement("i", { className: "fa-solid fa-pen-to-square fa-lg" }))),
                                react_1["default"].createElement("div", null,
                                    t('Username'),
                                    " : ",
                                    informationMe.userName),
                                react_1["default"].createElement("br", null),
                                react_1["default"].createElement("div", null,
                                    t('Mail Address'),
                                    " : ",
                                    informationMe.email),
                                react_1["default"].createElement("br", null),
                                react_1["default"].createElement("div", null,
                                    t('Password'),
                                    " : **********"),
                                react_1["default"].createElement("br", null),
                                react_1["default"].createElement("div", null,
                                    t('Member since'),
                                    " : ",
                                    memberSince))),
                    isModify &&
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("form", { className: 'settingsModify' },
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("label", { className: "label" },
                                        t('Username'),
                                        " :"),
                                    react_1["default"].createElement("br", null),
                                    react_1["default"].createElement("input", { type: "text", name: "text", defaultValue: informationMe.userName, onChange: function (e) { return setUserName(e.target.value); }, className: "settingsFormInput" })),
                                react_1["default"].createElement("br", null),
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("label", { className: "label" },
                                        t('Mail Address'),
                                        " :"),
                                    react_1["default"].createElement("br", null),
                                    react_1["default"].createElement("input", { type: "text", name: "email", defaultValue: informationMe.email, onChange: function (e) { return setMailAddress(e.target.value); }, className: "settingsFormInput" })),
                                react_1["default"].createElement("br", null),
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("label", { className: "label" },
                                        t('Password'),
                                        " :"),
                                    react_1["default"].createElement("br", null),
                                    react_1["default"].createElement("input", { type: "password", name: "password", defaultValue: '**********', onChange: function (e) { return setPassword(e.target.value); }, className: "settingsFormInput" })),
                                react_1["default"].createElement("br", null)),
                            react_1["default"].createElement("div", { className: "centerDiv" },
                                react_1["default"].createElement("button", { className: "modifyButton", onClick: handleSubmit }, t('Modify'))))),
                !isModify &&
                    react_1["default"].createElement("div", { className: "centerDiv" },
                        react_1["default"].createElement("button", { className: "logOutButton", onClick: deconnect }, t('Disconnect'))),
                error &&
                    react_1["default"].createElement(errorComponent_1["default"], { name: errorMessage.name, value: errorMessage.value, resourceNotFound: errorMessage.resourceNotFound, searchedLocation: errorMessage.searchedLocation }))),
        !loading &&
            react_1["default"].createElement(menu_1["default"], null),
        loading &&
            react_1["default"].createElement(loader_1["default"], null)));
}
exports["default"] = Settings;
