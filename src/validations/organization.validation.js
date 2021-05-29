const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createOrganization = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getOrganizations = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrganization = {
  params: Joi.object().keys({
    organizationId: Joi.string().custom(objectId),
  }),
};

const deleteOrganization = {
  params: Joi.object().keys({
    organizationId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrganization,
  getOrganizations,
  getOrganization,
  deleteOrganization,
};
