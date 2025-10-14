import app from './app'
import { Config } from './config'
import logger from './config/logger'

const startServer = () => {
    const PORT = Config.PORT || 7000

    try {
        app.listen(PORT, () => {
            // logger.error('Testing Error Logger')
            logger.info('Server is Listening on Port', {
                port: PORT,
            })
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
startServer()
