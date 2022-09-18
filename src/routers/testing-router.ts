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

export const testingRouter = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    // const newVideos = videos.slice(0, videos.length)
    // if (newVideos.length === 0) {
    //     videos = newVideos
    //     res.sendStatus(204)
    //     return
    // } else {
    //     res.sendStatus(404)
        videos = []
    if (videos.length === 0) {
            res.sendStatus(204)
            return
        } else {
            res.sendStatus(404)
    }
}) // Clear database