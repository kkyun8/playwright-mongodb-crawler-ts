import { Router } from "express";
import Web from "../models/web";

const webRouter = Router();

webRouter.get("/", (req, res) => {
  Web.findAll()
    .then((web) => {
      if (!web.length) return res.status(404).send({ err: "Web not found" });
      res.send(web);
    })
    .catch((err) => res.status(500).send(err));
});

webRouter.get("/name/:name", (req, res) => {
  Web.findOneByName(req.params.name).then((web) => {
    if (!web) return res.status(404).send({ err: "Web not found" });
    res.send(web);
  });
});

webRouter.post("/", (req, res) => {
  Web.create(req.body)
    .then((web) => res.send(web))
    .catch((err) => res.status(500).send(err));
});

webRouter.put("/name/:name", (req, res) => {
  Web.updateByName(req.params.name, req.body)
    .then((todo) => res.send(todo))
    .catch((err) => res.status(500).send(err));
});

webRouter.delete("/name/:name", (req, res) => {
  Web.deleteByName(req.params.name)
    .then(() => res.send("ok"))
    .catch((err) => res.status(500).send(err));
});

export default webRouter;
