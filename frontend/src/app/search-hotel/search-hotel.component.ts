import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrl: './search-hotel.component.css'
})
export class SearchHotelComponent {

  filteredHotelList$ : Observable<any[]> = of([]);
  errorMsg$: Observable<String> = of("");
  noResults: boolean = false;

  constructor(private httpService: HttpService, private router: Router){}

  filterHotels(searchTxt: any){
    console.log("clicked");
    this.filteredHotelList$ = this.httpService.filterHotels(searchTxt);
    this.filteredHotelList$.subscribe({
      next: (data: any) => {
        console.log("Hotels filtered successfully");
      },
      error: (err: any) => {
        if(err.status === 400){
          this.noResults = true;
          this.errorMsg$ = of("No search results available");
        }
      }
    })
  }

  viewRooms(id: any){
    this.router.navigateByUrl(`hotels/${id}/rooms`);
  }
}
