import { resolve } from "node:dns";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const browser = await puppeteer.launch(
  {
     headless: false,
    }
);
const page = await browser.newPage();

console.log("Иду на ВБ")

await page.goto("https://www.wildberries.ru/", {
  waitUntil: "networkidle0"
});

await page.waitForSelector("")

await sleep(2000)
  .then(() => {console.log("Проспал 2 сек")})


await browser.close()
console.log("Закрыл браузер")
