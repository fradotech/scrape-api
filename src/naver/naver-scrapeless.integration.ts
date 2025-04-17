import axios from "axios";
import { NaverProductParamsDto } from "./naver.dto";
import { NaverScrapelessResponse } from "./naver.type";

export class NaverScrapelessIntegration {
  private readonly baseUrl: string =
    "https://api.scrapeless.com/api/v1/scraper/request";
  private readonly apiToken: string =
    "sk_wsGRLsueQZPg17pVLdJOQfdcOHrW90UQn10jjANG1iMpnx3xtuBBBmfFW0fJWG7q";

  async scrapeNaverProduct(
    params: NaverProductParamsDto
  ): Promise<NaverScrapelessResponse> {
    try {
      const response = await axios.post<NaverScrapelessResponse>(
        this.baseUrl,
        {
          actor: "scraper.naver.product",
          input: {
            storeId: params.storeId,
            productId: params.productId,
            channelUid: params.channelUid,
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
