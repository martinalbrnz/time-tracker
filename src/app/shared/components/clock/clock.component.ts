import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClockService } from '@services/clock/clock.service';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  constructor(
    private clockService: ClockService,
  ) { }

  time?: number
  seconds?: number
  minutes?: number
  hours?: number

  ngOnInit(): void {
    this.clockService.clock.subscribe(val => {
      this.time = val
      this.seconds = Math.floor((this.time / 1000))
      this.minutes = Math.floor((this.time / 60000)) - new Date(Date.now()).getTimezoneOffset()
      this.hours = Math.floor((this.time / 3600000)) - (new Date(Date.now()).getTimezoneOffset() / 60)
    })
  }

}
