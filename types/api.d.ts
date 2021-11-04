import type { NextApiResponse } from "next";

declare interface ApiError {
  error: string;
}

declare type ApiResponse<T = any> = NextApiResponse<T | ApiError>;
