import { z } from "zod";

export const temuUrlSchema = z.object({
  url: z.string().url(),
});

export const temuProductParamsSchema = z.object({
  siteId: z.string().min(1),
  productId: z.string().min(1),
});

export type TemuProductParams = Zod.infer<typeof temuProductParamsSchema>;

export class TemuUrlDto {
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}

export class TemuProductParamsDto implements TemuProductParams {
  siteId: string;
  productId: string;

  constructor(params: TemuProductParams) {
    this.siteId = params.siteId;
    this.productId = params.productId;
  }
}
