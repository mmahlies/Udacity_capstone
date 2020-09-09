import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { NextFunction } from 'connect';
import * as jwt from 'jsonwebtoken';
import * as AWS from '../../../../aws';
import * as c from '../../../../config/config';
const axios = require('axios');

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
 //   return next();
 console.log("requireAuths 1")
     if (!req.headers || !req.headers.authorization){
         return res.status(401).send({ message: 'No authorization headers.' });
     }
     
 
     console.log("requireAuths 2")
     const token_bearer = req.headers.authorization.split(' ');
     if(token_bearer.length != 2){
         return res.status(401).send({ message: 'Malformed token.' });
     }
     
     console.log("requireAuths 3")
     const token = token_bearer[1];
     return jwt.verify(token, c.config.jwt.secret , (err, decoded) => {
       if (err) {
        console.log("requireAuths  4err")
         return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
       }
       console.log("requireAuths 5 succ")
       return next();
     });
 }

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
    items.rows.map((item) => {
            if(item.url) {
                item.url = AWS.getGetSignedUrl(item.url);
            }
    });
    res.send(items);
});

// Get a specific resource
router.get('/:id', 
    async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await FeedItem.findByPk(id);
    res.send(item);
});

// update a specific resource
router.patch('/:id', 
    requireAuth, 
    async (req: Request, res: Response) => {
        //@TODO try it yourself
        res.send(500).send("not implemented")
});


async function  ValidateFileName(url:string): Promise<any>{
   return await axios.get(url)
        .then((res: any) => {
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);
            return res;
        }).catch((err: any) => {
            console.error(err);
            return false;
        });
}

// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', requireAuth ,    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    console.log("fileName is:",fileName);
   let result = await ValidateFileName(`http://localhost:8181/api/v0/${fileName}`)
   console.log("result :", result.data);
   console.log("123123");
   if  (result.data == true)
   {
    const url = AWS.getPutSignedUrl(fileName);
    console.log("url is:",url);
    res.status(201).send({url: url});
   }else{
    res.status(405).send("file name not vaild");
   }
    
});

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/', requireAuth,
    async (req: Request, res: Response) => {
    const caption = req.body.caption;
    const fileName = req.body.url;

    // check Caption is valid
    if (!caption) {
        return res.status(400).send({ message: 'Caption is required or malformed' });
    }

    // check Filename is valid
    if (!fileName) {
        return res.status(400).send({ message: 'File url is required' });
    }

    const item = await new FeedItem({
            caption: caption,
            url: fileName
    });

    const saved_item = await item.save();

    saved_item.url = AWS.getGetSignedUrl(saved_item.url);
    res.status(201).send(saved_item);
});

export const FeedRouter: Router = router;