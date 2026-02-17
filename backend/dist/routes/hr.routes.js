"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hr_controller_1 = require("../controllers/hr.controller");
const auth_1 = require("../middleware/auth");
const roleCheck_1 = require("../middleware/roleCheck");
const router = (0, express_1.Router)();
// All routes require HR authentication
router.use(auth_1.authenticate, roleCheck_1.requireHR);
router.get('/applications', hr_controller_1.HRController.getAllApplications);
router.get('/applications/:id', hr_controller_1.HRController.getApplicationDetails);
router.put('/applications/:id/status', hr_controller_1.HRController.updateApplicationStatus);
router.get('/stats', hr_controller_1.HRController.getStats);
exports.default = router;
//# sourceMappingURL=hr.routes.js.map