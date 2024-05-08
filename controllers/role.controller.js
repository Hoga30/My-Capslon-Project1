import { notFoundError, badRequestError } from '../errors/index.js';
import asyncWrapper from '../middlewares/async.js';
import roleModel from '../models/role.model.js';
import { validationResult } from 'express-validator';

export const addRole = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new badRequestError(errors.array()[0].msg));
    }

    const newRole = await roleModel.create(req.body);
    return res.status(201).json(newRole);
});

export const getRoles = asyncWrapper(async (req, res, next) => {
    const roles = await roleModel.find({});
    if (roles) {
        return res.status(200).json({
            nbHits: roles.length,
            roles
        });
    }
})

export const updateRole = async(req, res, next) => {
    try {
        const updatedRole = await roleModel.findByIdAndUpdate(req.params.id, req.body,{set:true});
           if(!updatedRole) {
            return next(new notFoundError(`Role not found`));
           }
           return  res.status(200).json(updatedRole)
        }
    catch (error) {
        next(error);
    }

}

export const findById = asyncWrapper(async (req, res, next) => {
    
    
    const foundRole = await roleModel.findById(req.params.id);
    if (!foundRole) {
        return next(new notFoundError(`role not found`));
    }
    return res.status(200).json(foundRole);
});

export const deleteRole = asyncWrapper(async (req, res, next) => {
    const deletedRole = await roleModel.findByIdAndDelete(req.query.id);
    return res.status(200).json({ message: 'role deleted'});
});