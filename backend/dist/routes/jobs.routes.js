"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobs_controller_1 = require("../controllers/jobs.controller");
const auth_1 = require("../middleware/auth");
const roleCheck_1 = require("../middleware/roleCheck");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
// Public routes
router.get('/', jobs_controller_1.JobsController.getActiveJobs);
router.get('/:id', jobs_controller_1.JobsController.getJob);
// HR only routes
router.get('/all/list', auth_1.authenticate, roleCheck_1.requireHR, jobs_controller_1.JobsController.getAllJobs);
router.post('/', auth_1.authenticate, roleCheck_1.requireHR, validation_1.createJobValidation, jobs_controller_1.JobsController.createJob);
router.put('/:id', auth_1.authenticate, roleCheck_1.requireHR, jobs_controller_1.JobsController.updateJob);
router.delete('/:id', auth_1.authenticate, roleCheck_1.requireHR, jobs_controller_1.JobsController.deleteJob);
exports.default = router;
//# sourceMappingURL=jobs.routes.js.map