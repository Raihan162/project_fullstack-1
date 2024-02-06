const Joi = require('joi');
const Boom = require('boom');

const studentAddValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    major_id: Joi.number().required(),
    contact: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(6)
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  };
};

const lecturerAddValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    contact: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  };
};

const courseAddValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    lecturers_id: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  };
};

const login = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  };
}

module.exports = {
  studentAddValidation,
  lecturerAddValidation,
  courseAddValidation,
  login
};
