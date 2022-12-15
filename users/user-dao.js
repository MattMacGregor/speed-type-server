import usersModel from "./user-model.js";

export const createUser = async (user) => {
    return await usersModel.create(user)
}

export const findUserByUsername = async (username) => {
    return await usersModel.findOne({username})
}

export const findUserByCredentials = async (username, password) => {
    return await usersModel.findOne({username, password})
}

export const findAllUsers = async () => {
    return await usersModel.find(undefined, {password: false})
}

export const deleteUser = async (uid) => {
    return await usersModel.deleteOne({_id: uid})
}

export const updateUser = async (username, userUpdates) => {
    console.log(username, userUpdates)
    return await usersModel.updateOne({username: username}, {$set: userUpdates})
}

export const findUserByName = async (username) => {
    return await usersModel.find({ username: username}, {password: false})
}
