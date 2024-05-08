import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import configuration from './config/index.js';
import bothRoute from './routers/index.js';
import documentation from "./docs/openai.json" assert {type:"json"};
import swaggerUi from "swagger-ui-express";
import errorHandler from "./middlewares/errorHandler.js";

const corsOptions = {
    allowedHeaders: ["Authorization","Content-Type"],
    methods: ["GET", "POST", "UPDATE" ],
    origin: ["http://192.168.1.150:8080", "//https://contact-app-client-xbck.onrender.com/"],
}

const app =express();
app.use(cors());
app.use(express.json());
app.use('/api/library/', bothRoute);
app.use('/api_doc',swaggerUi.serve, swaggerUi.setup(documentation));
//app.use('/api_doc',swaggerUi.setup(documentation));


mongoose.connect("mongodb+srv://roseumutesi:roseumutesi123@cluster0.fwgqsc2.mongodb.net/Read_Now")
.then(() => {
    console.log("Connected to MongoDB");
    
    })
.catch(err => {
    console.log(err)
});
app.listen(configuration.PORT,() => {
    console.log(`server is listening on port ${configuration.PORT}`);
})
app.use(errorHandler);


















