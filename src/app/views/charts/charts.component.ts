import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BarChartComponent } from '@charts/bar-chart/bar-chart.component';
import { LineChartComponent } from '@charts/line-chart/line-chart.component';
import { PieChartComponent } from '@charts/pie-chart/pie-chart.component';
import { ChartDataService } from '@services/chart-data.service';

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
export class ChartsComponent implements OnInit {

  constructor(
    private chartService: ChartDataService,
  ) { }

  labels: string[] = ['jaja', 'nose', 'gato', 'chau', 'mono', 'pato', 'hola']
  datasets = [
    { data: [30, 60, 26, 43, 62, 89, 70], label: 'Ruedas de pasto' },
    { data: [24, 49, 42, 23, 84, 32, 10], label: 'Bolas de pasto' },
    { data: [23, 24, 32, 42, 10, 49, 84], label: 'Cubos de pasto' },
  ]

  ngOnInit() {
    this.chartService.setLabels(this.labels)
    this.chartService.setDatasets(this.datasets)
  }
}
