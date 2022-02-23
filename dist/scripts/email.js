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
exports.retrievePetitieConfirmLinks = void 0;
const confirm_1 = require("./confirm");
var imaps = require('imap-simple');
const _ = require('lodash');
const simpleParser = require('mailparser').simpleParser;
require('dotenv').config();
const config = {
    imap: {
        user: process.env.IMAP_USER,
        password: process.env.IMAP_PASSWORD,
        host: process.env.IMAP_HOST,
        port: process.env.IMAP_PORT,
        tls: false,
        authTimeout: 3000
    }
};
function detectURLs(message) {
    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.match(urlRegex);
}
function confirm(url) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, confirm_1.confirmSigning)(url);
    });
}
const retrievePetitieConfirmLinks = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let confirmationUrls = [];
    yield imaps.connect(config).then(function (connection) {
        return connection.openBox('INBOX').then(function () {
            var searchCriteria = ['1:*'];
            var fetchOptions = {
                bodies: ['HEADER', 'TEXT', ''],
            };
            return connection.search(searchCriteria, fetchOptions).then(function (messages) {
                messages.forEach(function (item) {
                    const all = _.find(item.parts, { "which": "" });
                    const id = item.attributes.uid;
                    const idHeader = "Imap-Id: " + id + "\r\n";
                    simpleParser(idHeader + all.body, (err, mail) => {
                        var _a;
                        if (mail.from.text.includes('Stichting petities.nl')) {
                            console.log(`Received mail: ${mail.subject}`);
                            const url = (_a = detectURLs(mail.text)) === null || _a === void 0 ? void 0 : _a.find(url => url.includes('https://petities.nl/signatures'));
                            if (url) {
                                console.log(`Found URL: ${url}`);
                                confirm(url);
                            }
                            else {
                                console.error("No confirmation url found");
                            }
                        }
                    });
                });
            });
        });
    });
    console.log('retrieved', confirmationUrls);
    return confirmationUrls;
});
exports.retrievePetitieConfirmLinks = retrievePetitieConfirmLinks;
//# sourceMappingURL=email.js.map