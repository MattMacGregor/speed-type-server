import * as userDao from './user-dao.js'

let currentUser = null

const UsersController = (app) => {

    const findAllUsers = async (req, res) => {
        const users = await userDao.findAllUsers()
        console.log(users)
        res.json(users)
    }
    const createUser = async (req, res) => {
        const newUser = req.body;
        const actualUser = await userDao.createUser(newUser)
        res.json(actualUser)
    }
    const updateUser = async (req, res) => {

        if(req.session['currentUser'] && req.session['currentUser'].username == req.body.username) {
            const newUser = await userDao.updateUser(req.body.username, req.body.update)
            res.json(newUser)
        }
        res.status(404)
    }
    const deleteUser = () => {}

    const register = async (req, res) => {
        const user = req.body;
        const existingUser = await userDao.findUserByUsername(user.username)
        if(existingUser) {
            res.sendStatus(403)
            return
        }
        const currentUser = await userDao.createUser(user)
        req.session['currentUser'] = currentUser
        res.json(currentUser)
    }

    const login = async (req, res) => {
        const credentials = req.body
        const existingUser = await userDao
            .findUserByCredentials(
                credentials.username, credentials.password)
        if(existingUser) {
            req.session['currentUser'] = existingUser
            res.json(existingUser)
            return
        }
        res.sendStatus(403)
    }

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const profile = (req, res) => {
        if (req.session['currentUser']) {
            res.send(req.session['currentUser'])
        } else {
            res.sendStatus(403)
        }
    }

    const findUserByName = async (req, res) => {
        const user = await userDao.findUserByName(req.params.username)
        if (user) {
            res.json(user)
            return
        }
        res.sendStatus(404)
    }

    app.get('/api/users', findAllUsers)
    app.get('/api/users/:username', findUserByName)
    app.post('/api/users', createUser)
    app.put('/api/users/:username', updateUser)
    app.delete('/api/users/:uid', deleteUser)

    app.post('/api/register', register)
    app.post('/api/login', login)
    app.post('/api/logout', logout)
    app.post('/api/profile', profile)
}

export default UsersController

