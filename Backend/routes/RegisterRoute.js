import express from 'express'
import {RegisterController} from '../controllers/RegisterController.js'
import {LoginController} from '../controllers/RegisterController.js'
import {getAll} from '../controllers/RegisterController.js'
import {getAlldata} from '../controllers/RegisterController.js'
import fetchuser from "../middleware/fetchUser.js";

const router = express();

router.post('/api',RegisterController);
router.post('/login',LoginController);
router.get('/getAll',fetchuser,getAll);
router.get('/getAlldata',fetchuser,getAlldata);

export default router;