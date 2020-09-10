import { Router, Request, Response } from 'express';
import { runInContext } from 'vm';
import {ValidtionRoute} from './validation/routes/validation.router';
const router: Router = Router();
router.use('/validation', ValidtionRoute);


 
export const IndexRouter: Router = router;