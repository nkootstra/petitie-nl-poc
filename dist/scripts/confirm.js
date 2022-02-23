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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmSigning = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const sleep_1 = require("./sleep");
const confirmSigning = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        headless: false,
    });
    const page = yield browser.newPage();
    yield page.setViewport({ width: 1280, height: 800 });
    yield page.goto(url, {
        waitUntil: 'networkidle2',
    });
    yield (0, sleep_1.sleep)(3000);
    yield browser.close();
});
exports.confirmSigning = confirmSigning;
//# sourceMappingURL=confirm.js.map