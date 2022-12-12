import replayModel from "./replay-model.js"

export const addReplay = async (replay) => {
    return await replayModel.create(replay)
}

export const findReplaysByUsername = async (username) => {
    return await replayModel.find({username})
}

export const findReplay = async (replayId) => {
    return await replayModel.findOne({_id: replayId})
}

export const findAllReplays = async () => {
    return await replayModel.find()
}

export const clearUsersReplays = async (username) => {
   return await replayModel.delete({username}) 
}

export const deleteReplay = async (replayid) {
    return await replayModel.deleteOne({_id: replayId})
}
