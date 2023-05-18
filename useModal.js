"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModalTrigger = exports.useModal = exports.ModalProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var ModalContext = (0, react_1.createContext)(undefined);
var ModalProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(false), isModalActiveGlobal = _b[0], SetIsModalActiveGlobal = _b[1];
    return ((0, jsx_runtime_1.jsx)(ModalContext.Provider, __assign({ value: { isModalActiveGlobal: isModalActiveGlobal, SetIsModalActiveGlobal: SetIsModalActiveGlobal } }, { children: children })));
};
exports.ModalProvider = ModalProvider;
var useModal = function (_a) {
    var buttonRef = _a.buttonRef, closeModal = _a.closeModal;
    var rightPositionStyle = (0, react_1.useMemo)(function () {
        var _a, _b;
        if (!(buttonRef === null || buttonRef === void 0 ? void 0 : buttonRef.current))
            throw new Error('buttonRef is undefined');
        var buttonRect = (_a = buttonRef === null || buttonRef === void 0 ? void 0 : buttonRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        var pickerRightLoc = (_b = (buttonRect === null || buttonRect === void 0 ? void 0 : buttonRect.left) + 270) !== null && _b !== void 0 ? _b : 0;
        return window.innerWidth - pickerRightLoc < 0 ? { right: 0 } : {};
    }, [buttonRef]);
    var modalRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var handleClick = function (e) {
            var _a;
            if (!modalRef.current)
                throw new Error('modalRef is undefined');
            if (!((_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)))
                closeModal();
        };
        var handleEscape = function (e) {
            if (e.key === 'Escape')
                closeModal();
        };
        window.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleEscape);
        return function () {
            window.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [closeModal, modalRef]);
    var context = (0, react_1.useContext)(ModalContext);
    if (context === undefined)
        throw new Error('useModal must be used within a ModalProvider');
    var SetIsModalActiveGlobal = context.SetIsModalActiveGlobal;
    (0, react_1.useEffect)(function () {
        SetIsModalActiveGlobal(true);
        return function () { return SetIsModalActiveGlobal(false); };
    }, [SetIsModalActiveGlobal]);
    return { style: rightPositionStyle, ref: modalRef };
};
exports.useModal = useModal;
var useModalTrigger = function () {
    var buttonRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(false), isModalVisible = _a[0], setIsModalVisible = _a[1];
    return {
        isModalVisible: isModalVisible,
        useModalParams: { buttonRef: buttonRef, closeModal: function () { return setIsModalVisible(false); } },
        buttonProps: { onClick: function () { return setIsModalVisible(true); }, ref: buttonRef },
    };
};
exports.useModalTrigger = useModalTrigger;
