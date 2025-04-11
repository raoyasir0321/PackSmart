class AdminService {
    async getAdminById(data, context) {
        return await context.userService.getUserById(data)
    }

    async updateUser(id, data, context) {
        return await context.userService.updateUser(id, data)
    }
}

module.exports = new AdminService()