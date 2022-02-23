import puppeteer from "puppeteer";
import {sleep} from "./sleep";

export const confirmSigning = async (url: string) => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });
  await sleep(3000);
  await browser.close();
}
