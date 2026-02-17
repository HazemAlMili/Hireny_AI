"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiScoreThreshold = exports.geminiModel = exports.geminiClient = void 0;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables first
dotenv_1.default.config();
function createGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn('WARNING: GEMINI_API_KEY is not set. AI evaluation will not work.');
        return null;
    }
    console.log('✅ Gemini AI client initialized successfully');
    return new generative_ai_1.GoogleGenerativeAI(apiKey);
}
exports.geminiClient = createGeminiClient();
exports.geminiModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
exports.aiScoreThreshold = parseInt(process.env.AI_SCORE_THRESHOLD || '5', 10);
//# sourceMappingURL=gemini.js.map