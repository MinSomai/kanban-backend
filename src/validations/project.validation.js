const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getProjects = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProject = {
  params: Joi.object().keys({
    organizationId: Joi.string().custom(objectId),
    projectId: Joi.string().custom(objectId),
  }),
};

const deleteProject = {
  params: Joi.object().keys({
    organizationId: Joi.string().custom(objectId),
    projectId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  deleteProject,
};
