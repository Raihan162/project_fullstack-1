const Router = require('express').Router();

const MajorHelper = require('../helpers/majorHelper');
const GeneralHelper = require('../helpers/generalHelper');

const register = async (request, reply) => {
    try {

        const response = await MajorHelper.getMajors()

        return reply.send({
            message: 'Get Major Success',
            response
        })
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error))
    }
};

Router.get('/list-major', register)

module.exports = Router;