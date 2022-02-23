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
exports.signPetition = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const sleep_1 = require("./sleep");
const signPetition = (url, email, name) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        headless: false,
    });
    const page = yield browser.newPage();
    yield page.setViewport({ width: 1280, height: 800 });
    yield page.goto(url, {
        waitUntil: 'networkidle2',
    });
    yield page.type('#signature_person_name', name);
    yield (0, sleep_1.sleep)(1000);
    yield page.type('#signature_person_email', email);
    yield (0, sleep_1.sleep)(1000);
    yield page.type('#signature_person_city', 'Amsterdam');
    yield (0, sleep_1.sleep)(1000);
    // make petition public
    yield (yield page.waitForSelector('label[for=petition-form-checkbox]')).click();
    yield (0, sleep_1.sleep)(1000);
    yield page.click('input[name="commit"]');
    yield browser.close();
});
exports.signPetition = signPetition;
//# sourceMappingURL=sign.js.map