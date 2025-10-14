import exress from 'express'
const app = exress()

app.get('/ping', (req, res) => {
    res.json({
        message: 'Mern Auth Service',
    })
})

export default app
