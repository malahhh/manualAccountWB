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
  waitUntil: "networkidle2"
});

await page.waitForSelector('a[data-testid="product-card-link"]')
console.log("Загрузилась страница ВБ")

try {
  await page.waitForSelector('[role="dialog"]');
  await page.click('button[aria-label="Close"]');
  console.log("Закрыл диалоговое окно");
  
  let cookieTextExist = await page.$('::-p-text(Окей)');
  if (cookieTextExist){
    console.log("Есть кнопка куки, жму ее");
    await page.click('::-p-text(Окей)')
  }else{
    console.log("Кнпоки куки нет")
  }

} catch (error) {
  console.log("Ошибка: ", error)
}

await sleep(5000)
console.log("Проспал 5 сек")


await browser.close()
console.log("Закрыл браузер")
