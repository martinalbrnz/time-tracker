import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

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
