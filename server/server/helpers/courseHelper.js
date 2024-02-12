const Boom = require('boom');
const { Op } = require("sequelize");

const db = require('../../models/index');

const getCourse = async () => {
    try {
        const response = await db.courses.findAll({
            include: {
                model: db.lecturers,
                attributes: ['name', 'contact']
            },
            attributes: ['id', 'title']
        });

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    };
};

const addCourse = async (title, lecturers_id) => {
    try {
        const checkLecturer = await db.lecturers.findOne({
            where: {
                id: lecturers_id
            }
        });

        if (!checkLecturer) {
            return Promise.reject(Boom.badRequest('Lecturer not found'));
        };

        await db.courses.create({
            title: title,
            lecturers_id: lecturers_id
        });

        return Promise.resolve([]);
    } catch (error) {
        return Promise.reject(error);
    };
};

const deleteCourses = async (id) => {
    try {
        const checkCourse = await db.courses.findOne({
            where: {
                id: id
            }
        });

        if (!checkCourse) {
            return Promise.reject(Boom.badRequest('Course not found'));
        };

        await db.courses.destroy({
            where: {
                id: id
            }
        });

        return Promise.resolve([]);
    } catch (error) {
        return Promise.reject(error);
    };
};

const updateCourses = async (id, title, lecturers_id) => {
    try {
        const checkCourse = await db.courses.findOne({
            where: {
                id: id
            }
        });

        if (!checkCourse) {
            throw new Error('Course doesn`t exist');
        };

        if (lecturers_id) {
            const checkLecturer = await db.lecturers.findOne({
                where: {
                    id: lecturers_id
                }
            });

            if (!checkLecturer) {
                return Promise.reject(Boom.badRequest('Course not found'));
            };
        };


        await db.courses.update({
            title: title ? title : checkCourse?.dataValues.title,
            lecturers_id: lecturers_id ? lecturers_id : checkCourse?.dataValues.id
        }, {
            where: {
                id: id
            }
        });

        return Promise.resolve([]);
    } catch (error) {
        return Promise.reject(error);
    };
};

const getCourseByMajor = async (dataToken) => {
    try {
        const response = await db.courses.findAll({
            where: {
                major_id: dataToken.major_id
            },
            attributes: ['id', 'title']
        })

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getCourseByID = async (dataToken) => {
    try {
        const response = await db.registrations.findAll({
            where: {
                users_id: dataToken.id
            },
            include: [{
                model: db.courses,
                include: {
                    model: db.users,
                    attributes: ['name', 'email', 'contact']
                },
                attributes: ['id', 'title']
            }, {
                model: db.users,
                attributes: ['id', 'name', 'email', 'contact']
            }],
            attributes: ['id', 'registration_date']
        });

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getOtherCourse = async (dataToken) => {
    try {
        const checkRegist = await db.registrations.findAll({
            where: {
                users_id: dataToken.id
            },
            attributes: ['courses_id']
        });

        const courseID = checkRegist.map((data) => data.courses_id);

        const response = await db.courses.findAll({
            where: {
                id: {
                    [Op.notIn]: courseID
                },
                major_id: dataToken.major_id
            },
            attributes: ['id', 'title'],
            include: [
                {
                    model: db.users,
                    attributes: ['name', 'email', 'contact']
                },
                {
                    model: db.majors,
                    attributes: ['name']
                }
            ]
        });
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error)
    }
};

const deleteCourseStudent = async (users_id, courses_id) => {
    try {
        const checkCourseStudent = await db.registrations.findOne({
            where: {
                users_id,
                courses_id
            }
        });

        if (!checkCourseStudent) {
            return Promise.reject(Boom.badRequest('Course student not found'));
        };

        await db.registrations.destroy({
            where: {
                users_id,
                courses_id
            }
        });

        return Promise.resolve([]);
    } catch (error) {
        return Promise.reject(error);
    };
};

module.exports = {
    getCourse,
    addCourse,
    deleteCourses,
    updateCourses,
    getCourseByMajor,
    getCourseByID,
    getOtherCourse,
    deleteCourseStudent
};