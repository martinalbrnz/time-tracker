import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutesEnum } from '@constants/routes';
import { ChartDataService } from '@services/chart-data/chart-data.service';
import { HttpService } from '@services/http/http.service';
import { RegistersService } from '@services/registers/registers.service';
import { PieChartComponent } from '@shared/components/charts/pie-chart/pie-chart.component';
import { HoursFormComponent } from '@shared/components/hours-form/hours-form.component';
import { HoursUserTableComponent } from '@shared/components/hours-user-table/hours-user-table.component';
import { PeriodSelectorComponent } from '@shared/components/period-selector/period-selector.component';
import { registerToChartByProject } from '@shared/functions/chartsAdapter';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PieChartComponent,
    PeriodSelectorComponent,
    HoursFormComponent,
    HoursUserTableComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private registersService: RegistersService,
    private chartService: ChartDataService,
    private route: ActivatedRoute,
    private http: HttpService,
  ) { }

  username = localStorage.getItem('name')
  hours?: number

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const { id } = localStorage
      this.http.getAll(`${RoutesEnum.HoursAPI}?user=${id}`, params).subscribe((res: any) => {
        this.registersService.setRegisters(res.data)
        this.hours = res.data.reduce((acc: any, curr: any) => acc + curr.hours, 0)
        res.data.reverse()
        const { labels, datasets } = registerToChartByProject(res.data);
        this.chartService.setLabels(labels)
        this.chartService.setDatasets(datasets)
      })
    })

  }
}
