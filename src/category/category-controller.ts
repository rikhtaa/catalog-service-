import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Category } from "./category-types";
import { CategoryService } from "./category-service";
import { Logger } from "winston";

export class CategoryController {
    constructor(
        private categoryService: CategoryService,
        private logger: Logger,
    ) {
        this.create = this.create.bind(this);
    }
    create = async (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const { name, priceConfiguration, attributes } = req.body as Category;

        const category = await this.categoryService.create({
            name,
            priceConfiguration,
            attributes,
        });
        this.logger.info(`Created category`, { id: category._id });
        res.json({ id: category._id });
    };
    update = async (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const { name, priceConfiguration, attributes } = req.body as Category;
        const { id } = req.params;

        const updatedCategory = await this.categoryService.update(id, {
            name,
            priceConfiguration,
            attributes,
        });
        this.logger.info("Updated category", { id: updatedCategory?._id });
        res.json({ id: updatedCategory?._id });
    };
    getAll = async (req: Request, res: Response) => {
        const allCategories = await this.categoryService.getAll();
        this.logger.info("All categories");
        res.json(allCategories);
    };
    getById = async (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const { id } = req.params;
        const category = await this.categoryService.getById(id);
        this.logger.info("Category", { id });
        res.json(category);
    };
    delete = async (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const { id } = req.params;
        await this.categoryService.delete(id);
        this.logger.info("deleted Category", { id });
        res.json({ id: id });
    };
}
