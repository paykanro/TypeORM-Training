import { Request, Response, NextFunction, Router } from 'express';
import userRouter from './user.router'

const router = Router();
router.get('/', (req, res, next) => {
    res.status(200).header('Content-Type', 'text/html').send(`<h4> Your Server is running</h4>`);
});
router.use('/user',userRouter);

export default router;