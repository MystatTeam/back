import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface IGroupDiscipline {
    teacherID: Schema.Types.ObjectId;
    disciplineID: Schema.Types.ObjectId;
}

// data type which will be returned after interaction with db and must be returned to client
export interface IGroupDisciplineModel extends IGroupDiscipline, Document {
    _doc?: any
}

// Schema for mongoDB
const GroupDisciplineSchema: Schema = new Schema<IGroupDiscipline>(
    {
        teacherID: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        disciplineID: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// model for interaction with db (operations: create, findById, find, etc.)
export const GroupDisciplineModel = model<IGroupDisciplineModel>('GroupDiscipline', GroupDisciplineSchema);