const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const Validation = require('../helpers/validationHelper');
const UserHelper = require('../helpers/userHelper');
const GeneralHelper = require('../helpers/generalHelper');
const Middleware = require('../middleware/studentMiddleware');
const { decryptPayload, decryptTextPayload, decryptObjectPayload } = require('../utils/decryptHelper');
const secretKey = 'super_strong_key';

const register = async (request, reply) => {
    try {
        let data = request.body;
        console.log(request.body)

        let name = data.name;
        let email = decryptTextPayload(data?.email);
        let contact = decryptTextPayload(data?.contact);
        let major_id = Number(decryptTextPayload(data?.major_id));
        let password = decryptTextPayload(data?.password);
        let imageUrl = decryptObjectPayload(data?.imageUrl);
        console.log(name, email, contact, major_id, password, imageUrl, '<<<<<<< API USER')

        Validation.studentAddValidation({ name, email, contact, major_id, password, imageUrl })

        const response = await UserHelper.register(name, email, contact, major_id, password, imageUrl)

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
        });
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error));
    }
};

const getDetailUser = async (request, reply) => {
    try {
        const dataToken = request.body.studentToken;
        const response = await UserHelper.getDetailUser(dataToken);

        return reply.send({
            message: 'Get Detail User Success',
            response
        });
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error));
    }
}

Router.post('/register-student', register);
Router.post('/login-student', loginStudent);
Router.get('/detail-user', Middleware.validateToken, getDetailUser);

module.exports = Router;