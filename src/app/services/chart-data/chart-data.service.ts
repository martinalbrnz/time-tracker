import { Injectable } from '@angular/core';
import { RoutesEnum } from '@constants/routes';
import { HttpService } from '@services/http/http.service';
import { registerToChartByProject } from '@shared/functions/chartsAdapter';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor(
    private http: HttpService,
  ) {
    const { id } = localStorage;
    this.http
      .getAll(`${RoutesEnum.HoursAPI}?user=${id}`).subscribe((res: any) => {
        const data = res.data.reverse()
        const { labels, datasets } = registerToChartByProject(res.data);
        this.setLabels(labels)
        this.setDatasets(datasets)
      })
  }

  labels$ = new BehaviorSubject<string[]>([])
  datasets$ = new BehaviorSubject<{ data: (number | null)[], label: string }[]>([])

  get labels() {
    return this.labels$.asObservable()
  }

  get datasets() {
    return this.datasets$.asObservable()
  }

  setLabels(labels: string[]) {
    this.labels$.next(labels)
  }

  setDatasets(datasets: { data: (number | null)[], label: string }[]) {
    this.datasets$.next(datasets)
  }

}
