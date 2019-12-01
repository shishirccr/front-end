import {User} from './user';

export class Conversation {
    id: number;
    topic: string="";
    userId: User;
    timestamp: number;
    recepId: User;
}
