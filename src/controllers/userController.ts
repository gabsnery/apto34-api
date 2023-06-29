 
import { Request, Response, NextFunction } from 'express';
import {User} from '../models/user';
import userRepository from '../repositories/userRepository';

async function getUser(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const user = await userRepository.getUser(parseInt(id));
    if (user)
        res.json(user);
    else
        res.sendStatus(404);
}

async function getUsers(req: Request, res: Response, next: NextFunction) {
    const users = await userRepository.getUsers();
    res.json(users);
}
async function postUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as User;
    const result = await userRepository.addUser(user);
    if (result)
        res.status(201).json(result);
    else
        res.sendStatus(400);
}

async function patchUser(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const user = req.body as User;
    const result = await userRepository.updateUser(parseInt(id), user);
    if (result)
        res.json(result);
    else
        res.sendStatus(404);
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const success = await userRepository.deleteUser(parseInt(id));
    if (success)
        res.sendStatus(204);
    else
        res.sendStatus(404);
}

export default {
    getUser,
    getUsers,
    postUser,
    patchUser,
    deleteUser
}