import dotenv from "dotenv";
import cheerio from "cheerio";
import playwright from "playwright";
import axios from "axios";
import { IWeb } from "./src/models/web";

dotenv.config();
const url = process.env.URL;
const port = process.env.PORT;
axios.defaults.baseURL = `${url}:${port}`;

async function crawler() {
  const target = await axios.get("/web");

  const web: IWeb[] = target.data;
  const browser = await playwright.chromium.launch();

  const result = web.map(async (w: IWeb) => {
    const { url, articleListClass, articleTitleClass } = w;

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    const html = await page.$eval(articleListClass, (e) => e.innerHTML);
    const $ = cheerio.load(html);

    const title: string[] = [];
    const t = $("li");

    t.children("a")
      .children(articleTitleClass)
      .each((i, e) => {
        const t = $(e).text();
        title.push(t);
      });

    const link: string[] = [];
    $("li")
      .children("a")
      .each((i, e) => {
        const path = $(e).attr("href") || "";
        link.push(path);
      });

    return { title, link };
  });

  await browser.close();
  return result;
}

crawler();
