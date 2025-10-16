import * as z from 'zod'
import { Request, NextFunction, Response } from 'express'

export const requestBodyValidator = (schema: z.ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const result = await schema.safeParseAsync(req.body)
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors
            console.log(errors)
            return res.status(400).json({
                errors,
            })
        }
        req.body = result.data
        next()
    }
}
