// https://playwright.dev/docs/api/class-page#page-eval-on-selector-all
const cheerio = require("cheerio");
const playwright = require("playwright");

(async () => {
  for (const browserType of ["chromium"]) {
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://engineering.linecorp.com/ja/");
    const html = await page.$$eval(".recent-blog", (divs, min) => divs);
    // playwright and cheerio
    const html = await page.content();
    const $ = cheerio.load(html);
    //
    await browser.close();
  }
})();
