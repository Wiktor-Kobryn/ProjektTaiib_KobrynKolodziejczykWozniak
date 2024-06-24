import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupResponseDTO } from './model/group.interface';
import { GroupRequestDTO } from './model/groupRequest.interface';
import { group } from '@angular/animations';

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

  public addGroup(groupRequest: GroupRequestDTO, creatorId: number): Observable<void> {
    return this.httpClient.post<void>(`http://localhost:5171/api/Groups/creator/${creatorId}`, groupRequest);
  }

  public addUserToGroup(userId: number, groupId: number): Observable<void> {
    return this.httpClient.post<void>(`http://localhost:5171/api/Groups/${userId}/${groupId}`, null);
  }
}
