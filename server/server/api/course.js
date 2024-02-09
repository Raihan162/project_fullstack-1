const Router = require('express').Router();

const CourserHelper = require('../helpers/courseHelper');
const Validation = require('../helpers/validationHelper');
const GeneralHelper = require('../helpers/generalHelper');
const Middleware = require('../middleware/studentMiddleware');

const listCourse = async (request, reply) => {
    try {
        const response = await CourserHelper.getCourse();

        return reply
            .status(200)
            .send({
                message: 'Get All Course Success!',
                response
            });
    } catch (err) {
        return reply.send(GeneralHelper.errorResponse(error));
    };
};

const addCourse = async (request, reply) => {
    try {
        Validation.courseAddValidation(request.body);

        const { title, lecturers_id } = request.body;

        const response = await CourserHelper.addCourse(title, lecturers_id);

        return reply
            .status(201)
            .send({
                message: 'Add Course Success!',
                response
            });
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error));
    };
};

const deleteCourse = async (request, reply) => {
    try {
        const { id } = request.query;

        const response = await CourserHelper.deleteCourses(id);

        return reply
            .status(200)
            .send({
                message: 'Delete Course Success!',
                response
            });
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error));
    };
};

const updateCourse = async (request, reply) => {
    try {
        const { id } = request.query;
        const { title, lecturers_id } = request.body;

        const response = await CourserHelper.updateCourses(id, title, lecturers_id);

        return reply
            .status(200)
            .send({
                message: 'Update Course Success!',
                response
            });
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error));
    };
};

const getCourseByMajor = async (request, reply) => {
    try {
        const dataToken = request.body.studentToken
        const response = await CourserHelper.getCourseByMajor(dataToken);
        return reply
            .status(200)
            .send({
                message: 'Get Course By Major Success!',
                response
            });
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error));
    }
};

const getCourseByID = async (request, reply) => {
    try {
        const dataToken = request.body.studentToken
        const response = await CourserHelper.getCourseByID(dataToken);
        return reply
            .status(200)
            .send({
                message: 'Get Course By Major Success!',
                response
            });
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error))
    }
};

const getOtherCourse = async (request, reply) => {
    try {
        const dataToken = request.body.studentToken;
        const response = await CourserHelper.getOtherCourse(dataToken);
        return reply
            .status(200)
            .send({
                message: 'Get Other Course By Major Success!',
                response
            });
    } catch (error) {
        return reply.send(GeneralHelper.errorResponse(error))
    }
};

Router.get('/list', listCourse);
Router.post('/add', addCourse);
Router.delete('/delete', deleteCourse);
Router.patch('/update', updateCourse);
Router.get('/course-by-major', Middleware.validateToken, getCourseByMajor);
Router.get('/course-by-id', Middleware.validateToken, getCourseByID);
Router.get('/other-course', Middleware.validateToken, getOtherCourse)

module.exports = Router;