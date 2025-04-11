const { parsePhoneNumber } = require("awesome-phonenumber");
const CustomErrorApi = require("../../../error");
const {
  requiredFieldsPresent,
  createToken,
  createDocument,
  getById,
  getByField,
  extractFields,
  updateSingleDocument,
  validateFieldsForUpdate,
} = require("../../../utils");
const bcrypt = require("bcrypt");
const User = require("../models");

class UserService {
  constructor(model) {
    this.model = model;
  }

  async createUser(data) {
    const { isValid, message } = requiredFieldsPresent(
      ["username", "firstName", "lastName", "email", "password", "phoneNumber"],
      data
    );
    if (!isValid) {
      throw new CustomErrorApi(message, 400);
    }
    const { email, password, phoneNumber } = data;
    const exists = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (exists) {
      throw new CustomErrorApi("User already exits", 400);
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const pn = parsePhoneNumber(phoneNumber, { regionCode: "PK" });
    if (!pn.valid) throw new CustomErrorApi("Enter a Valid Phone Number", 400);
    const user = await createDocument(
      {
        ...data,
        password: hashPassword,
        phoneNumber: pn.number.e164,
        isAdmin: false,
      },
      this.model
    );
    if (!user) throw new CustomErrorApi("User not created", 400);
    const { access_token } = await createToken(user);
    return {
      access_token,
      username: user.username,
      email: user.email,
    };
  }

  async getToken(data) {
    const { isValid, message } = requiredFieldsPresent(
      ["email", "password"],
      data
    );
    if (!isValid) {
      throw new CustomErrorApi(message, 400);
    }
    const { email, password, isAdmin } = data;
    const user = await this.getUserByField({
      email,
      isAdmin: isAdmin || false,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { access_token } = await createToken(user);
      return access_token;
    }
    throw new CustomErrorApi("Invalid email and password", 404);
  }

  async getUserById(id) {
    const user = await getById(id, this.model);
    const fields = [
      "username",
      "firstName",
      "email",
      "lastName",
      "phoneNumber",
      "isAdmin",
    ];
    return extractFields(user, fields);
  }

  async getUserByField(data) {
    return await getByField(data, this.model);
  }

  async updateUser(searchParameter, payload) {
    const { email, password, isAdmin } = payload;
    if (email || password || isAdmin)
      throw new CustomErrorApi("Cannot update Email and Password", 404);
    validateFieldsForUpdate(payload, [
      "username",
      "firstName",
      "email",
      "lastName",
      "phoneNumber",
    ]);
    const user = await updateSingleDocument(
      searchParameter,
      payload,
      this.model
    );
    const fields = [
      "username",
      "firstName",
      "email",
      "lastName",
      "phoneNumber",
      "isAdmin",
    ];
    return extractFields(user, fields);
  }

  async updatePassword(searchParameter, { oldPassword, newPassword }) {
    if (!oldPassword || !newPassword) {
      throw new CustomErrorApi(
        "Both oldPassword and newPassword are required",
        400
      );
    }
    const user = await getByField(searchParameter, this.model);
    if (!user) {
      throw new CustomErrorApi("User not found", 404);
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new CustomErrorApi("Incorrect old password", 400);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await updateSingleDocument(
      searchParameter,
      { password: hashedPassword },
      this.model
    );
    return { message: "Password updated successfully" };
  }
}

module.exports = new UserService(User);
