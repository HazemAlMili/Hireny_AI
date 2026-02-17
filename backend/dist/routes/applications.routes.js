"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applications_controller_1 = require("../controllers/applications.controller");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
// Submit application (public or authenticated)
router.post('/', auth_1.optionalAuth, upload_1.upload.single('resume'), validation_1.createApplicationValidation, applications_controller_1.ApplicationsController.submitApplication);
// Get applicant's own applications (authenticated)
router.get('/my-applications', auth_1.authenticate, applications_controller_1.ApplicationsController.getMyApplications);
// Get single application (authenticated)
router.get('/:id', auth_1.authenticate, applications_controller_1.ApplicationsController.getApplication);
exports.default = router;
//# sourceMappingURL=applications.routes.js.map