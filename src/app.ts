import express, { Express, Request, Response, NextFunction } from "express";
import naverRoutes from "./naver/naver.routes";
import { NotFoundError } from "./infrastructure/error";
import { errorHandler } from "./infrastructure/error-handler";

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.app.use(errorHandler);
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

    this.app.all("*", (_req: Request, _res: Response) => {
      throw new NotFoundError("Endpoint not found");
    });
  }

  public getApp(): Express {
    return this.app;
  }
}

export default new App().getApp();
