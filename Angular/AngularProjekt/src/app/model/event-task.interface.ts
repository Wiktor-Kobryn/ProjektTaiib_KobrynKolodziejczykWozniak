export interface EventTaskResponseDTO {
    id: number;
    eventId: number;
    body: string;
    deadline: string;
    creationDate: string;
    isFinished: boolean;
}