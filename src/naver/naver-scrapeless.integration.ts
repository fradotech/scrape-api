import axios from "axios";
import { NaverProductParamsDto } from "./naver.dto";
import { NaverScrapelessResponse } from "./naver.type";
import dotenv from "dotenv";

dotenv.config();

export class NaverScrapelessIntegration {
  private readonly baseUrl: string = `${process.env.SCRAPELESS_BASE_URL}/scraper/request`;
  private readonly apiToken: string = process.env.SCRAPELESS_API_KEY || "";
  private readonly actor: string = "scraper.naver.product";

  async product(
    params: NaverProductParamsDto
  ): Promise<NaverScrapelessResponse> {
    try {
      const response = await axios.post<NaverScrapelessResponse>(
        this.baseUrl,
        {
          actor: this.actor,
          input: {
            storeId: params.storeId,
            productId: params.productId,
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
        throw new Error(`Failed to scrape Naver product: ${error.message}`);
      }
      throw error;
    }
  }
}
