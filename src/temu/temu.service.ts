import { TemuScrapelessIntegration } from "./temu-scrapeless.integration";
import {
  TemuUrlDto,
  TemuProductParamsDto,
  TemuProductParams,
  temuProductParamsSchema,
} from "./temu.dto";
import { TemuScrapelessResponse } from "./temu.type";

export class TemuService {
  private temuScrapelessIntegration: TemuScrapelessIntegration;

  constructor() {
    this.temuScrapelessIntegration = new TemuScrapelessIntegration();
  }

  paramsFromUrl(urlDto: TemuUrlDto): TemuProductParamsDto {
    try {
      const url = new URL(urlDto.url);
      const pathParts = url.pathname.split("/").filter(Boolean);

      if (pathParts.length < 2) {
        throw new Error("Invalid Temu product URL format");
      }

      const siteId = pathParts[0];

      const lastPath = pathParts[pathParts.length - 1]
        .replace(/\s+/g, "")
        .replace(/%20/g, "");

      const match = lastPath.match(/(\d+)\.html$/);

      if (!match) {
        throw new Error("Product ID not found in URL");
      }

      const productId = match[1];

      const productParams: TemuProductParams = {
        siteId,
        productId,
      };

      temuProductParamsSchema.parse(productParams);

      return new TemuProductParamsDto(productParams);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error extracting parameters: ${error.message}`);
      }
      throw error;
    }
  }

  async get(urlDto: TemuUrlDto): Promise<TemuScrapelessResponse> {
    const params = this.paramsFromUrl(urlDto);
    return await this.temuScrapelessIntegration.product(params);
  }
}
