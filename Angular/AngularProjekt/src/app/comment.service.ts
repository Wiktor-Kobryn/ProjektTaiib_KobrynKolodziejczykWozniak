import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentRequestDTO } from './model/commentRequest.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CommentResponseDTO } from './model/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpClient: HttpClient) { }

  public add(comment: CommentRequestDTO): Observable<void>{
    return this.httpClient.post<void>('http://localhost:5171/api/Comments', comment);
  }

}
