import {Request, Response, Router} from "express";

// enum Resolutions = {p144 = 'P144', p240 = 'P240', p360 = 'P360', p480 = 'P480', p720 = 'P720', p1080 = 'P1080', p1440 = 'P1440', p2160 = 'P2160'}
//
// type VideoDBType = {
//     id: number,
//     title: string
//     author: string,
//     canBeDownloaded: boolean,
//     minAgeRestriction: number | null,
//     createdAt: string,
//     publicationDate: string,
//     availableResolutions: Resolutions
// }

let videos = [
    {
        id: 1,
        title: '01 - Simple express app with typescript and nodemon',
        author: 'IT-Incubator',
        canBeDownloaded: true,
        minAgeRestriction: 1,
        createdAt: "2022-09-15T12:40:55.951Z",
        publicationDate: "2022-09-15T12:40:55.951Z",
        availableResolutions: "P144"
    },
    {
        id: 2,
        title: '02 - Deploy to Heroku for simple TS Express App',
        author: 'IT-Incubator',
        canBeDownloaded: true,
        minAgeRestriction: 1,
        createdAt: "2022-09-15T12:40:55.951Z",
        publicationDate: "2022-09-15T12:40:55.951Z",
        availableResolutions: "P144"
    },
    {
        id: 3,
        title: '03 - Deploy to Heroku via CLI',
        author: 'IT-Incubator',
        canBeDownloaded: true,
        minAgeRestriction: 1,
        createdAt: "2022-09-15T12:40:55.951Z",
        publicationDate: "2022-09-15T12:40:55.951Z",
        availableResolutions: "P144"
    }
]

export const videosRouter = Router({})
// post +++
videosRouter.post('/', (req: Request, res: Response) => {
    let title = req.body.title
    let author = req.body.author

    let error = false
    let textError = []
    if (!title || typeof title !== 'string' || !title.trim() || title.length >= 40) {
        error = true
        textError.push('title')
    }
    if (!author || typeof author !== 'string' || !author.trim() || author.length >= 20) {
        error = true
        textError.push('author')
    }

    if (error) {
         res.status(400).send({
            errorsMessages: [{
                message: `Incorrect ${textError}`,
                field: `${textError}`
            }]
        })

        return
    }

    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: Math.floor(Math.random() * 17 + 1),
        createdAt: new Date(+new Date() + 97200 * 1000).toISOString(),
        publicationDate: new Date(+new Date() + 10800 * 1000).toISOString(),
        availableResolutions: req.body.availableResolutions
    }
    videos.push(newVideo)

    res.status(201).send(newVideo)
}) // Create new video
// get +++
videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
}) // Return all video
// get id ---
videosRouter.get('/:id', (req: Request, res: Response) => {
    const video = videos.find(v => v.id === +req.params.id)

    if (video) {
        res.status(200).send(video)
        return
    } else {
        res.sendStatus(404)
    }
}) // Return video by id
// put ---
videosRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.find(v => v.id === id)

    let title = req.body.title
    let author = req.body.author

    let error = false
    let textError
    if (!title || typeof title !== 'string' || !title.trim() || title.length>= 40) {
        error = true
        textError = 'title'
    } else if (!author || typeof author !== 'string' || !author.trim() || author.length >= 20) {
        error = true
        textError = 'author'
    } else if (req.body.minAgeRestriction < 1 || req.body.minAgeRestriction > 18) {
        error = true
        textError = 'minAgeRestriction'
    }

    if (error) {
        res.status(400).send({
            errorsMessages: [{
                message: `Incorrect ${textError}`,
                field: `${textError}`
            }]
        })

        return
    }

    if (video) {
        video.title = req.body.title;
        video.author = req.body.author
        return res.status(204).send(video)
    } else {
        return res.sendStatus(404)
    }
}) // Update existing video by id with InputModel
// delete id +++
videosRouter.delete('/:id', (req: Request, res: Response) => {
    const newVideos = videos.filter(v => v.id !== +req.params.id)
    if (newVideos.length < videos.length) {
        videos = newVideos
        res.sendStatus(204)
        return
    } else {
        res.sendStatus(404)
    }
}) //Delete video by id