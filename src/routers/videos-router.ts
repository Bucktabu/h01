import {Request, Response, Router} from "express";

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

videosRouter.post('/', (req: Request, res: Response) => {
    let title = req.body.title
    let author = req.body.author

    let error = false
    let textError
    if (!title || typeof title !== 'string' || !title.trim() || title.length >= 40) {
        error = true
        textError = title
    } else if (!author || typeof author !== 'string' || !author.trim() || author.length >= 20) {
        error = true
        textError = author
    }

    if (error) {
        res.status(400).send({
            errorsMessages: [{
                message: `Incorrect ${textError}`,
                field: `${textError}`
            }]
        })
    }

    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: req.body.availableResolutions
    }
    //videos.push(newVideo) ???

    res.status(201).send(newVideo)
}) // Create new video

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
}) // Return all video

videosRouter.get('/:id', (req: Request, res: Response) => {
    const id = + req.params.id
    const video = videos.find(v => v.id === id)

    if (video) {
        res.status(204).send(video)
    } else {
        res.status(404)
    }
}) // Return video by id

videosRouter.put('/:id', (req: Request, res: Response) => {
    const id = + req.params.id
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
    }

    if (video) {
        video.title = req.body.title;
        video.author = req.body.author
        res.status(204).send(video)
    } else {
        res.status(404)
    }
}) // Update existing video by id with InputModel

videosRouter.delete('/', (req: Request, res: Response) => {
    const newVideos = videos.slice(0, videos.length)
    if (newVideos.length === 0) {
        videos = newVideos
        res.status(204)
    } else {
        res.status(404)
    }
})

videosRouter.delete('/:id', (req: Request, res: Response) => {
    const id = + req.params.id
    const newVideos = videos.filter(v => v.id !== id)
    if (newVideos.length < videos.length) {
        videos = newVideos
        res.status(204)
    } else {
        res.status(404)
    }
})