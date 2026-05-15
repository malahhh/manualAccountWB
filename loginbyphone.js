export default async function login(page, phone) {
  console.log("Вызвана функция логина в аккаунт");
  await page.goto("https://www.wildberries.ru/lk",
    {waitUntil: "networkidle2"})
  
  await page.waitForSelector('[name="phoneNumber"]', { visible: true })
  console.log("Загрузил страницу ЛК")

  await page.click('[name="phoneNumber"]')
  await page.keyboard.type(phone)
  console.log('Ввел телефон:', phone)

  await page.waitForSelector('text/Получить код');
  await page.click("text/Получить код");
}