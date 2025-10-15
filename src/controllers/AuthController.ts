import { NextFunction, Response } from 'express'

import { IRegisterUserRequest } from '../types'
import { UserService } from '../services/UserServices'
import { Logger } from 'winston'

export class AuthController {
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {}

    async register(
        req: IRegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        const { firstname, lastname, email, password } = req.body
        this.logger.debug('New request to register a user', {
            firstname,
            lastname,
            email,
            password: '****',
        })
        try {
            const user = await this.userService.create({
                firstname,
                lastname,
                email,
                password,
            })
            this.logger.info('User has been Registered', {
                id: user.id,
            })
            res.status(201).json({
                id: user.id,
            })
        } catch (err) {
            next(err)
            return
        }
    }
}
