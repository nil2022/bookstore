// Roles are stored on the user document (default: USER). Signup can never set a role;
// promote someone with `npm run set-role -- <userId> admin`.
const ROLES = Object.freeze({
  USER: 'user',
  ADMIN: 'admin'
})

module.exports = {
  ROLES,
  ROLE_VALUES: Object.values(ROLES)
}
