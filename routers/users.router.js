import express from 'express';
const userRouter = express.Router();
import { signUp, signIn, ValidateOpt, forgotPassword, resetPassword } from '../controllers/users.controller.js';
import { signUpValidations, signInValidations,forgotPasswordValidation, resetPasswordValidation } from '../utils/validation.js';

userRouter.post('/signUp', signUpValidations, signUp);
userRouter.post('/signIn', signInValidations, signIn);
userRouter.post('/verify',  ValidateOpt);
userRouter.post('/forget', forgotPasswordValidation, forgotPassword);
userRouter.post('/reset', resetPasswordValidation , resetPassword);

export default userRouter;
