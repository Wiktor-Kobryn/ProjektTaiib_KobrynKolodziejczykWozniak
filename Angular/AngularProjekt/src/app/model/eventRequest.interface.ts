import { EventType } from "./eventType.interface";

export interface EventRequestDTO {
    title: string;
    userId: number;
    type: EventType;
}