import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataService } from '@services/chart-data/chart-data.service';
import { formatHoursByProject } from '@shared/functions/chartsAdapter';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule,
  ],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private chartService: ChartDataService,
  ) { }

  // labels$?: Observable<string[]>
  datasets$?: Observable<{ data: (number | null)[], label: string }[]>

  labels: string[] = []
  datasets: { data: (number | null)[], label: string }[] = []

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData?: ChartData<'pie', (number | null)[], string | string[]>
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  ngOnInit() {
    // this.labels$ = this.chartService.labels
    this.datasets$ = this.chartService.datasets

    // this.labels$.subscribe(labels => {
    //   this.labels = labels
    //   this.pieChartData = {
    //     labels: this.labels,
    //     datasets: this.datasets,
    //   }
    // })

    this.datasets$.subscribe(datasets => {
      this.datasets = formatHoursByProject(datasets)
      this.labels = datasets.map(proj => proj.label)
      this.pieChartData = {
        labels: this.labels,
        datasets: this.datasets,
      }
    })
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left';
    }

    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }
}
