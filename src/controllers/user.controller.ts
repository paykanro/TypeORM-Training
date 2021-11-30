import { Request, Response, NextFunction } from 'express';
import { CustomError,Logger  } from '../tools';
import { User } from '../entities';

const NAMESPACE = 'User-Controller';
const logger = new Logger;

const createUser = async (req: Request, res: Response, next: NextFunction)=> {  
  try {
      const { firstName, lastName, role } = req.body;
      const newUser = await User.createUser(firstName, lastName, role);
      res.status(200).send({message: 'User successfully created.', data:newUser});
  } catch (err) {
    logger.error(NAMESPACE, 'createUser Error');
    const customError = new CustomError(400, 'ُServer', 'Internal Server Error', err);
    return next(customError);
  }
}

const editUser = async (req: Request, res: Response, next: NextFunction)=> {  
  try {
      const updatedUser: any = await User.editUserById(req.params.id, req.body);
      res.status(200).send({message: 'User successfully edited.', data:updatedUser});
  } catch (err) {
    logger.error(NAMESPACE, 'editUser Error');
    const customError = new CustomError(400, 'ُServer', 'Internal Server Error', err);
    return next(customError);
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction)=> {  
  try {
    const deletedUser = await User.deleteUserById(req.params.id);
    res.status(200).send({message: 'User successfully deleted.', data:deletedUser});
  } catch (err:any) {
    logger.error(NAMESPACE, 'deleteUser Error');
    const customError = new CustomError(500, 'ُServer', err.message,  err);
    return next(customError);
  }
}

const getUserList = async (req: Request, res: Response, next: NextFunction)=> {  
  try {
    const userList = await User.getUserList( +req.params.skip, +req.params.limit );
    res.status(200).send({message : 'User list successfully returned.', data : userList});
  } catch (err:any) {
    logger.error(NAMESPACE, 'getUserList Error');
    const customError = new CustomError(500, 'ُServer', err.message,  err);
    return next(customError);
  }
}

const getUserById = async (req: Request, res: Response, next: NextFunction)=> {  
  try {
    const user = await User.findUserById(req.params.id);
    res.status(200).send({message : 'User successfully founded.', data : user});
  } catch (err:any) {
    logger.error(NAMESPACE, 'getUserById Error');
    const customError = new CustomError(500, 'ُServer', err.message,  err);
    return next(customError);
  }
}

export const UserController = {
    createUser,
    deleteUser,
    editUser,
    getUserList,
    getUserById
}
