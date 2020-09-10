import { Router, Request, Response } from 'express';

const router: Router = Router();


 
let preventWords = ["password", "hack", "porn"]
// an example of simple validation service that validate the file name
router.get('/:filename', async (req: Request, res: Response) => {
    let { filename } = req.params;
    console.log(filename);
        if     ( preventWords.indexOf(filename) > 0)
        {
            res.send(false);
        }else{
            res.send(true);
    }        
});


export const ValidtionRoute: Router = router;