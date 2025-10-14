import exress, { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'
import logger from './config/logger'
const app = exress()

app.get('/', (req, res) => {
    res.send('Hello....')
})

app.get('/ping', (req, res) => {
    res.json({
        message: 'Mern Auth Service',
    })
})

// Global Err Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500
    logger.error(err.message)
    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: '',
                location: '',
            },
        ],
    })
})
export default app
