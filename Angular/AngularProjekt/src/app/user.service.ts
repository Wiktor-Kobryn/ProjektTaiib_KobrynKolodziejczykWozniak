import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponseDTO } from './model/user.interface';
import { Observable } from 'rxjs';
import { UserRequestDTO } from './model/userRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public getUserFriends(userId: number): Observable<UserResponseDTO[]> {
    return this.httpClient.get<UserResponseDTO[]>(`http://localhost:5171/api/Users/UserFriends/${userId}`)
  }
  public getUsers(userId: number): Observable<UserResponseDTO[]> {
    return this.httpClient.get<UserResponseDTO[]>(`http://localhost:5171/api/Users`)
  }

  public getUserNonFriends(userId: number): Observable<UserResponseDTO[]> {
    return this.httpClient.get<UserResponseDTO[]>(`http://localhost:5171/api/Users/${userId}/NonFriends`)
  }

  public getUserNonFriendsByName(userId: number, name: string): Observable<UserResponseDTO[]> {
    return this.httpClient.get<UserResponseDTO[]>(`http://localhost:5171/api/Users/${userId}/NonFriends/Name`, {params: {name}})
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

  public addFriend(userAId: number, userBId: number): Observable<void> {
    const body = { userAId, userBId };
    return this.httpClient.post<void>(`http://localhost:5171/api/Users/Friendship`, body);
  }

  public changeUser(userId: number, userRequest: UserRequestDTO): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:5171/api/Users/${userId}`, userRequest);
  }
}
