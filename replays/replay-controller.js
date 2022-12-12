import * as replayDao from './replay-dao.js'

const ReplayController = (app) => {
    app.get('/api/replays/:username', getUserReplays)
    app.get('/api/replays/single/:replayId', getSingleReplay)
    app.delete('/api/replays/:username', clearUserReplays)
    app.delete('/api/replays/single/:replayId', deleteReplay)
    app.post('/api/replays/add', addReplay)
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
    if(replay && replay.username == req.session['currentUser']) {
        const result =a await replayDao.deleteReplay(replayId)
        res.status(200)
        return
    }

    res.status(403)
}

const addReplay = async (req, res) => {
    const replay = req.body
    if(replay.username == req.session['currentUser']) {
        const result = await replayDao.addReplay(replay)
        res.status(result ? 200 : 404)
        return
    }
    res.status(403)
    const result = await repl
