import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface SendMessageRequest {
  receiver_id: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private apiUrl = `${environment.apiUrl}/api/messages`;

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  sendMessage(data: SendMessageRequest): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, data);
  }

  markAsRead(messageId: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${messageId}/read`, {});
  }
}