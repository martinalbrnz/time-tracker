import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataService } from '@services/chart-data.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';


import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule,
  ],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private chartService: ChartDataService
  ) { }

  labels$?: Observable<string[]>
  datasets$?: Observable<{ data: (number | null)[], label: string }[]>

  labels: string[] = []
  datasets: { data: (number | null)[], label: string }[] = []

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        max: 100
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'right'
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData?: ChartData<'bar'>;

  ngOnInit() {
    this.labels$ = this.chartService.labels
    this.datasets$ = this.chartService.datasets

    this.labels$.subscribe(labels => {
      this.labels = labels
      this.barChartData = {
        labels,
        datasets: this.datasets,

      }
    })

    this.datasets$.subscribe(datasets => {
      this.datasets = datasets
      this.barChartData = {
        datasets,
        labels: this.labels
      }
    })
  }
}
