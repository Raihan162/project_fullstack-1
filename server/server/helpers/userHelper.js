const Boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

const db = require('../../models');
const GeneralHelper = require('../helpers/generalHelper');
const { uploadToCloudinary } = require('../services/cloudinary');

const jwtSecretToken = 'super_strong_key';
const jwtExpiresIn = '24h';
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

const register = async (name, email, contact, major_id, password, imageUrl) => {
    try {
        const checkEmail = await db.users.findOne({
            where: {
                email,
                is_student: true
            }
        });
        if (!_.isEmpty(checkEmail)) {
            return Promise.reject(Boom.badRequest('Email already registered'))
        };

        let imageResult = await uploadToCloudinary(imageUrl, 'image');
        console.log(imageResult, '<<<<<< IMAGE');

        // const hashedPass = __hashPassword(password);

        // await db.users.create({
        //     id: uuidv4(),
        //     name,
        //     major_id,
        //     contact,
        //     email,
        //     password: hashedPass,
        //     is_student: true
        // });

        return Promise.resolve(true);
    } catch (error) {
        return Promise.reject(error);
    };
};

const loginStudent = async (email, password) => {
    try {
        if (!email || !password) {
            return Promise.reject(Boom.badRequest('Please fill username and password'))
        }
        const student = await db.users.findOne({
            where: {
                email
            }
        });
        if (_.isEmpty(student)) {
            return Promise.reject(Boom.notFound('Student not found'));
        };

        const isPassMatched = __comparePassword(password, student.password);
        console.log(isPassMatched)
        if (!isPassMatched) {
            return Promise.reject(Boom.badRequest('Wrong password'));
        };

        const token = __generateToken({
            id: student.id,
            is_student: student.is_student,
            major_id: student.major_id
        })

        return Promise.resolve({ token })
    } catch (error) {
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getDetailUser = async (dataToken) => {
    try {
        const response = await db.users.findOne({
            where: {
                id: dataToken.id
            },
            include: {
                model: db.majors,
                attributes: ['id', 'name']
            },
            attributes: ['id', 'name', 'email', 'contact']
        })
        return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    register,
    loginStudent,
    getDetailUser
}