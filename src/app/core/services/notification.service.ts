import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessagesService } from '../../features/messages/messages.service';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private unreadCountSubject = new BehaviorSubject<number>(0);
  public unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private messagesService: MessagesService) {}

  loadUnreadCount(): void {
    this.messagesService.getMessages().subscribe({
      next: (messages) => {
        const unread = messages.filter(m => !m.is_read).length;
        this.unreadCountSubject.next(unread);
      },
      error: () => {
        this.unreadCountSubject.next(0);
      }
    });
  }

  clearCount(): void {
    this.unreadCountSubject.next(0);
  }
}