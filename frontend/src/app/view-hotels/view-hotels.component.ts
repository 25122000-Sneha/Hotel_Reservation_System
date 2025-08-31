import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-hotels',
  templateUrl: './view-hotels.component.html',
  styleUrl: './view-hotels.component.css'
})
export class ViewHotelsComponent {

  locationList$ : Observable<any[]> = of([]);
  selectedCity : string = "";
  hotelList$ : Observable<any[]> = of([]);
  defaultCity : string = "";
  locations: any[] = [];

  constructor(private httpService: HttpService, private formBuilder: FormBuilder, private router: Router){
    
  }

  ngOnInit(){
    this.getAllLocations();
  }

  getAllLocations(){
    this.locationList$ = this.httpService.getAllLocations();
    this.locationList$.subscribe((data: any)=>{
      this.locations = data;
      //to display first city hotels by default
      this.defaultCity = this.locations[0].city;
      this.onCitySelect(this.defaultCity);
    });
    
    //console.log(this.locations);
    
  }

  onCitySelect(city: any){
    this.selectedCity = city;
    console.log(this.selectedCity);
    this.displayHotelsByCity(this.selectedCity);
    
  }

  displayHotelsByCity(city: any){
    this.hotelList$ = this.httpService.getHotelsByLocation(city);
    console.log(this.hotelList$);
    
  }

  viewRooms(id: any){
    this.router.navigateByUrl(`hotels/${id}/rooms`);
  }
  
}
