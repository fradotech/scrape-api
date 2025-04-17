import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ApiResponse } from "./type";
import { AppError } from "./error";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("Error:", err);

  if (err instanceof ZodError) {
    const response: ApiResponse<null> = {
      success: false,
      message: `Validation error: ${err.errors
        .map((e) => e.message)
        .join(", ")}`,
    };
    res.status(400).json(response);
    return;
  }

  if (err instanceof AppError) {
    const response: ApiResponse<null> = {
      success: false,
      message: err.message,
    };
    res.status(err.statusCode).json(response);
    return;
  }

  const response: ApiResponse<null> = {
    success: false,
    message: "Internal server error",
  };
  res.status(500).json(response);
};
