const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const Validation = require('../helpers/validationHelper');
const UserHelper = require('../helpers/userHelper');
const GeneralHelper = require('../helpers/generalHelper');
const Middleware = require('../middleware/studentMiddleware');
const { decryptPayload } = require('../utils/decryptHelper');
const secretKey = 'super_strong_key';

const register = async (request, reply) => {
    try {
        let data = request.body;

        let name = data.name;
        let email = decryptPayload(data?.email);
        let contact = decryptPayload(data?.contact);
        let major_id = Number(decryptPayload(data?.major_id));
        let password = decryptPayload(data?.password);

        Validation.studentAddValidation({ name, email, contact, major_id, password })

        const response = await UserHelper.register(name, email, contact, major_id, password)

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
        Validation.login(request.body);

        const data = request.body;

        let email = decryptPayload(data?.email);
        let password = decryptPayload(data?.password);

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