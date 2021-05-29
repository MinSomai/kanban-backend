const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', 'manageUsers', 'manageOrganizations', 'getOrganizations']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'manageOrganizations', 'getOrganizations']);

module.exports = {
  roles,
  roleRights,
};
