const httpStatus = require('http-status');
const { Project, Organization } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a project
 * @param {Object} projectBody
 * @returns {Promise<Project>}
 */
const createProject = async (organizationId, projectBody) => {
  const project = await Project.create(projectBody);
  Organization.findByIdAndUpdate(organizationId, { $push: { projects: project._id } }).exec();
  return project;
};

/**
 * Query for projects
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProjects = async (filter, options) => {
  const projects = await Project.paginate(filter, options);
  return projects;
};

/**
 * Get project by id
 * @param {ObjectId} id
 * @returns {Promise<Project>}
 */
const getProjectById = async (id) => {
  // TODO: use organizationId
  return Project.findById(id);
};

/**
 * Delete project by projectId
 * @param {ObjectId} orgId
 * @returns {Promise<Project>}
 */
const deleteProjectById = async (orgId, projectId) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  await project.remove();

  Organization.findOne({ _id: orgId }, function (err, organization) {
    organization.projects.pull(projectId);
    organization.save();
  });
  return project;
};

module.exports = {
  createProject,
  queryProjects,
  getProjectById,
  deleteProjectById,
};
