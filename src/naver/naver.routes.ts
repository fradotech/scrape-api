import { Router } from "express";
import { NaverController } from "./naver.controller";

const router: import("express").Router = Router();
const naverController = new NaverController();

router.post("/product", (req, res) =>
  naverController.get(req, res)
);

export default router;
