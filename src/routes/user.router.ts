import { Router } from 'express';
import {UserController} from '../controllers';

const router = Router();
router.post('/', UserController.createUser);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', UserController.editUser);
router.get('/:id', UserController.getUserById);
router.get('/:skip/:limit', UserController.getUserList);



export default router;