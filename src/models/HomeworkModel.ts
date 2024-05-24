import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface IHomework {
    classID: Schema.Types.ObjectId;
    publicationDate: Date;
    deadlineDate: Date;
    comment: String;
    fileId: Schema.Types.ObjectId;
    studentID: Schema.Types.ObjectId;
    teacherID: Schema.Types.ObjectId;
    disciplineID: Schema.Types.ObjectId;
    needsToBeChecked: Boolean
    studentHomework?: {
        data: Buffer,
        contentType: string
    }
    studentHomeworkFileType?: string
    grade?: Number
    homeworkComment?: string
    dateOfUpload?: Date
}

// data type which will be returned after interaction with db and must be returned to client
export interface IHomeworkModel extends IHomework, Document {
    _doc?: any
}

// Schema for mongoDB
const HomeworkSchema: Schema = new Schema<IHomework>(
    {
        classID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Class'
        },
        publicationDate: {
            type: Date,
            required: true,
        },
        deadlineDate: {
            type: Date,
            required: true,
        },
        comment: String,
        fileId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'fileId'
        },
        studentID: {
            type: Schema.Types.ObjectId,
            required: true
        },
        teacherID: {
            type: Schema.Types.ObjectId,
            required: true
        },
        disciplineID: {
            type: Schema.Types.ObjectId,
            required: true
        },
        needsToBeChecked: {
            type: Boolean,
            required: true,
            default: false
        },
        studentHomework: {
            data: Buffer,
            contentType: String,
        },
        studentHomeworkFileType: String,
        grade: Number,
        homeworkComment: String,
        dateOfUpload: Date
    },
    {
        timestamps: true,
    }
);

// model for interaction with db (operations: create, findById, find, etc.)
export const HomeworkModel = model<IHomeworkModel>('Homework', HomeworkSchema);