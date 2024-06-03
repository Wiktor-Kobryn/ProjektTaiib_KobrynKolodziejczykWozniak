import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupResponseDTO } from './model/group.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private httpClient: HttpClient) { }

  public getUserGroups(userId: number): Observable<GroupResponseDTO[]> {
    return this.httpClient.get<GroupResponseDTO[]>(`http://localhost:5171/api/Groups/user/${userId}`)
  }

  public getEventGroup(eventId: number): Observable<GroupResponseDTO> {
    return this.httpClient.get<GroupResponseDTO>(`http://localhost:5171/api/Groups/event/${eventId}`)
  }
}
