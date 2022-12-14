import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { projectMock } from '@constants/mocks';

@Component({
  selector: 'app-hours-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './hours-form.component.html',
  styleUrls: ['./hours-form.component.scss']
})
export class HoursFormComponent {
  constructor(
    private fb: FormBuilder,
  ) { }

  projects = projectMock

  form = this.fb.group({
    date: [new Date(Date.now()), [Validators.required]],
    project: [null, [Validators.required]],
    initHour: ['09:00', [Validators.required]],
    endHour: ['17:00', [Validators.required]]
  })

  handleSubmit() {
    console.log(this.form.value)
  }
}
