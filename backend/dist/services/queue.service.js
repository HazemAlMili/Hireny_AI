"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluationQueue = void 0;
const application_model_1 = require("../models/application.model");
const job_model_1 = require("../models/job.model");
const gemini_service_1 = require("./gemini.service");
const gemini_1 = require("../config/gemini");
/**
 * Simple in-memory queue for processing resume evaluations
 */
class EvaluationQueue {
    constructor() {
        this.processing = false;
        this.queue = []; // application IDs
    }
    /**
     * Add application to evaluation queue
     */
    async add(applicationId) {
        this.queue.push(applicationId);
        console.log(`Application ${applicationId} added to queue. Queue size: ${this.queue.length}`);
        // Start processing if not already running
        if (!this.processing) {
            this.processQueue();
        }
    }
    /**
     * Process all applications in the queue
     */
    async processQueue() {
        this.processing = true;
        console.log('Starting queue processing...');
        while (this.queue.length > 0) {
            const applicationId = this.queue.shift();
            if (applicationId) {
                await this.evaluateApplication(applicationId);
            }
        }
        this.processing = false;
        console.log('Queue processing completed');
    }
    /**
     * Evaluate a single application
     */
    async evaluateApplication(applicationId) {
        try {
            console.log(`Evaluating application ${applicationId}...`);
            // Update status to evaluating
            await application_model_1.ApplicationModel.updateStatus(applicationId, 'evaluating');
            // Get application and job details
            const application = await application_model_1.ApplicationModel.findById(applicationId);
            if (!application) {
                console.error(`Application ${applicationId} not found`);
                return;
            }
            const job = await job_model_1.JobModel.findById(application.job_id);
            if (!job) {
                console.error(`Job ${application.job_id} not found for application ${applicationId}`);
                await application_model_1.ApplicationModel.updateStatus(applicationId, 'rejected');
                return;
            }
            // Evaluate resume using the local file path
            if (!application.resume_path) {
                throw new Error(`Application ${applicationId} has no resume file`);
            }
            console.log(`Evaluating resume: ${application.resume_path}`);
            const evaluation = await gemini_service_1.GeminiService.evaluateResume(application.resume_path, job);
            // Determine status based on score and threshold
            let newStatus = 'under_review';
            if (evaluation.score < gemini_1.aiScoreThreshold) {
                newStatus = 'rejected';
            }
            // Update application with evaluation results
            await application_model_1.ApplicationModel.updateEvaluation(applicationId, evaluation.score, evaluation.feedback, newStatus);
            console.log(`Application ${applicationId} evaluated: Score ${evaluation.score}/10 - Status: ${newStatus}`);
        }
        catch (error) {
            console.error(`Error evaluating application ${applicationId}:`, error);
            // Update to rejected on error
            await application_model_1.ApplicationModel.updateEvaluation(applicationId, 0, 'An error occurred during evaluation. Please contact support.', 'rejected');
        }
    }
    /**
     * Get current queue size
     */
    getQueueSize() {
        return this.queue.length;
    }
    /**
     * Check if queue is processing
     */
    isProcessing() {
        return this.processing;
    }
}
// Export singleton instance
exports.evaluationQueue = new EvaluationQueue();
//# sourceMappingURL=queue.service.js.map