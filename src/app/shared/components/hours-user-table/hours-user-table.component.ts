import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RoutesEnum } from '@constants/routes';
import { HttpService } from '@services/http/http.service';
import { RegistersService } from '@services/registers/registers.service';
import { Register } from '@shared/models/Register.model';
import { map, Observable } from 'rxjs';

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
    private registersService: RegistersService,
  ) { }

  registers$?: Observable<Register[]>

  ngOnInit(): void {
    this.registers$ = this.registersService.registers
      .pipe(
        map(reg => reg.sort((prev, curr) => new Date(curr.init_date).getTime() - new Date(prev.init_date).getTime()))
      )

    const { id } = localStorage
    this.http.getAll(`${RoutesEnum.HoursAPI}?user=${id}`).subscribe({
      next: (resp: Register[]) => {
        this.registersService.setRegisters(resp)
      },
      error: () => {
        // implement a snackbar or something
      }
    })
  }

  handleEdit(reg: Register) {
    console.log(reg._id)
  }
}
