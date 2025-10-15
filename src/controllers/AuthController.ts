import { Response } from 'express'

import { IRegisterUserRequest } from '../types'
import { UserService } from '../services/UserServices'

export class AuthController {
    constructor(private userService: UserService) {}

    async register(req: IRegisterUserRequest, res: Response) {
        const { firstname, lastname, email, password } = req.body
        await this.userService.create({ firstname, lastname, email, password })
        res.status(201).json({})
    }
}
