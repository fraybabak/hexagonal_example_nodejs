import express from 'express'
import router from './UI/router'
import { httpLogger } from './logger'
const app = express()
app.use(httpLogger);
app.use(express.json())



app.get('/', (req, res) => {
    res.send('Hello World!').status(200)
})
app.use(router)


const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})