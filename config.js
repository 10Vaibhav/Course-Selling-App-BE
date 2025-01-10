// this file is created because to avoid circular dependency.

const dotenv = require("dotenv")

dotenv.config()

const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

module.exports = {
    JWT_ADMIN_PASSWORD: JWT_ADMIN_PASSWORD,
    JWT_USER_PASSWORD: JWT_USER_PASSWORD
}

