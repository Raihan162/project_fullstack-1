const db = require('../../models');

const getMajors = async () => {
    try {
        const response = await db.majors.findAll();

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    };
};

module.exports = {
    getMajors
};