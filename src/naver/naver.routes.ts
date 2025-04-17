import { Router } from "express";
import { NaverController } from "./naver.controller";
import { asyncHandler } from "../infrastructure/async-handler";

const router: Router = Router();
const naverController = new NaverController();

router.post(
  "/product",
  asyncHandler(naverController.get.bind(naverController))
);

export default router;
