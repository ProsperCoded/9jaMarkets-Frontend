import { Router } from "express";
import { WinstonLogger } from "../utils/logger/winston.logger";
import { ProductRepository } from "../repositories/product.repository";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { Validator } from "../utils/middlewares/validator.middleware";
import { IdDto } from "../dtos/id.dto";
import { ProductUpdateDto } from "./dtos/product-update.dto";
import { MerchantAuthGaurd } from "../utils/middlewares/guards/merchant.auth.guard";
import { JWTService } from "../utils/jwt/jwt.service";
import { MerchantRepository } from "../repositories/merchant.repository";
import { ProductCreateDto } from "./dtos/product-create.dto";

const logger = new WinstonLogger("ProductService");
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository, logger);
const productController = new ProductController(productService);
const jwtService = new JWTService();
const merchantRepository = new MerchantRepository();
const merchantAuthGaurd = new MerchantAuthGaurd(merchantRepository, logger, jwtService);

const validator = new Validator();

const router = Router();


// Get Product by Id
router.get("/:id", validator.single(IdDto, "params"), productController.getProductById);

// Get product by merchantId
router.get("/merchant/:merchantId", validator.single(IdDto, "params"), productController.getProductByMerchantId);

// Create a Product
router.post("/", validator.single(ProductCreateDto, "body") , merchantAuthGaurd.authorise(), productController.createProduct);

// Update Product
router.put("/:id", validator.multiple([
    { schema: IdDto, source: "params" },
    { schema: ProductUpdateDto, source: "body" }
]) , merchantAuthGaurd.authorise(), productController.updateProduct);


// Delete Product
router.delete("/:id", merchantAuthGaurd.authorise(), validator.single(IdDto, "params"), productController.deleteProduct);

export default router;