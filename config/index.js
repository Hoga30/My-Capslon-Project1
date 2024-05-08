import dotenv from "dotenv";
dotenv.config();

const configs = {
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
    CLIENT_APP: process.env.CLIENT_APP || 'http://localhost:8000',
    PORT: process.env.PORT || 8000 ,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY|| "pinky",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    JWT_REFRESH_COOKIE_NAME: process.env.JWT_REFRESH_COOKIE_NAME,
}

export default configs; 