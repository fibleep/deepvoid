export interface Message {
    id?: string;
    content: string;
    createdAt?: Date;
    delay?: number;
    position?: number;
}