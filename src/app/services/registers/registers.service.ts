import { Injectable } from '@angular/core';
import { Register } from '@shared/models/Register.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistersService {
  private registers$ = new BehaviorSubject<Register[]>([])

  get registers() {
    return this.registers$.asObservable()
  }

  setRegisters(registers: Register[]) {
    this.registers$.next(registers)
  }
}
