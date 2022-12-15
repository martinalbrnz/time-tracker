import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HoursFormComponent } from '@shared/components/hours-form/hours-form.component';
import { HoursUserTableComponent } from '@shared/components/hours-user-table/hours-user-table.component';

@Component({
  selector: 'app-hours',
  standalone: true,
  imports: [
    CommonModule,
    HoursFormComponent,
    HoursUserTableComponent,
  ],
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent {

}
