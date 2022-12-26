import { Component, OnInit } from '@angular/core';
import { RoutesEnum } from '@constants/routes';
import { HttpService } from '@services/http/http.service';
import { RegistersService } from '@services/registers/registers.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpService,
    private registersService: RegistersService,
  ) { }
  title = 'time-tracker';

  ngOnInit() {
    const { id } = localStorage
    this.http.getAll(`${RoutesEnum.HoursAPI}?user=${id}`).subscribe((res: any) => {
      this.registersService.setRegisters(res)
    })
  }
}
