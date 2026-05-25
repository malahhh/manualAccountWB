export default async function login(page, phone, tokenacc) {
  console.log("Вызвана функция логина в аккаунт");
  await page.goto("https://www.wildberries.ru/lk",
    {waitUntil: "networkidle2"})
  
  await page.waitForSelector('[name="phoneNumber"]', { visible: true })
  console.log("Загрузил страницу ЛК со входом в аккаунт через телефон, попробует подгрузить токен")
  if (tokenacc != "Nope"){
    console.log("Гружу токен:", tokenacc)
    await page.evaluate((tokenacc) => {
      localStorage.setItem('wbx__tokenData', {token: tokenacc})
      });
    try {
       await page.goto("https://www.wildberries.ru/lk",
        {waitUntil: "networkidle2"})
       await page.waitForSelector("text/Заказы", {timeout: 60000});
       await page.waitForNetworkIdle({
        idleTime: 1000,
        timeout: 30000,
      });
    } catch (error) {
      console.log("Токен не подгрузился", error)
    }
  }else{
    console.log("Токен:", tokenacc)
  }
  await page.click('[name="phoneNumber"]')
  await page.keyboard.type(phone)
  console.log('Ввел телефон:', phone)

  await page.waitForSelector('text/Получить код');
  await page.click("text/Получить код");

  await page.waitForSelector("text/Заказы", {timeout: 60000});
  try {
    await page.waitForNetworkIdle({
  idleTime: 1000,
  timeout: 30000,
  });
  } catch (error) {
    console.log("Не дождался догруза страницы:", error);
  } 
  console.log("Дождался загрузки страницы ЛК");

  tokenacc = await page.evaluate(() => {
    return JSON.parse(localStorage.getItem('wbx__tokenData')).token
  })
  console.log(tokenacc)

  return tokenacc

}