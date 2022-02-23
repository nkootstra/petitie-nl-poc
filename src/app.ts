import {signPetition} from "./scripts/sign";
import {sleep} from "./scripts/sleep";
import {retrievePetitieConfirmLinks} from "./scripts/email";

const url = '';
const email = '';
const name = 'Petitie is manipuleerbaar';

(async () => {
  // sign petition with name and email
  console.log("Sign petition...")
  await signPetition(url, email, name);

  console.log("Wait for e-mail...");
  await sleep(10000); // TODO: implement retry if no email is found
  await retrievePetitieConfirmLinks(email);
})();
