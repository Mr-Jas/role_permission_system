const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  hasAuthorization: state => authorization => {
    return state.permission.authorization.some(auth => {
      return auth === authorization
    })
  }
}
export default getters
