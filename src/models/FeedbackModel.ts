import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface IFeedback {
    teacherName: String;
    teacherSurname: String;
    teacherAfterFatherName: String;
    subjectName: String;
    text: String;
    date: Date;
    studentId: Schema.Types.ObjectId;
}

// data type which will be returned after interaction with db and must be returned to client
export interface IFeedbackModel extends IFeedback, Document {
    _doc?: any
}

// Schema for mongoDB
const FeedbackSchema: Schema = new Schema<IFeedback>(
    {
        teacherName: {
            type: String,
            required: true,
        },
        teacherSurname: {
            type: String,
            required: true,
        },
        teacherAfterFatherName: {
            type: String,
            required: true,
        },
        subjectName: {

        },
        text: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        studentId: {
            type: Schema.Types.ObjectId,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

// model for interaction with db (operations: create, findById, find, etc.)
export const FeedbackModel = model<IFeedbackModel>('Feedback', FeedbackSchema);