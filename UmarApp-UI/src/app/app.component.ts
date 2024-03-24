import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UmarApp-UI';
  selectedMenu = 'Products';

  constructor(private router: Router) {
    const token = '1234567890123456';
    localStorage.setItem('jwtToken', token);
  }

  onMenuClick(menuItem: string) {
    this.selectedMenu = menuItem;

    switch (menuItem) {
      case 'Products':
        this.router.navigate(['/products']);
        break;
      case 'Sales':
        this.router.navigate(['/sales']);
        break;
      case 'Purchases':
        this.router.navigate(['/purchases']);
        break;
    }
  }
}
