import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventTaskResponseDTO } from './model/event-task.interface';
import { Observable } from 'rxjs';
import { CommentResponseDTO } from './model/comment.interface';
import { EventTaskRequestDTO } from './model/event-taskRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class EventTasksService {

  constructor(private httpClient: HttpClient) { }

  public getEventEventTasks(eventId: number): Observable<EventTaskResponseDTO[]>{
    return this.httpClient.get<EventTaskResponseDTO[]>(`http://localhost:5171/api/EventTasks/event/${eventId}`);
  }

  public getEventTaskComments(eventTaskId: number): Observable<CommentResponseDTO[]>{
    return this.httpClient.get<CommentResponseDTO[]>(`http://localhost:5171/api/EventTasks/${eventTaskId}/Comments`);
  }

  public addTask(userId: number, eventask: EventTaskRequestDTO): Observable<void>{
    return this.httpClient.post<void>(`http://localhost:5171/api/EventTasks/${userId}`, eventask);
  }

  public addUserToEventTask(userId: number, eventTaskId: number): Observable<void>{
    return this.httpClient.post<void>(`http://localhost:5171/api/EventTasks/${userId}/${eventTaskId}`, null);
  }
}
