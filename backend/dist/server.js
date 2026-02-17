"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const errors_1 = require("./utils/errors");
const database_2 = __importDefault(require("./config/database"));
// Import routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const jobs_routes_1 = __importDefault(require("./routes/jobs.routes"));
const applications_routes_1 = __importDefault(require("./routes/applications.routes"));
const hr_routes_1 = __importDefault(require("./routes/hr.routes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5147;
// Middleware
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL,
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        // Check if origin is allowed or is a Vercel preview deployment
        if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
// Express 5: Explicitly set extended to true (default is now false)
app.use(express_1.default.urlencoded({ extended: true }));
// Serve uploaded files statically
const uploadDir = process.env.UPLOAD_DIR || './uploads';
app.use('/uploads', express_1.default.static(uploadDir));
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Gemini AI test endpoint
app.get('/api/test/gemini', async (req, res) => {
    try {
        const { geminiClient, geminiModel } = await Promise.resolve().then(() => __importStar(require('./config/gemini')));
        if (!geminiClient) {
            return res.status(500).json({
                error: 'Gemini client not initialized',
                message: 'Please set GEMINI_API_KEY in your .env file'
            });
        }
        const testPrompt = 'Say "Gemini AI is working!" in a friendly way.';
        const model = geminiClient.getGenerativeModel({ model: geminiModel });
        const result = await model.generateContent(testPrompt);
        const response = await result.response;
        const text = response.text();
        res.json({
            success: true,
            message: 'Gemini AI connection successful!',
            model: geminiModel,
            prompt: testPrompt,
            response: text,
        });
    }
    catch (error) {
        console.error('Gemini test error:', error);
        res.status(500).json({
            success: false,
            error: 'Gemini test failed',
            message: error?.message || 'Unknown error',
            details: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
        });
    }
});
// API Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/jobs', jobs_routes_1.default);
app.use('/api/applications', applications_routes_1.default);
app.use('/api/hr', hr_routes_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Error handler
app.use(errors_1.errorHandler);
// Initialize database and start server
// Express 5: app.listen now passes errors to callback
async function startServer() {
    let server = null;
    const gracefulShutdown = async (signal) => {
        console.log(`\n${signal} signal received: starting graceful shutdown...`);
        if (server) {
            server.close(() => {
                console.log('HTTP server closed');
            });
            // Force close server after 10 seconds
            setTimeout(() => {
                console.error('Could not close connections in time, forcefully shutting down');
                process.exit(1);
            }, 10000);
        }
        // Close database connection
        try {
            database_2.default.close((err) => {
                if (err) {
                    console.error('Error closing database:', err);
                    process.exit(1);
                }
                else {
                    console.log('Database connection closed');
                    console.log('Graceful shutdown completed');
                    process.exit(0);
                }
            });
        }
        catch (error) {
            console.error('Error during database shutdown:', error);
            process.exit(1);
        }
    };
    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    try {
        await (0, database_1.initDatabase)();
        server = app.listen(PORT, (error) => {
            if (error) {
                console.error('Failed to start server:', error);
                process.exit(1);
            }
            console.log(`
🚀 Server is running!
📡 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📝 API: http://localhost:${PORT}/api
      `);
        });
    }
    catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }
}
startServer();
exports.default = app;
//# sourceMappingURL=server.js.map