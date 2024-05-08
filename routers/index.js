import bookRouter from "./books.router.js";
import userRouter from "./users.router.js";
import tokenRouter from "./tokens.router.js";
import roleRouter from "./role.router.js";
import express from "express";
import rolesRouter from "./role.router.js";

const router = express.Router();

router.use('/books', bookRouter);
router.use('/users', userRouter);
router.use('/tokens', tokenRouter);
router.use('/roles',rolesRouter)
export default router;

