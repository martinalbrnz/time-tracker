import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RoutesEnum } from '@constants/routes';
import { HttpService } from '@services/http/http.service';
import { ProjectsService } from '@services/projects/projects.service';
import { Project } from '@shared/models/Project.model';
import { Observable } from 'rxjs';

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
export class HoursFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private http: HttpService,
  ) { }

  projects$?: Observable<Project[]>

  form = this.fb.group({
    date_from: [new Date(Date.now()), [Validators.required]],
    // date_to: [new Date(Date.now()), [Validators.required]],
    project: [null, [Validators.required]],
    initHour: ['09:00', [Validators.required]],
    endHour: ['17:00', [Validators.required]]
  })

  ngOnInit(): void {
    this.projects$ = this.projectsService.projects;

    this.http.getAll(RoutesEnum.ProjectAPI).subscribe(res => {
      this.projectsService.setProjects(res);
    })
  }

  extractHourAndMinutes(hhmm: string) {
    return { hh: hhmm.slice(0, 2), mm: hhmm.slice(3, 5) }
  }

  joinDateAndTime(date: Date, time: string): Date {
    const { hh, mm } = this.extractHourAndMinutes(time)
    const joinedDate = new Date(new Date(new Date(new Date(date.setHours(Number(hh))).setMinutes(Number(mm))).setSeconds(0)).setMilliseconds(0))
    return joinedDate
  }

  handleSubmit() {
    const { id } = localStorage;

    const date_from: Date = this.form.value.date_from!
    const initHour: string = this.form.value.initHour!
    const endHour: string = this.form.value.endHour!
    const project: string = this.form.value.project!

    const init_date = this.joinDateAndTime(date_from, initHour)
    const end_date = this.joinDateAndTime(date_from, endHour)

    const hours = (end_date.getTime() - init_date.getTime()) / 1000 / 60 / 60

    const newRegister = {
      user_id: id,
      init_date,
      end_date,
      hours,
      project,
    }

    this.http.create(RoutesEnum.HoursAPI, newRegister).subscribe(res => {
      if (!res.error) {
        this.form.reset({
          date_from: new Date(Date.now()),
          // date_to: new Date(Date.now(),
          project: null,
          initHour: '09:00',
          endHour: '17:00',
        })
      }
    })
  }
}
