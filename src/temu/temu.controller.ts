import { Request, Response } from "express";
import { temuUrlSchema, TemuUrlDto } from "./temu.dto";
import { TemuService } from "./temu.service";
import { ApiResponse } from "../infrastructure/type";
import { TemuScrapelessResponse } from "./temu.type";

export class TemuController {
  private temuService: TemuService;

  constructor() {
    this.temuService = new TemuService();
  }

  async get(req: Request, res: Response): Promise<void> {
    const validatedData = temuUrlSchema.parse(req.body);
    const urlDto = new TemuUrlDto(validatedData.url);

    const data = await this.temuService.get(urlDto);

    const response: ApiResponse<TemuScrapelessResponse> = {
      success: true,
      data,
    };

    res.status(200).json(response);
  }
}
