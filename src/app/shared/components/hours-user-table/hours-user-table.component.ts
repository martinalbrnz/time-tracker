import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { RoutesEnum } from '@constants/routes';
import { HttpService } from '@services/http/http.service';
import { RegistersService } from '@services/registers/registers.service';
import { Register } from '@shared/models/Register.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hours-user-table',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './hours-user-table.component.html',
  styleUrls: ['./hours-user-table.component.scss']
})
export class HoursUserTableComponent implements OnInit {
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private registersService: RegistersService,
  ) { }

  registers$?: Observable<Register[]>

  ngOnInit(): void {
    this.registers$ = this.registersService.registers

    this.route.queryParams.subscribe(params => {
      const { id } = localStorage
      this.http.getAll(`${RoutesEnum.HoursAPI}?user=${id}`, params).subscribe(resp => {
        this.registersService.setRegisters(resp.data)
      })
    })
  }

  handleEdit(reg: Register) {
    console.log(reg._id)
  }
}
