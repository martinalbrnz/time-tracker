import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BarChartComponent } from '@charts/bar-chart/bar-chart.component';
import { LineChartComponent } from '@charts/line-chart/line-chart.component';
import { PieChartComponent } from '@charts/pie-chart/pie-chart.component';
import { RoutesEnum } from '@constants/routes';
import { ChartDataService } from '@services/chart-data.service';
import { HttpService } from '@services/http/http.service';
import { registerToChartByProject } from '@shared/functions/chartsAdapter';
import { Register } from '@shared/models/Register.model';

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
    private http: HttpService,
  ) { }
  registers?: Register[]

  labels: string[] = ['02/12', '03/12', '04/12', '05/12', '06/12', '07/12', '08/12']
  datasets: any = [
    { data: [30, 60, 26, 43, 62, 89, 70], label: 'Ruedas de pasto' },
    { data: [24, 49, 42, 23, 84, 32, 10], label: 'Bolas de pasto' },
    { data: [23, 24, 32, 42, 10, 49, 84], label: 'Cubos de pasto' },
  ]

  ngOnInit() {
    const { id } = localStorage
    this.http.getAll(`${RoutesEnum.HoursAPI}?user=${id}`).subscribe((res: any) => {
      // console.log('res: ', registerToChartByProject(res));
      const { labels, datasets } = registerToChartByProject(res);
      // this.labels = labels
      // this.datasets = datasets
      this.chartService.setLabels(labels)
      this.chartService.setDatasets(datasets)
      this.registers = res
    })

    // this.chartService.setLabels(this.labels)
    // this.chartService.setDatasets(this.datasets)
  }
}
