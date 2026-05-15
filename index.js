import fingerprintPlugin from "puppeteer-with-fingerprints";
import fs from "fs";
import { waitForDebugger } from "inspector";
import login from './loginbyphone.js'

//  Ввод плагина в работу
const { plugin } = fingerprintPlugin;

// Читаю файл с фингером в переменную
let fingerdata = fs.readFileSync("fingerprint.txt", "utf-8")
let keyfingerprint = fs.readFileSync("key.txt", "utf-8")
console.log("Получил фингер и ключ с файлов")


// Уставновка ключа для ФП и настройка ФП
plugin.setServiceKey(keyfingerprint);   

// Говорим скрипту использовать плагин
plugin.useFingerprint(fingerdata);

// Создаем функцию сна
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Создаем браузер через plugin, а не puppeteer
const browser = await plugin.launch(
  {
     headless: false,
     args: [
      '--window-size=640,480'
     ],
     defaultViewport: {
      width: 480,
      height: 320,
      deviceScaleFactor: 1
    },
});

// Начинаем создаем страницу и переходим на нее
const page = await browser.newPage();

console.log("Иду на ВБ")
await page.goto("https://www.wildberries.ru/", {
  waitUntil: "networkidle2"
});
// Ожидаем элементы для того чтобы убедиться в том что страница загружена
await page.waitForSelector('a[data-testid="product-card-link"]')
console.log("Загрузилась страница ВБ")
// Закрываем диалоговые окна на главной странице
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

// Спим 
await sleep(2000)
console.log("Проспал 2 сек")

// Вызываю функцию логина
await login(page, "9107692519")

await sleep(5000)
console.log("Проспал 2 сек")

await browser.close()
console.log("Закрыл браузер")
