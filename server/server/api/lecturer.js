const Router = require('express').Router();

const Validation = require('../helpers/validationHelper');
const LecturerHelper = require('../helpers/lecturerHelper');
const GeneralHelper = require('../helpers/generalHelper');
const Middleware = require('../middleware/studentMiddleware');

const listLecturer = async (request, reply) => {
    try {
        const response = await LecturerHelper.getLecturerList();

        return reply
            .status(200)
            .send({
                message: 'Get All Lecturer Success!',
                response
            });
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error));
    };
};

const addLecturer = async (request, reply) => {
    try {
        Validation.lecturerAddValidation(request.body);

        const { name, contact } = request.body;

        const response = await LecturerHelper.addLecturer(name, contact);

        return reply
            .status(200)
            .send({
                message: 'Add Lecturer Success!',
                response
            });
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error));
    };
};

const deleteLecturer = async (request, reply) => {
    try {
        const { id } = request.query;

        const response = await LecturerHelper.deleteLecturer(id);

        return reply
            .status(200)
            .send({
                message: 'Delete Lecturer Success!',
                response
            });
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error));
    };
};

const updateLecturer = async (request, reply) => {
    try {
        const { id } = request.query;
        const { name, contact } = request.body;

        const response = await LecturerHelper.updateLecturer(id, name, contact);

        return reply
            .status(200)
            .send({
                message: 'Update Lecturer Success!',
                response
            });
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error));
    };
};

const getMyStudent = async (request, reply) => {
    try {
        const dataToken = request.body.studentToken;
        const response = await LecturerHelper.getMyStudent(dataToken);

        return reply
            .status(200)
            .send({
                message: 'Get My Student Success!',
                response
            });
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error));
    }
}

Router.get('/list', listLecturer);
Router.post('/add', addLecturer);
Router.delete('/delete', deleteLecturer);
Router.patch('/update', updateLecturer);
Router.get('/my-student', Middleware.validateToken, getMyStudent);

module.exports = Router;