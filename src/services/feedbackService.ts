import { IFeedback, IFeedbackModel, FeedbackModel } from "../models/FeedbackModel";
const jwt = require('jsonwebtoken');

class FeedbackService {
    async createFeedback(feedbackData: Partial<IFeedback>): Promise<IFeedbackModel> {
        return await FeedbackModel.create(feedbackData);
    }
    async findAllFeedbacks(): Promise<IFeedbackModel[] | null> {
        return await FeedbackModel.find();
    }
    async findAllFeedbacksByStudentId(studentId: string): Promise<IFeedbackModel[] | null> {
        return await FeedbackModel.find({studentId}).exec();
    }
    async findFeedbackById(id: string): Promise<IFeedbackModel | null> {
        return await FeedbackModel.findById(id);
    }
    async updateFeedback(id: string, feedbackData: Partial<IFeedback>): Promise<IFeedbackModel | null> {
        return await FeedbackModel.findByIdAndUpdate({_id: id}, feedbackData, {
            new: true
        });
    }
    async removeFeedback(id: string): Promise<IFeedbackModel | null> {
        return await FeedbackModel.findByIdAndDelete(id);
    }
}

export default new FeedbackService();