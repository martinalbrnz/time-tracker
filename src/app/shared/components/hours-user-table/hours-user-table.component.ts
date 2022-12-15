import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { hoursMock } from '@constants/mocks';
import { Hours } from '@shared/models/Hours.model';

@Component({
  selector: 'app-hours-user-table',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './hours-user-table.component.html',
  styleUrls: ['./hours-user-table.component.scss']
})
export class HoursUserTableComponent {

  hours = hoursMock

  handleEdit(reg: Hours) {
    console.log(reg.id)
  }
}
