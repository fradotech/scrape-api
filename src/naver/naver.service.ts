import { NaverScrapelessIntegration } from "./naver-scrapeless.integration";
import {
  NaverUrlDto,
  NaverProductParamsDto,
  NaverProductParams,
  naverProductParamsSchema,
} from "./naver.dto";
import { NaverScrapelessResponse } from "./naver.type";

export class NaverService {
  private naverScrapelessIntegration: NaverScrapelessIntegration;

  constructor() {
    this.naverScrapelessIntegration = new NaverScrapelessIntegration();
  }

  paramsFromUrl(urlDto: NaverUrlDto): NaverProductParamsDto {
    try {
      const url = new URL(urlDto.url);
      const pathParts = url.pathname.split("/").filter(Boolean);

      if (pathParts.length < 3) {
        throw new Error("Invalid Naver product URL format");
      }

      const storeId = pathParts[0];

      let productId = "";
      if (pathParts[1] === "products" && pathParts.length >= 3) {
        productId = pathParts[2];
      } else {
        throw new Error("Product ID not found in URL");
      }

      const params = new URLSearchParams(url.search);
      const channelUid = params.get("channelUid");

      if (!channelUid) {
        throw new Error("Channel UID not found in URL");
      }

      const productParams: NaverProductParams = {
        storeId,
        productId,
        channelUid,
      };

      naverProductParamsSchema.parse(productParams);

      return new NaverProductParamsDto(productParams);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error extracting parameters: ${error.message}`);
      }
      throw error;
    }
  }

  async get(
    urlDto: NaverUrlDto
  ): Promise<NaverScrapelessResponse> {
    const params = this.paramsFromUrl(urlDto);
    return await this.naverScrapelessIntegration.scrapeNaverProduct(params);
  }
}
