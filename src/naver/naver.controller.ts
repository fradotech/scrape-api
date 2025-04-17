import { Request, Response } from "express";
import { naverUrlSchema, NaverUrlDto } from "./naver.dto";
import { NaverService } from "./naver.service";
import { ApiResponse } from "../infrastructure/type";
import { NaverScrapelessResponse } from "./naver.type";

const payloads = require("../../data/naver-payloads.json");

export class NaverController {
  private naverService: NaverService;

  constructor() {
    this.naverService = new NaverService();
  }

  async get(req: Request, res: Response): Promise<void> {
    const validatedData = naverUrlSchema.parse(req.body);
    const urlDto = new NaverUrlDto(validatedData.url);

    const data = await this.naverService.get(urlDto);

    const response: ApiResponse<NaverScrapelessResponse> = {
      success: true,
      data,
    };

    res.status(200).json(response);
  }
}
