import { Router } from 'express';
import {homeController} from "../controllers/homeController"

const router: Router = Router();

// Define routes
router.get('/Invoice_data', homeController);

export default router;