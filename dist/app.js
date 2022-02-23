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
Object.defineProperty(exports, "__esModule", { value: true });
const sign_1 = require("./scripts/sign");
const sleep_1 = require("./scripts/sleep");
const email_1 = require("./scripts/email");
const url = 'https://petities.nl/petitions/behoud-ateliers-groningen?locale=nl';
const email = 'niels@kootstra.dev';
const name = 'Petitie is manipuleerbaar';
(() => __awaiter(void 0, void 0, void 0, function* () {
    // sign petition with name and email
    console.log("Sign petition...");
    yield (0, sign_1.signPetition)(url, email, name);
    let confirmationUrls = [];
    console.log("Wait for e-mail...");
    yield (0, sleep_1.sleep)(500);
    yield (0, email_1.retrievePetitieConfirmLinks)(email);
}))();
//# sourceMappingURL=app.js.map