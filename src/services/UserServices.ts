import { Repository } from 'typeorm'
import { User } from '../entity/User'
import { IUserData } from '../types'

export class UserService {
    constructor(private userRepository: Repository<User>) {}
    async create({ firstname, lastname, email, password }: IUserData) {
        await this.userRepository.save({ firstname, lastname, email, password })
    }
}
