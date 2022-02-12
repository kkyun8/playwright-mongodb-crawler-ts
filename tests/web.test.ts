import request from "supertest";
import app from "../server";
import Web, { IWeb } from "../src/models/web";

const mock: IWeb[] = [
  {
    name: "name1",
    nameJp: "nameJp1",
    url: "localhost1",
    articleListClass: ".list-class",
    articleTitleClass: ".title-class",
    isDelete: false,
  },
  {
    name: "name2",
    nameJp: "nameJp2",
    url: "localhost2",
    articleListClass: ".list-class",
    articleTitleClass: ".title-class",
    isDelete: false,
  },
];

describe("Web", () => {
  beforeEach(async () => {
    await Web.deleteMany({});
    await Web.collection.insertMany(mock);
  });

  test("Get All web", async () => {
    return request(app)
      .get("/web")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
      });
  });
  test("Get web by name", async () => {
    return request(app)
      .get("/web/name/name1")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name === "name1").toBe(true);
      });
  });
  test("Post web", async () => {
    const web: IWeb = {
      name: "name",
      nameJp: "nameJp",
      url: "localhost",
      articleListClass: ".list-class",
      articleTitleClass: ".title-class",
    };
    return request(app)
      .post("/web")
      .send(web)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  test("Put web", async () => {
    const web: IWeb = {
      name: "name1",
      nameJp: "1nameJp",
      url: "1localhost",
      articleListClass: ".1list-class",
      articleTitleClass: ".1title-class",
    };

    return request(app)
      .put("/web/name/name1")
      .send(web)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  test("Delete", async () => {
    return request(app).delete("/web/name/name1").expect(200);
  });
});
