var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cron from "node-cron";
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
// Database and service imports
import connectToDatabase from './config/db.js';
import { syncPokemonBatchFromResponse } from "./services/pokemonSync/pokemonsync.js";
// Route Imports
import authRoutes from './routes/auth/auth.route.js';
import teamRoutes from './routes/team/team.route.js';
import pokemonRoutes from './routes/pokemon/pokemon.route.js';
import fileUpload from './routes/fileupload/fileuplad.js';
const app = express();
// -----------------------
// Global Middlewares
// -----------------------
// Cookie parser middleware
app.use(cookieParser(process.env.SECRET_COOKIE));
app.set("trust proxy", 1);
// Session configuration
app.use(session({
    secret: process.env.SECRET_COOKIE,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions",
    }),
    cookie: {
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    },
}));
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My Express.js API',
            version: '1.0.0',
            description: 'A sample Express.js API built with TypeScript and Swagger',
        },
    },
    apis: ['./src/routes/*.ts'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
// Body parser for JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// -----------------------
// Rate Limiting Middleware
// -----------------------
// Define a rate limiter: maximum of 100 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
// Apply rate limiter globally (consider applying only to API routes in production)
app.use(limiter);
// -----------------------
// Database Connection
// -----------------------
connectToDatabase();
// -----------------------
// Cron Job for Pokémon Sync
// -----------------------
cron.schedule("0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running daily Pokémon sync...");
    try {
        yield syncPokemonBatchFromResponse();
        console.log("Sync complete");
    }
    catch (error) {
        console.error("Sync error:", error);
    }
}));
// -----------------------
// API Routes
// -----------------------
app.use('/api/auth', authRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/fileUpload', fileUpload);
// Root endpoint for health check
app.get('/', (req, res) => {
    res.status(200).json({ data: 'good connection' });
});
// -----------------------
// Start the Server
// -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
