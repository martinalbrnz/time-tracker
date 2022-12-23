import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-layout-container',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss']
})
export class LayoutContainerComponent {

}
