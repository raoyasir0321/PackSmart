class AuthService {
    async createUser(body, context) {
        return await context.userService.createUser(body)
    }
    async userLogin(body, context) {
        return await context.userService.getToken(body)
    }
    async adminLogin(body, context) {
        body.isAdmin = true
        return await context.userService.getToken(body)
    }
}

module.exports = new AuthService()