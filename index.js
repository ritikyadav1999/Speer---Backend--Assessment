const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require('./routes/notesRoute');
const rateLimit = require('express-rate-limit');

// configure env
dotenv.config();

// database cofig
connectDB();

// rest object
const app = express();

// setting up the limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: "Too many API request from this IP, please try again after 15 mins."
})

// Applying the rate limiting middleware to all requests.
app.use("/api", limiter);


// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


// routes
app.use('/api/auth', authRoutes);
app.use('/api/notes/', notesRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
})