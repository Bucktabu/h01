import express, {Request, Response} from 'express'
import {videosRouter} from "./routers/videos-router";
import bodyParser from 'body-parser'

const app = express()

const port = /*process.evn.PORT || ??? */ 5000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/videos', videosRouter)