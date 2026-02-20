import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoadingSpinnerComponent],
  template: `
    <app-header />
    <main class="content">
      <router-outlet />
    </main>
    <app-footer />
    <app-loading-spinner />
  `,
  styles: [`
    .content {
      padding: 80px 16px 60px;
      min-height: 100vh;
      max-width: 1200px;
      margin: 0 auto;
    }

    @media (max-width: 600px) {
      .content {
        padding: 70px 8px 60px;
      }
    }
  `]
})
export class AppComponent {}