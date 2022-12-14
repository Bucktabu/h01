import express, {Request, Response} from 'express'
import {videosRouter} from "./routers/videos-router";
import bodyParser from 'body-parser'
import {testingRouter} from "./routers/testing-router";

const app = express()

const port = process.env.PORT || 5000

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/videos', videosRouter)
app.use('/testing', testingRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})