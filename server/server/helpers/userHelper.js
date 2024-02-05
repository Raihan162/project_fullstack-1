const Boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

const db = require('../../models');
const GeneralHelper = require('../helpers/generalHelper');

const jwtSecretToken = 'super_strong_key';
const jwtExpiresIn = '15m';
const salt = bcrypt.genSaltSync(10);

// eslint-disable-next-line arrow-body-style
const __hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

// eslint-disable-next-line arrow-body-style
const __comparePassword = (payloadPass, dbPass) => {
    return bcrypt.compareSync(payloadPass, dbPass);
}

// eslint-disable-next-line arrow-body-style
const __generateToken = (data) => {
    return jwt.sign(data, jwtSecretToken, { expiresIn: jwtExpiresIn });
}

const register = async (name, email, contact, major, password) => {
    try {
        const checkEmail = await db.users.findOne({
            where: {
                email,
                is_student: true
            }
        });
        console.log(checkEmail)
        if (!_.isEmpty(checkEmail)) {
            return Promise.reject(Boom.badRequest('Email already registered'))
        };

        const hashedPass = __hashPassword(password);

        await db.users.create({
            id: uuidv4(),
            name,
            major_id: major,
            contact,
            email,
            password: hashedPass,
            is_student: false
        });

        return Promise.resolve(true);
    } catch (error) {
        return Promise.reject(error);
    };
};

const loginStudent = async (email, password) => {
    try {
        const student = await db.users.findOne({
            where: {
                email,
                is_student: true
            }
        });
        if (_.isEmpty(student)) {
            return Promise.reject(Boom.notFound('STUDENT_NOT_FOUND'));
        };

        const isPassMatched = __comparePassword(password, student.password);
        console.log(isPassMatched)
        if (!isPassMatched) {
            return Promise.reject(Boom.badRequest('WRONG_CREDENTIALS'));
        };

        const token = __generateToken({
            id: student.id
        })

        return Promise.resolve({ token })
    } catch (error) {
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

module.exports = {
    register,
    loginStudent
}