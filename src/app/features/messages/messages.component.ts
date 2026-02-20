import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MessagesService, Message } from './messages.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="messages-container">
      <h1>Mensajes</h1>

      <div class="messages-layout">
        <!-- Lista de mensajes -->
        <mat-card class="messages-list">
          <mat-card-header>
            <mat-card-title>Conversación</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            @if (isLoading) {
              <p>Cargando mensajes...</p>
            } @else if (messages.length === 0) {
              <div class="empty-state">
                <mat-icon>chat_bubble_outline</mat-icon>
                <p>No tienes mensajes aún</p>
              </div>
            } @else {
              <div class="chat-messages">
                @for (message of messages; track message.id) {
                  <div class="message-bubble" [class.sent]="isSent(message)">
                    <p>{{ message.content }}</p>
                    <span class="time">{{ message.created_at | date:'shortTime' }}</span>
                  </div>
                }
              </div>
            }
          </mat-card-content>

          <!-- Input de mensaje -->
          <mat-card-actions class="message-input">
            <form [formGroup]="messageForm" (ngSubmit)="sendMessage()" class="input-row">
              <mat-form-field appearance="outline" class="input-field">
                <mat-label>Escribe un mensaje...</mat-label>
                <input matInput formControlName="content">
              </mat-form-field>
              <button mat-icon-button color="primary" type="submit"
                      [disabled]="messageForm.invalid || isSending">
                <mat-icon>send</mat-icon>
              </button>
            </form>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .messages-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 { margin-bottom: 24px; }
    .messages-list { height: calc(100vh - 250px); display: flex; flex-direction: column; }
    .chat-messages {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px 0;
      overflow-y: auto;
      max-height: calc(100vh - 380px);
    }
    .message-bubble {
      max-width: 70%;
      padding: 8px 12px;
      border-radius: 12px;
      background: #f0f0f0;
      align-self: flex-start;
    }
    .message-bubble.sent {
      background: #3f51b5;
      color: white;
      align-self: flex-end;
    }
    .message-bubble p { margin: 0; }
    .time {
      font-size: 0.75rem;
      opacity: 0.7;
      display: block;
      margin-top: 4px;
    }
    .message-input { padding: 8px 16px; }
    .input-row {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    .input-field { flex: 1; }
    .empty-state {
      text-align: center;
      padding: 32px;
      color: #666;
    }
    .empty-state mat-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      margin-bottom: 8px;
    }
  `]
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  isLoading = false;
  isSending = false;
  currentUserId = '';
  messageForm;

  constructor(
    private fb: FormBuilder,
    private messagesService: MessagesService
  ) {
    this.messageForm = this.fb.nonNullable.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.isLoading = true;
    this.messagesService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  isSent(message: Message): boolean {
    return message.sender_id === this.currentUserId;
  }

  sendMessage(): void {
    if (this.messageForm.valid) {
      this.isSending = true;
      this.messagesService.sendMessage({
        receiver_id: '',
        content: this.messageForm.value.content!
      }).subscribe({
        next: (msg) => {
          this.messages.push(msg);
          this.messageForm.reset();
          this.isSending = false;
        },
        error: () => {
          this.isSending = false;
        }
      });
    }
  }
}