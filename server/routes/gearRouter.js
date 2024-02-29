import {Router} from 'express'

import {createGear, deleteGear, getGears, updateGear} from '../controllers/gear.js'
import auth from '../middleware/auth.js';
import gearPerm from '../middleware/permissions/gear/gearPerm.js';
import checkAccess from '../middleware/checkAccess.js';



const gearRouter = Router()
gearRouter.post('/',auth,checkAccess(gearPerm.create), createGear);
gearRouter.get('/', getGears);
gearRouter.delete('/:gearId',auth, checkAccess(gearPerm.delete), deleteGear);
gearRouter.patch('/:gearId',auth, checkAccess(gearPerm.update), updateGear);


export default gearRouter;