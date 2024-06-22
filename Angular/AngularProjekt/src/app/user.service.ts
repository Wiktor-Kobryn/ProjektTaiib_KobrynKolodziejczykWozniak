import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponseDTO } from './model/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public getUserFriends(userId: number): Observable<UserResponseDTO[]> {
    return this.httpClient.get<UserResponseDTO[]>(`http://localhost:5171/api/Users/UserFriends/${userId}`)
  }

  public getUser(userId: number): Observable<UserResponseDTO> {
    return this.httpClient.get<UserResponseDTO>(`http://localhost:5171/api/Users/${userId}`);
  }

  public getUserByEvent(eventId: number): Observable<UserResponseDTO> {
    return this.httpClient.get<UserResponseDTO>(`http://localhost:5171/api/Users/event/${eventId}`);
  }

  public getGroupUsers(groupId: number): Observable<UserResponseDTO[]> {
    return this.httpClient.get<UserResponseDTO[]>(`http://localhost:5171/api/Users/group/${groupId}`);
  }

  public getEventTaskContributors(eventTaskId: number): Observable<UserResponseDTO[]> {
    return this.httpClient.get<UserResponseDTO[]>(`http://localhost:5171/api/Users/eventTask/${eventTaskId}`);
  }
}
