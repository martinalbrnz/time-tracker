import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { periods, TimePeriodsEnum } from '@constants/timePeriods';
import { changeSelectedDate, parseDateToParams } from '@shared/functions/dateAdapter';

@Component({
  selector: 'app-period-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatRippleModule,
  ],
  providers: [DatePipe],
  templateUrl: './period-selector.component.html',
  styleUrls: ['./period-selector.component.scss']
})
export class PeriodSelectorComponent implements OnInit {

  constructor(
    private router: Router,
    private datePipe: DatePipe,
  ) {
    this.updateDateParams()
  }

  selectedDate: Date = new Date(Date.now())
  period: string = localStorage.getItem('period') ?? TimePeriodsEnum.Week
  init_date?: Date
  end_date?: Date

  TimePeriodsEnum = TimePeriodsEnum
  periods = periods

  ngOnInit(): void { }

  updateDateParams() {
    ({ init_date: this.init_date, end_date: this.end_date } = parseDateToParams(this.selectedDate, this.period));
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        init_date: this.datePipe.transform(this.init_date, 'yyyy-MM-dd')!,
        end_date: this.datePipe.transform(this.end_date, 'yyyy-MM-dd')!,
      }
    })
  }

  changePeriod(e: any) {
    this.period = e
    localStorage.setItem('period', e)
    this.updateDateParams()
  }

  changeDate(opType: 'add' | 'sub') {
    this.selectedDate = changeSelectedDate(this.selectedDate, this.period, opType);
    this.updateDateParams()
  }
}
