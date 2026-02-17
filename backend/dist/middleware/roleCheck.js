"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireApplicant = exports.requireHR = void 0;
const requireHR = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    if (req.user.role !== 'hr') {
        return res.status(403).json({ error: 'HR access required' });
    }
    next();
};
exports.requireHR = requireHR;
const requireApplicant = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    if (req.user.role !== 'applicant') {
        return res.status(403).json({ error: 'Applicant access required' });
    }
    next();
};
exports.requireApplicant = requireApplicant;
//# sourceMappingURL=roleCheck.js.map