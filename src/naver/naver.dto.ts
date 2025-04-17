import { z } from "zod";

export const naverUrlSchema = z.object({
  url: z.string().url(),
});

export const naverProductParamsSchema = z.object({
  storeId: z.string().min(1),
  productId: z.string().min(1),
  channelUid: z.string().min(1),
});

export type NaverProductParams = Zod.infer<typeof naverProductParamsSchema>;

export class NaverUrlDto {
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}

export class NaverProductParamsDto implements NaverProductParams {
  storeId: string;
  productId: string;
  channelUid: string;

  constructor(params: NaverProductParams) {
    this.storeId = params.storeId;
    this.productId = params.productId;
    this.channelUid = params.channelUid;
  }
}
