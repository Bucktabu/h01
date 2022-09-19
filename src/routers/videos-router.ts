import {Request, Response, Router} from "express";
export const videosRouter = Router({})

enum Resolutions {P144 = 'P144', P240 = 'P240', P360 = 'P360', P480 = 'P480', P720 = 'P720', P1080 = 'P1080', P1440 = 'P1440', P2160 = 'P2160'}

type VideoDBType = {
    id: number,
    title: string
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: Resolutions
} []
let videos: VideoDBType = []

videosRouter.post('/', (req: Request, res: Response) => {
    let title = req.body.title
    let author = req.body.author
    let availableResolutions = req.body.availableResolutions

    let error = false
    let textError = []
    if (typeof title !== 'string' || !title.trim() || title.length >= 40) {
        error = true
        textError.push('title')
    }
    if (typeof author !== 'string' || !author.trim() || author.length >= 20) {
        error = true
        textError.push('author')
    }
    for (let i = 0, l = availableResolutions.length; i < l; i++) {
        const resolutionArray = Object.values(Resolutions)
        if (!resolutionArray.includes(availableResolutions[i])) {
            error = true
            textError.push('availableResolutions')
        }
    }

    let errorsMessage = []
    if (error) {
        for (let i = 0, l = textError.length; i < l; i++) {
            errorsMessage.push({
                message: `Incorrect ${textError[i]}`,
                field: `${textError[i]}`
            })
        }
        res.status(400).send({errorsMessages: errorsMessage})
    }

    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null, //Math.floor(Math.random() * 17 + 1),
        createdAt: new Date(+new Date() + 97200 * 1000).toISOString(),
        publicationDate: new Date(+new Date() + 183600 * 1000).toISOString(),
        availableResolutions: req.body.availableResolutions
    }
    videos.push(newVideo)

    res.status(201).send(newVideo)
}) // Create new video

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
}) // Return all video

videosRouter.get('/:id', (req: Request, res: Response) => {
    const video = videos.find(v => v.id === +req.params.id)

    if (video) {
        res.status(200).send(video)
        return
    } else {
        res.sendStatus(404)
    }
}) // Return video by id

videosRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.find(v => v.id === id)

    let title = req.body.title
    let author = req.body.author
    let publicationDate = req.body.publicationDate
    let availableResolutions = req.body.availableResolutions

    let error = false
    let textError = []
    if (typeof title !== 'string' || !title.trim() || title.length >= 40) {
        error = true
        textError.push('title')
    }
    if (typeof author !== 'string' || !author.trim() || author.length >= 20) {
        error = true
        textError.push('author')
    }
    if (typeof req.body.canBeDownloaded !== 'boolean') {
        error = true
        textError.push('canBeDownloaded')
    }
    if (req.body.minAgeRestriction < 1 || req.body.minAgeRestriction > 18) {
        error = true
        textError.push('minAgeRestriction')
    }
    if (publicationDate[publicationDate.length - 1] !== 'Z') {
        error = true
        textError.push('publicationDate')
    }
    for (let i = 0, l = availableResolutions.length; i < l; i++) {
        const resolutionArray = Object.values(Resolutions)
        if (!resolutionArray.includes(availableResolutions[i])) {
            error = true
            textError.push('availableResolutions')
        }
    }

    let errorsMessage = []
    if (error) {
        for (let i = 0, l = textError.length; i < l; i++) {
            errorsMessage.push({
                message: `Incorrect ${textError[i]}`,
                field: `${textError[i]}`
            })
        }
        res.status(400).send({errorsMessages: errorsMessage})
    }

    if (video) {
        video.title = req.body.title;
        video.author = req.body.author
        video.canBeDownloaded = req.body.canBeDownloaded
        video.canBeDownloaded = req.body.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction
        video.publicationDate = req.body.publicationDate
        video.availableResolutions = req.body.availableResolutions
        return res.status(204).send(video)
    } else {
        return res.sendStatus(404)
    }
}) // Update existing video by id with InputModel

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