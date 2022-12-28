import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RegistersService } from '@services/registers/registers.service';
import { PieChartComponent } from '@shared/components/charts/pie-chart/pie-chart.component';
import { PeriodSelectorComponent } from '@shared/components/period-selector/period-selector.component';
import { Register } from '@shared/models/Register.model';
import { Observable, scan, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PieChartComponent,
    PeriodSelectorComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private registersService: RegistersService,
  ) { }

  username = localStorage.getItem('name')
  hours$?: Observable<number>

  ngOnInit(): void {
    this.hours$ = this.registersService.registers
      .pipe(
        switchMap(regs => regs as Register[]),
        scan((prev, curr) => prev + curr.hours, 0),
      )
  }
}
