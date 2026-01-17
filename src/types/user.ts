import {ROLE} from './enums'

export interface User {
    id: number;
    name: string;
    email: string;
    role: ROLE,
    createdAt: string
}

