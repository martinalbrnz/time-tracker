import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataService } from '@services/chart-data/chart-data.service';
import { accumulateValues } from '@shared/functions/chartsAdapter';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule,
  ],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private chartService: ChartDataService,
  ) {
    Chart.register(Annotation)
  }

  labels$?: Observable<string[]>
  datasets$?: Observable<{ data: (number | null)[], label: string }[]>

  labels: string[] = []
  datasets: { data: (number | null)[], label: string }[] = []

  public lineChartType: ChartType = 'line';
  public lineChartData?: ChartConfiguration['data']
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      y: {
        position: 'left',
      },
    },
    plugins: {
      legend: { display: true },
      annotation: {}
    },
  };

  ngOnInit() {
    this.labels$ = this.chartService.labels
    this.datasets$ = this.chartService.datasets

    this.labels$.subscribe(labels => {
      this.labels = labels
      this.lineChartData = {
        labels: this.labels,
        datasets: this.datasets,

      }
    })

    this.datasets$.subscribe(datasets => {
      this.datasets = accumulateValues(datasets)
      this.lineChartData = {
        datasets: this.datasets,
        labels: this.labels
      }
    })
  }
}
