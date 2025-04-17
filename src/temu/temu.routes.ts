import { Router } from "express";
import { TemuController } from "./temu.controller";
import { asyncHandler } from "../infrastructure/async-handler";

const router: Router = Router();
const naverController = new TemuController();

router.post(
  "/product",
  asyncHandler(naverController.get.bind(naverController))
);

export default router;
