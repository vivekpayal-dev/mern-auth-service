import { config } from 'dotenv'
import path from 'path'
config({
    path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
})

interface IConfig {
    PORT: string
    NODE_ENV: string
    DB_HOST: string
    DB_PORT: string
    DB_USERNAME: string
    DB_PASSWORD: string
    DB_NAME: string
}

export const Config: IConfig = {
    PORT: process.env.PORT!,
    NODE_ENV: process.env.NODE_ENV!,
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: process.env.DB_PORT!,
    DB_USERNAME: process.env.DB_USERNAME!,
    DB_PASSWORD: process.env.DB_PASSWORD!,
    DB_NAME: process.env.DB_NAME!,
}
