const Router = require('express').Router();

const Validation = require('../helpers/validationHelper');
const UserHelper = require('../helpers/userHelper');
const GeneralHelper = require('../helpers/generalHelper');
const Middleware = require('../middleware/studentMiddleware');

const register = async (request, reply) => {
    try {
        const { name, email, contact, major, password } = request.body

        const response = await UserHelper.register(name, email, contact, major, password)

        return reply.send({
            message: 'Register Success',
            response
        })
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error))
    }
};

const loginStudent = async (request, reply) => {
    try {
        const { email, password } = request.body;

        const response = await UserHelper.loginStudent(email, password)
        return reply.send({
            message: 'Login Success',
            response
        })
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error))
    }
}

Router.post('/register-student', register)
Router.post('/login-student', loginStudent)

module.exports = Router;