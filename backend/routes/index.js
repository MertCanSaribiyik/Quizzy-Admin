import express from "express";
import fs from "fs";

const router = express.Router();

const routes = fs.readdirSync("./routes");

routes.forEach(async (item) => {
  if (item.endsWith("Routes.js") && item !== "index.js") {
    const route = await import(`./${item}`);
    router.use(`/${item.replace("Routes.js", "")}`, route.default);
  }
});

export default router;
