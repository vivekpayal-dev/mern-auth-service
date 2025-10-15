import { Repository } from 'typeorm'
import { User } from '../entity/User'
import { IUserData } from '../types'
import createHttpError from 'http-errors'
import { Roles } from '../constants'

import bcrypt from 'bcryptjs'

export class UserService {
    constructor(private userRepository: Repository<User>) {}
    async create({ firstname, lastname, email, password }: IUserData) {
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            },
        })
        if (user) {
            const error = createHttpError(400, 'Email Already Exist')
            throw error
        }

        const saltrounds = 10
        const hashedPassword = await bcrypt.hash(password, saltrounds)
        try {
            return await this.userRepository.save({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                role: Roles.CUSTOMER,
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            const error = createHttpError(500, 'Failed to Store data in the db')
            throw error
        }
    }
}
