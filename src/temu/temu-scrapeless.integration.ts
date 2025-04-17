import axios from "axios";
import { TemuProductParamsDto } from "./temu.dto";
import { TemuScrapelessResponse } from "./temu.type";
import dotenv from "dotenv";

dotenv.config();

export class TemuScrapelessIntegration {
  private readonly baseUrl: string = `${process.env.SCRAPELESS_BASE_URL}/scraper/request`;
  private readonly apiToken: string = process.env.SCRAPELESS_API_KEY || "";
  private readonly actor: string = "scraper.temu.mobile.detail";

  async product(params: TemuProductParamsDto): Promise<TemuScrapelessResponse> {
    try {
      const response = await axios.post<TemuScrapelessResponse>(
        this.baseUrl,
        {
          actor: this.actor,
          input: {
            site_id: params.siteId,
            good_id: params.productId,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-token": this.apiToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to scrape Temu product: ${error.message}`);
      }
      throw error;
    }
  }
}
