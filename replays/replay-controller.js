import * as replayDao from './replay-dao.js'
import * as usersDao from "../users/user-dao.js"
import * as pageDao from "../pages/page-dao.js"

const ReplayController = (app) => {
    app.get('/api/replays', getAllReplays)
    app.get('/api/replays/:username', getUsersReplays)
    app.get('/api/replays/single/:replayId', getSingleReplay)
    app.get('/api/replays/page/:title', getReplaysForPage)
    app.delete('/api/replays/:username', clearUsersReplays)
    app.delete('/api/replays/single/:replayId', deleteReplay)
    app.post('/api/replays/save', addReplay)
}

const getAllReplays = async (req, res) => {
    const replays = await replayDao.findAllReplays()
    res.json(replays)
}

const getUsersReplays = async (req, res) => {
    const username = req.params.username
    const replays = await replayDao.findReplaysByUsername(username)
    res.json(replays)
}

const getSingleReplay = async (req, res) => {
    const replayId = req.params.replayId
    const replay = await replayDao.findReplay(replayId)
    res.json(replay)
}

const clearUsersReplays = async (req, res) => {
    const username = req.params.username
    
    if(req.session['currentUser'] == userame) {
        const success = await replayModel.clearUsersReplays(username)
        res.status(200)
        return
    }

    res.status(403) //Forbidden if unlogged in
}

const deleteReplay = async (req, res) => {
    const replayId = req.params.replayId
    const replay = await replayDao.findReplay(replayId)
    if(replay && replay.username == req.session['currentUser'].username) {
        const result = await replayDao.deleteReplay(replayId)
        res.json(replayId)
        return
    }

    res.status(403)
}

const addReplay = async (req, res) => {
    const replay = req.body
    if(replay.username == req.session['currentUser'].username) {
        const user = await usersDao.findUserByUsername(replay.username)
        replay.user = user._id
        const page = await pageDao.getPageFromTitle(replay.title)
        const result = await replayDao.addReplay(replay)
        res.json(result)
        return
    }
    res.status(403)
}

const getReplaysForPage = async (req, res) => {
    const result = await replayDao.findReplaysForPage(req.params.title)
    console.log(result)
    res.json(result)
}

export default ReplayController;
