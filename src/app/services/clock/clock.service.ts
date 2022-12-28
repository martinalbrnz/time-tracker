import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  public clock$: Observable<number> = timer(0, 1000).pipe(
    map(tick => Date.now()),
    shareReplay(1)
  );

  get clock(): Observable<number> {
    return this.clock$;
  }
}
