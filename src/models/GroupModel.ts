import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface IGroup {
    groupName: string
}

// data type which will be returned after interaction with db and must be returned to client
export interface IGroupModel extends IGroup, Document {
    _doc?: any
}

// Schema for mongoDB
const GroupSchema: Schema = new Schema<IGroup>(
    {
        groupName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// model for interaction with db (operations: create, findById, find, etc.)
export const GroupModel = model<IGroupModel>('Group', GroupSchema);