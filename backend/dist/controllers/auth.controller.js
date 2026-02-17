"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const user_model_1 = require("../models/user.model");
const auth_1 = require("../config/auth");
class AuthController {
    static async register(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { email, password, full_name } = req.body;
            // Check if user already exists
            const existingUser = await user_model_1.UserModel.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'Email already registered' });
            }
            // Hash password
            const password_hash = await bcrypt_1.default.hash(password, auth_1.authConfig.bcryptRounds);
            // Create user (only applicants can register)
            const user = await user_model_1.UserModel.create(email, password_hash, full_name, 'applicant');
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, auth_1.authConfig.jwtSecret, { expiresIn: auth_1.authConfig.jwtExpiresIn });
            res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                    role: user.role,
                    created_at: user.created_at,
                },
            });
        }
        catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: 'Registration failed' });
        }
    }
    static async login(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { email, password } = req.body;
            // Find user
            const user = await user_model_1.UserModel.findByEmail(email);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            // Verify password
            const isValidPassword = await bcrypt_1.default.compare(password, user.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, auth_1.authConfig.jwtSecret, { expiresIn: auth_1.authConfig.jwtExpiresIn });
            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                    role: user.role,
                    created_at: user.created_at,
                },
            });
        }
        catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Login failed' });
        }
    }
    static async me(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'Not authenticated' });
            }
            const user = await user_model_1.UserModel.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
                created_at: user.created_at,
            });
        }
        catch (error) {
            console.error('Get user error:', error);
            res.status(500).json({ error: 'Failed to get user info' });
        }
    }
    static async updateProfile(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'Not authenticated' });
            }
            const { full_name, email, password, current_password } = req.body;
            const updates = {};
            if (full_name)
                updates.full_name = full_name;
            if (email && email !== req.user.email) {
                const existingUser = await user_model_1.UserModel.findByEmail(email);
                if (existingUser && existingUser.id !== req.user.id) {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                updates.email = email;
            }
            if (password) {
                if (!current_password) {
                    return res.status(400).json({ error: 'Current password is required to set a new password' });
                }
                const user = await user_model_1.UserModel.findById(req.user.id);
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                const isValidPassword = await bcrypt_1.default.compare(current_password, user.password_hash);
                if (!isValidPassword) {
                    return res.status(400).json({ error: 'Incorrect current password' });
                }
                updates.password_hash = await bcrypt_1.default.hash(password, auth_1.authConfig.bcryptRounds);
            }
            if (Object.keys(updates).length > 0) {
                await user_model_1.UserModel.update(req.user.id, updates);
            }
            // Re-fetch user to get updated fields
            const updatedUser = await user_model_1.UserModel.findById(req.user.id);
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Generate new token with potential new email
            const token = jsonwebtoken_1.default.sign({ id: updatedUser.id, email: updatedUser.email, role: updatedUser.role }, auth_1.authConfig.jwtSecret, { expiresIn: auth_1.authConfig.jwtExpiresIn });
            res.json({
                message: 'Profile updated successfully',
                token,
                user: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    full_name: updatedUser.full_name,
                    role: updatedUser.role,
                    created_at: updatedUser.created_at,
                },
            });
        }
        catch (error) {
            console.error('Update profile error:', error);
            res.status(500).json({ error: 'Failed to update profile' });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map