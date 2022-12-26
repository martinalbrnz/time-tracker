import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarChartComponent } from '@charts/bar-chart/bar-chart.component';
import { LineChartComponent } from '@charts/line-chart/line-chart.component';
import { PieChartComponent } from '@charts/pie-chart/pie-chart.component';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    CommonModule,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
  ],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent { }
