"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationValidation = exports.createJobValidation = exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('full_name').notEmpty().withMessage('Full name is required'),
];
exports.loginValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
];
exports.createJobValidation = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Job title is required'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Job description is required'),
    (0, express_validator_1.body)('requirements').notEmpty().withMessage('Job requirements are required'),
    (0, express_validator_1.body)('location').notEmpty().withMessage('Location is required'),
    (0, express_validator_1.body)('salary_range').notEmpty().withMessage('Salary range is required'),
];
exports.createApplicationValidation = [
    (0, express_validator_1.body)('job_id').isInt().withMessage('Valid job ID is required'),
    (0, express_validator_1.body)('full_name').notEmpty().withMessage('Full name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('phone').optional().isString().withMessage('Phone number must be a string'),
];
//# sourceMappingURL=validation.js.map