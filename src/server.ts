import app from './app'
import { Config } from './config'

const startServer = () => {
    const PORT = Config.PORT || 7000

    try {
        app.listen(PORT, () => {
            console.log(`Listening On PORT ${PORT}`)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
startServer()
