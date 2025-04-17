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

  async test(req: Request, res: Response): Promise<void> {
    const results: string[] = [];
    for (let i = 0; i < 20; i++) {
      try {
        const urlDto = new NaverUrlDto(payloads[i]);
        const productDetails = await this.naverService.get(urlDto);
        results.push(productDetails.name as string);
      } catch (error) {
        results.push(`Error url: ${payloads[i]}`);
      }
    }

    const response: ApiResponse<string[]> = {
      success: true,
      data: results,
    };

    res.status(200).json(response);
  }
}
