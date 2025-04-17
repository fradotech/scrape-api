import express, { Express, Request, Response } from "express";
import naverRoutes from "./naver/naver.routes";

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    this.app.use("/api/naver", naverRoutes);

    this.app.get("/health", (_req: Request, res: Response) => {
      res.status(200).json({ status: "ok" });
    });

    this.app.use((_req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    });
  }

  public getApp(): Express {
    return this.app;
  }
}

export default new App().getApp();
