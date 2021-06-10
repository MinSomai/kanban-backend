const roles = ['user', 'admin'];

const roleRights = new Map();

roleRights.set(roles[0], [
  'getUsers',
  'manageUsers',
  'manageOrganizations',
  'getOrganizations',
  'manageProjects',
  'getProjects',
]);

roleRights.set(roles[1], [
  'getUsers',
  'manageUsers',
  'manageOrganizations',
  'getOrganizations',
  'manageProjects',
  'getProjects',
]);

module.exports = {
  roles,
  roleRights,
};
