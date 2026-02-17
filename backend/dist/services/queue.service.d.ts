/**
 * Simple in-memory queue for processing resume evaluations
 */
declare class EvaluationQueue {
    private processing;
    private queue;
    /**
     * Add application to evaluation queue
     */
    add(applicationId: number): Promise<void>;
    /**
     * Process all applications in the queue
     */
    private processQueue;
    /**
     * Evaluate a single application
     */
    private evaluateApplication;
    /**
     * Get current queue size
     */
    getQueueSize(): number;
    /**
     * Check if queue is processing
     */
    isProcessing(): boolean;
}
export declare const evaluationQueue: EvaluationQueue;
export {};
//# sourceMappingURL=queue.service.d.ts.map