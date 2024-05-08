import { body } from "express-validator";

export const addBookValidation = [
    body("bookName", "Book name is required").not().isEmpty(),
    body("authorName", "Author name is required").not().isEmpty()
];

export const addRoleValidation = [
    body("name", "Role name is required").not().isEmpty(),
];

export const forgotPasswordValidation = [
    body("email", "Email must be provided").not().isEmpty(),
];

export const resetPasswordValidation = [
    body("password", "Password is required").not().isEmpty(),
    body("password", "Password should contain atleast 8 characters, uppercase and lower case letters, numbers, and symbols").isStrongPassword()
];

export const testValidation = [
    body("bookName","Book name is required").not().isEmpty(),
    body("email","Email is required").not().isEmpty(),
    body("email","Invalid email").isEmail()
];

export const signUpValidations = [
    body("firstName", "First name is required").not().isEmpty(),
    body("lastName", "Last name is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
    body("password", "Password should contain atleast 8 characters, uppercase and lower case letters, numbers, and symbols").isStrongPassword()
];

export const signInValidations = [
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
    body("password", "Invalid password").isStrongPassword()
];

