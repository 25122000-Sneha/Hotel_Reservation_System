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

  currentPage = 0;
  pageSize = 1;
  totalElements = 0;

  searchVal: string = "";

  constructor(private httpService: HttpService, private router: Router){}

  ngOnInit(){
    //this.filteredHotelList$ = this.httpService.getAllHotels();
    this.loadAllHotels();
  }

  loadAllHotels(page: number=0){
    this.httpService.getAllHotels(page, this.pageSize)
    .subscribe({
      next: (data:any) => {
        this.filteredHotelList$ = of(data.content);
        this.totalElements = data.totalElements;
        this.currentPage = data.number;
      },
      error: (err: any) => {
        if(err.status === 400){
          this.noResults = true;
          this.errorMsg$ = of("No search results available");
        }
      }
    })
  }

  // filterHotels(searchTxt: any){
  //   console.log("clicked");
  //   this.filteredHotelList$ = this.httpService.filterHotels(searchTxt);
  //   this.filteredHotelList$.subscribe({
  //     next: (data: any) => {
  //       console.log("Hotels filtered successfully");
  //     },
  //     error: (err: any) => {
  //       if(err.status === 400){
  //         this.noResults = true;
  //         this.errorMsg$ = of("No search results available");
  //       }
  //     }
  //   })
  // }

  filterHotels(searchTxt: any){
    this.searchVal = searchTxt.trim();
    console.log("clicked");
    this.httpService.filterHotels(searchTxt, 0, this.pageSize)
    .subscribe({
      next: (data: any) => {
        console.log("Hotels filtered successfully");
        this.filteredHotelList$ = of(data.content);
        this.totalElements = data.totalElements;
        this.currentPage = data.number;
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

  totalPages(){
    return Math.ceil(this.totalElements/this.pageSize);
  }
  

  goToPage(page: number){
    if(page>=0 && page<=this.totalPages()){
        if(this.searchVal){
          this.httpService.filterHotels(this.searchVal)
        .subscribe({
          next: (data: any) => {
            this.filteredHotelList$ = of(data.content);
            this.totalElements = data.totalElements;
            this.currentPage = data.number;
          }
        })
        }
        else{
        this.loadAllHotels(page);
        }
      }
      
    }
    
  
}
