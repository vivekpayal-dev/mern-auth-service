import { Request } from 'express'
export interface IUserData {
    firstname: string
    lastname: string
    email: string
    password: string
}
export interface IRegisterUserRequest extends Request {
    body: IUserData
}
