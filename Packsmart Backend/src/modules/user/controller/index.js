const expressAsyncHandler = require("express-async-handler");

module.exports = {
  getUser: expressAsyncHandler(async (req, res) => {
    const { id: _id } = req.user;
    const { context } = req;
    const user = await context.userService.getUserById({ _id });
    return res.status(200).json({ data: user });
  }),
  updateUser: expressAsyncHandler(async (req, res) => {
    const { id: _id } = req.user;
    const { body, context } = req;
    const user = await context.userService.updateUser({ _id }, body);
    return res.status(200).json({ data: user });
  }),
  updatePassword: expressAsyncHandler(async (req, res) => {
    const { context } = req;
    const { id: _id } = req.user;
    const { oldPassword, newPassword } = req.body;
    const result = await context.userService.updatePassword(
      { _id },
      { oldPassword, newPassword }
    );
    return res.status(200).json(result);
  }),
};
