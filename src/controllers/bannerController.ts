
import express, { NextFunction, Request, Response } from 'express';
import { Banner, BannerType } from '../models/banner';
const database = require('../config/database');

const router = express.Router();

async function getBanners(req: Request, res: Response, next: NextFunction) {

    const subs = await Banner.findAll({
         include: {
            model: BannerType,
            as: 'type',
        },
    })
    res.status(201).json(subs);

}


router.get('/', getBanners);


export default router;

