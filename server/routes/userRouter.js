import {Router} from 'express';
import { getUsers, login, register, updateProfile, updateStatus } from '../controllers/user.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
import userPerm from '../middleware/permissions/user/userPerm.js';


const userRouter = Router();
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.patch('/updateProfile', auth, updateProfile);
userRouter.get('/',auth, checkAccess(userPerm.listUsers), getUsers); // admin and editor route permission
userRouter.patch('/updateStatus/:userId',auth, checkAccess(userPerm.updateStatus), updateStatus); // route so that only admin can change the rights


export default userRouter;