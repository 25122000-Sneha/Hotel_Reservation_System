import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrl: './view-reservations.component.css'
})
export class ViewReservationsComponent {
  reservationList$ : Observable<any[]> = of([]);

  constructor(private httpService : HttpService){

  }

  ngOnInit(){
    this.getAllReservations();
  }

  getAllReservations(){
    this.reservationList$ = this.httpService.getReservations();
  }



}
