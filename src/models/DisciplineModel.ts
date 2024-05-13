import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface IDiscipline {
    disciplineName: string;
}

// data type which will be returned after interaction with db and must be returned to client
export interface IDisciplineModel extends IDiscipline, Document {
    _doc?: any
}

// Schema for mongoDB
const DisciplineSchema: Schema = new Schema<IDiscipline>(
    {
        
        disciplineName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// model for interaction with db (operations: create, findById, find, etc.)
export const DisciplineModel = model<IDisciplineModel>('Discipline', DisciplineSchema);