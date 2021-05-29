const httpStatus = require('http-status');
const { Organization } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a organization
 * @param {Object} organizationBody
 * @returns {Promise<Organization>}
 */
const createOrganization = async (organizationBody) => {
  const organization = await Organization.create(organizationBody);
  return organization;
};

/**
 * Query for organizations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrganizations = async (filter, options) => {
  const organizations = await Organization.paginate(filter, options);
  return organizations;
};

/**
 * Get organization by id
 * @param {ObjectId} id
 * @returns {Promise<Organization>}
 */
const getOrganizationById = async (id) => {
  return Organization.findById(id);
};

/**
 * Delete organization by id
 * @param {ObjectId} orgId
 * @returns {Promise<Organization>}
 */
const deleteOrganizationById = async (orgId) => {
  const organization = await getOrganizationById(orgId);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  await organization.remove();
  return organization;
};

module.exports = {
  createOrganization,
  queryOrganizations,
  getOrganizationById,
  deleteOrganizationById,
};
