import { Request, Response } from "express";
import { ZodError } from "zod";
import { naverUrlSchema, NaverUrlDto } from "./naver.dto";
import { NaverService } from "./naver.service";
import { ApiResponse } from "../infrastructure/type";

export class NaverController {
  private naverService: NaverService;

  constructor() {
    this.naverService = new NaverService();
  }

  async get(req: Request, res: Response): Promise<void> {
    const validatedData = naverUrlSchema.parse(req.body);
    const urlDto = new NaverUrlDto(validatedData.url);

    const productDetails = await this.naverService.get(urlDto);

    const response: ApiResponse<unknown> = {
      success: true,
      data: productDetails,
    };

    res.status(200).json(response);
  }
}
