import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventResponseDTO } from './model/event.interface';
import { EventRequestDTO } from './model/eventRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  public getUserEvents(userId: number): Observable<EventResponseDTO[]>{
    return this.httpClient.get<EventResponseDTO[]>(`http://localhost:5171/api/Events/user/${userId}`);
  }

  public getGroupEvents(groupId: number): Observable<EventResponseDTO>{
    return this.httpClient.get<EventResponseDTO>(`http://localhost:5171/api/Events/group/${groupId}`);
  }

  public add(event: EventRequestDTO): Observable<void>{
    return this.httpClient.post<void>('http://localhost:5171/api/Events', event);
  }
}
