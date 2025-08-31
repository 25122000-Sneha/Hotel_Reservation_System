import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrl: './view-rooms.component.css'
})
export class ViewRoomsComponent {
  hotelId: any;
  roomList$: Observable<any[]> = of([]);
  hotel : any;
  roleName : any;

  constructor(private route: ActivatedRoute, private httpService: HttpService, private authService: AuthService, private router: Router){
  }

  ngOnInit(){
    this.roleName = this.authService.getRole;
    //getting hotelId from url
    this.hotelId = this.route.snapshot.paramMap.get('hotelId');
    
    this.httpService.getHotelById(this.hotelId).subscribe((data: any) => {
      this.hotel = data;
    })
    console.log(this.hotelId);
    this.displayRooms(this.hotelId);
  }

  getHotelById(hotelId: any){
    this.hotel = this.httpService.getHotelById(hotelId);
  }

  displayRooms(hotelId: any): any{
    this.roomList$ = this.httpService.getRoomsByHotel(hotelId);
  }

  bookNow(id: any): void{
    this.router.navigateByUrl(`/rooms/${id}/book-room`);
  }
}
