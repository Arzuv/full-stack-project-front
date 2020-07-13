import { Author } from './author';

export interface Document {
    id: number;
    author: Author;
    name: string;
    whomContract: string;
    whoContracted: string;
    termOfExecution: Date;
    file: string;
    created: Date;
    status: string;
}
