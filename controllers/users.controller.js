import userModel from "../models/users.model.js";
import asyncWrapper from "../middlewares/async.js";
import { badRequestError } from "../errors/index.js";
import { validationResult } from "express-validator";
import  jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import {sendEmail} from "../utils/sendEmail.js";
import {otpGenerator} from "../utils/otp.js";
import {unauthorizedError} from "../errors/unauthorizedError.js"
import Token from "../models/tokens.model.js";

export const signUp = asyncWrapper(async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new badRequestError(errors.array()[0].msg))
    }
    const foundUser = await userModel.findOne({email: req.body.email});
    if (foundUser) {
        return next(new badRequestError("Email is already used"));
    };

    const hashedPassword = await bcryptjs.hashSync(req.body.password, 8);
    const otp = otpGenerator();
    const otpExpirationDate = new Date().getTime() +(60 * 1000 * 5);

    const newUser = new userModel({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email:req.body.email,
        password: hashedPassword,
        otp:otp,
        otpExpires:otpExpirationDate
    });
    const savedUser = await newUser.save();

    await sendEmail(req.body.email, "Verify your account", `your OTP is ${otp}`);
    
    if (savedUser){
        return res.status(201).json({
            message: "Account is created!",
            user: savedUser
        });
    }

});

export const ValidateOpt = asyncWrapper(async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new badRequestError(errors.array()[0].msg));
    }

    // Checking if the given opt is stored in our database
    const foundUser = await userModel.findOne({ otp: req.body.otp });
    if (!foundUser) {
        next(new unauthorizedError('Authorization denied'));
    };

    // Checking if the otp is expired or not.
    if (foundUser.otpExpires < new Date().getTime()) {
        next(new unauthorizedError('OTP expired'));
    }

    // Updating the user to verified
    foundUser.verified = true;
    const savedUser = await foundUser.save();

    if (savedUser) {
        return res.status(201).json({
            message: "User account verified!",
            user: savedUser
        });
    }
});

export const signIn = asyncWrapper(async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new badRequestError(errors.array()[0].msg));
    }
 // Find user
 const foundUser = await userModel.findOne({ email: req.body.email });
 if (!foundUser) {
     return next(new badRequestError("Invalid email or password!"));
 };

 // Check account verification
 if (!foundUser.verified) {
     return next(new badRequestError("Account not verified!"));
 }

 // Verify password
 const isPasswordVerfied = await  bcryptjs.compareSync(req.body.password, foundUser.password);
 if (!isPasswordVerfied) {
     return next(new badRequestError("Invalid email or password!"));
 }

 // Generate token
 const token = jwt.sign({ id: foundUser.id, email: foundUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

 res.status(200).json({
     message: "User logged in!",
     token: token,
     user: foundUser
 });
});

export const forgotPassword = asyncWrapper(async (req, res, next) => {
 // Validation
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
     return next(new badRequestError(errors.array()[0].msg));
 }

 // Find user
 const foundUser = await userModel.findOne({ email: req.body.email });
 if (!foundUser) {
     return next(new badRequestError("Your email is not registered!"));
 };

 // Generate token
 const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: "20m" });

 // Recording the token to the database
 await Token.create({
     token: token,
     user: foundUser._id,
     expirationDate: new Date().getTime() + (60 * 1000 * 5),
 });

 const link = `http://localhost:8000/reset-password?token=${token}&id=${foundUser.id}`;
 const emailBody = `Click on the link bellow to reset your password\n\n${link}`;

 await sendEmail(req.body.email, "Reset your password", emailBody);

 res.status(200).json({
     message: "We sent you a reset password link on your email!",
 });
});

export const resetPassword = asyncWrapper(async (req, res, next) => {
 // Validation
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
     return next(new badRequestError(errors.array()[0].msg));
 };

 // Verify token
 const decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
 if (!decoded) {
     return next(new badRequestError("Invalid token!"));
 }

 const recordedToken = await Token.findOne({ token: req.body.token });
 
 if (decoded.id!= req.body.id || recordedToken.user!= req.body.id) {
     return next(new badRequestError("Invalid token!"));
 }

 if (new Date(recordedToken.expirationDate).getTime() < new Date().getTime()) {
     return next(new badRequestError("Token expired!"));
 }

 // Find user
 const foundUser = await userModel.findById(req.body.id);
 if (!foundUser) {
     return next(new badRequestError("User not found!"));
 };

 // Deleting the user token
 await Token.deleteOne({ token: req.body.token });

 // Harshing the user password
 const inputedPassword = await bcryptjs.hashSync(req.body.password, 10);

 // Updating the user password
 foundUser.password = inputedPassword;

 const savedUser = await foundUser.save();
 if (savedUser) {
     return res.status(200).json({
         message: "Your password has been reset!",
     })
 }
});

