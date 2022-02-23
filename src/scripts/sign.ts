import puppeteer from "puppeteer";
import {sleep} from "./sleep";

export const signPetition = async (url: string, email: string, name: string) => {
  const browser = await puppeteer.launch({
    headless:false,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });
  await page.type('#signature_person_name', name);
  await sleep(1000);
  await page.type('#signature_person_email', email);
  await sleep(1000);
  await page.type('#signature_person_city', 'Amsterdam');
  await sleep(1000);

  // make petition public
  await (await page.waitForSelector('label[for=petition-form-checkbox]')).click();
  await sleep(1000);

  await page.click('input[name="commit"]');
  await browser.close();
}
