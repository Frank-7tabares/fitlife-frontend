import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div style="padding: 24px">
      <h1>Mensajes</h1>
      <p>Módulo en construcción...</p>
    </div>
  `
})
export class MessagesComponent {}