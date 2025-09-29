import { body } from "express-validator";

export default [
    body("name")
        .exists()
        .withMessage("Category name is required.")
        .isString()
        .withMessage("Category name should be a string"),
    body("priceConfiguration")
        .exists()
        .withMessage("Price configuration is required"),
    body("priceConfiguration.*.priceType")
        .exists()
        .withMessage("price type is required")
        .custom((value: "base" | "additional") => {
            const valueKeys = ["base", "additional"];
            if (!valueKeys.includes(value)) {
                throw new Error(
                    `${value} is invalidf for priceType field. possible values are: [${valueKeys.join(
                        ", ", //base, additional
                    )}] `,
                );
            }
            return true;
        }),
    body("attributes").exists().withMessage("Attributes field is required."),
];
