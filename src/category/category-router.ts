import express, { NextFunction, Response, Request } from "express";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import { CategoryService } from "./category-service";
import logger from "../config/logger";

const router = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

router.post(
    "/",
    categoryValidator,
    (req: Request, res: Response, next: NextFunction) => {
        void categoryController.create(req, res, next);
    },
);

export default router;
