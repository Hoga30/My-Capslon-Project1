import express from 'express';
const rolesRouter = express.Router();
import { addRole, deleteRole, findById, getRoles, updateRole } from '../controllers/role.controller.js';
import { addRoleValidation } from '../utils/validation.js';

rolesRouter.post('/add', addRoleValidation, addRole);
rolesRouter.get('/list', getRoles);
rolesRouter.put('/update/:id', updateRole);
rolesRouter.get('/find/:id', findById);
rolesRouter.delete('/delete/:id', deleteRole);

export default rolesRouter;