import express from "express"
import { config } from 'dotenv'
import morgan from "morgan"
import path from "path"
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js"
import cors from "cors"

import recordRoutes from './routes/recordRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import viewRoutes from "./routes/viewRouter.js";

config()

//connectDB
connectDB()

const app = express()

app.set('view engine', 'ejs')


// Cors
app.use(cors({ origin: '*' }))

app.use(morgan('dev'))
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }
app.use(express.json())


app.use(
  express.urlencoded({extended: true})
)

app.use('/app', viewRoutes);

app.use('/api/records', recordRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5780

app.listen(8237, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

