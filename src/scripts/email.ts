import {confirmSigning} from "./confirm";

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
  return message.match(urlRegex)
}

async function confirm(url: string) {
  await confirmSigning(url);
}

export const retrievePetitieConfirmLinks = async (email: string) => {
  let confirmationUrls = [];
  await imaps.connect(config).then(function (connection) {
    return connection.openBox('INBOX').then(function () {
      var searchCriteria = ['1:*'];
      var fetchOptions = {
        bodies: ['HEADER', 'TEXT', ''],
      };
      return connection.search(searchCriteria, fetchOptions).then(function (messages) {
        messages.forEach(function (item) {
          const all = _.find(item.parts, { "which": "" })
          const id = item.attributes.uid;
          const idHeader = "Imap-Id: "+id+"\r\n";
          simpleParser(idHeader+all.body, (err, mail) => {
            if(mail.from.text.includes('Stichting petities.nl')) {
              console.log(`Received mail: ${mail.subject}`)

              const url = detectURLs(mail.text)?.find(url => url.includes('https://petities.nl/signatures'))
              if(url) {
                console.log(`Found URL: ${url}`);
                confirm(url);
              } else {
                console.error("No confirmation url found");
              }
            }
          });
        });
      });
    });
  });
}
