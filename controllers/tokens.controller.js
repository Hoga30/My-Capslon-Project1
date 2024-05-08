import { notFoundError, badRequestError } from '../errors/index.js';
import tokenModel from '../models/tokens.model.js';
import { validationResult } from 'express-validator';
import asyncWrapper from '../middlewares/async.js';

export const addToken = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new badRequestError(errors.array()[0].msg));
    }

    const newToken = await tokenModel.create(req.body);
    return res.status(201).json(newToken);
});

export const findByUser = asyncWrapper(async (req, res, next) => {
    const tokenOwner = req.params.user;

    const foundToken = await tokenModel.findOne({ status: tokenOwner });
    return res.status(200).json({
        foundToken
    });
});

export const deleteToken = asyncWrapper(async (req, res, next) => {
    const deletedToken = await tokenModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'Token deleted' });
});