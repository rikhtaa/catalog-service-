import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<void>;

export const asyncWrapper = (requestHandler: AsyncHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            if (err instanceof Error) {
                next(createHttpError(500, err.message));
            }
            return next(createHttpError(500, "Internal server error"));
        });
    };
};
