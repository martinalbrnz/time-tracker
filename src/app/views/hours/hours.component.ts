import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HoursFormComponent } from '@shared/components/hours-form/hours-form.component';

@Component({
  selector: 'app-hours',
  standalone: true,
  imports: [CommonModule, HoursFormComponent],
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent {

}
