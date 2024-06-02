import { EventType } from "./eventType.interface";


export interface EventResponseDTO {
    id: number;
    title: string;
    userId: number;
    groupId: number | null;
    creationDate: string;
    type: EventType;
}