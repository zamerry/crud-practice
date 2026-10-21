import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import file_upload from 'express-fileupload'
import cors from 'cors'

import router from "./server-stuff/router.js";
import path from "path";

dotenv.config()

const port = process.env.PORT || 5000
const db_url = process.env.DB_URL

const app = express()
app.use(cors())
app.use(express.json())
app.use(file_upload({}))
app.use(express.static(path.resolve(import.meta.dirname, '..', 'static')))
app.use('/tamerlan', router)

async function start_app() {
    try {
        await mongoose.connect(db_url)
        app.listen(port, () => {
            console.log(`server started on port ${port}`)
        })
    } catch (e) {
        console.log(e.message)
    }
}

start_app()