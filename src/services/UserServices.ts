import { Repository } from 'typeorm'
import { User } from '../entity/User'
import { IUserData } from '../types'
import createHttpError from 'http-errors'
import { Roles } from '../constants'

export class UserService {
    constructor(private userRepository: Repository<User>) {}
    async create({ firstname, lastname, email, password }: IUserData) {
        try {
            return await this.userRepository.save({
                firstname,
                lastname,
                email,
                password,
                role: Roles.CUSTOMER,
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            const error = createHttpError(500, 'Failed to Store data in the db')
            throw error
        }
    }
}
