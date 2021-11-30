import {BaseEntity, Entity, Column, ObjectID, ObjectIdColumn} from "typeorm";
import { NextFunction } from "express";
const mongodb = require('mongodb');
import {Logger, CustomError} from '../tools';

const logger = new Logger;
const NAMESPACE = 'User-Entity';

@Entity('User')
export class User extends BaseEntity {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    role: string;

    static async findUserById(id: string | ObjectID) {
        try{
            let user: any;
            switch(process.env.DATABASE_TYPE){
                case'mongodb':
                    let objectid :ObjectID;
                    if (typeof(id) == 'string') objectid = mongodb.ObjectID(id);
                    user = await this.findOne(id);
                    if(!user) throw new CustomError(404, 'General', 'User Not Found',  null);
                    return user;
                default:
                    user = await this.createQueryBuilder('user')
                            .where('user.id = :id', { id });
                    if(!user) throw new CustomError(404, 'General', 'User Not Found',  null);
                    return user;
            }
        }
        catch(err:any){
            logger.error(NAMESPACE, 'deleteUserById Error');
            const customError = new CustomError(500, 'ُServer', err.message,  err);
            throw(customError);
        }        
    };

    static async createUser(firstName: string, lastName: string, role:string = 'client'){
        try{
            switch(process.env.DATABASE_TYPE){
                case'mongodb':
                    let newUser = new User();
                    newUser.firstName = firstName;
                    newUser.lastName = lastName;
                    newUser.role = role;
                    return newUser = await this.save(newUser);
                    break;
                    default:
                        return await this.createQueryBuilder()
                        .insert()
                        .into(this)
                        .values([{ firstName: firstName, lastName: lastName, role: role }])
                        .execute();
              }
        }
        catch(err:any){
            logger.error(NAMESPACE, 'createUser Error');
            const customError = new CustomError(500, 'ُServer', err.message,  err);
            throw(customError);
        }
    };

    static async deleteUserById(id: string | ObjectID){
        try{
            let existingUser: User | undefined;
            switch(process.env.DATABASE_TYPE){
                case'mongodb':
                    let objectid :ObjectID;
                    if (typeof(id) == 'string') objectid = mongodb.ObjectID(id);
                    existingUser = await this.findOne(id);
                    if(!existingUser) throw new CustomError(404, 'General', 'User Not Found',  null);
                    return await this.delete(id);
                default:
                    existingUser = await this.findOne(id);
                    if(!existingUser) throw new CustomError(404, 'General', 'User Not Found',  null);
                    return await this.createQueryBuilder()
                    .delete()
                    .from(this)
                    .where('_id = :id', { id: 1 })
                    .execute();
              }
        }
        catch(err:any){
            logger.error(NAMESPACE, 'deleteUserById Error');
            const customError = new CustomError(500, 'ُServer', err.message,  err);
            throw(customError);
        }
        
    };

    static async editUserById(id: string | ObjectID, updateObject: any){
        try{
            let user: User | undefined;
            switch(process.env.DATABASE_TYPE){
                case'mongodb':
                    let objectid :ObjectID;
                    if (typeof(id) == 'string') objectid = mongodb.ObjectID(id);
                    user = await this.findOne(id);
                    if(!user) throw new CustomError(404, 'General', 'User Not Found',  null);
                    let result : any = await this.update(id,updateObject);
                    return result.raw.result;
                default:
                    user = await this.findOne(id);
                    if(!user) throw new CustomError(404, 'General', 'User Not Found',  null);
                    return await this.createQueryBuilder()
                    .update(User)
                    .set(updateObject)
                    .where("id = :id", { id: 1 })
                    .execute();
              }
        }
        catch(err:any){
            logger.error(NAMESPACE, 'editUserById Error');
            const customError = new CustomError(500, 'ُServer', err.message,  err);
            throw(customError);
        }        
    };

    static async getUserList(skip: number = 0 ,take: number = 50, whereClause?:any){
        try{
            let userList: any;
            switch(process.env.DATABASE_TYPE){
                case'mongodb':
                    return await this.find({select: ["firstName", "lastName"], skip:skip, take:take});
                default:
                    return await this.createQueryBuilder()
                    .offset(skip)
                    .limit(take)
                    .where(whereClause);
              }
        }
        catch(err:any){
            logger.error(NAMESPACE, 'getUserList Error');
            const customError = new CustomError(500, 'ُServer', err.message,  err);
            throw(customError);
        }
        
    };    
}