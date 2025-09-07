import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient, private authService: AuthService) { }

  apiUrl : string = "http://localhost:8000";

  // getHeaders(): HttpHeaders {
  //   const authToken = this.authService.getToken();
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json');
  //   headers = headers.set('Authorization', `Bearer ${authToken}`);
  //   return headers;
  // }

  registerUser(details: any) : Observable<any> {
    return this.http.post(this.apiUrl + "/api/user/signup", details);
  }

  loginUser(details: any) : Observable<any>{
    return this.http.post(this.apiUrl + "/api/user/login", details);
  }


  getUser(userName: any) : Observable<any>{
    return this.http.get(this.apiUrl+"/api/get-user/"+userName);
  }

  getAllUsers() : Observable<any>{
    return this.http.get(this.apiUrl+"/api/get-all-users");
  }

  updateUser(userId: any, details: any) : Observable<any>{
    return this.http.put(`${this.apiUrl}/api/update-user/${userId}`,  details);
  }

  deleteUser(userId: any) : Observable<any>{
    return this.http.delete(`${this.apiUrl}/api/admin/delete-user/${userId}`);
  }

  addLocation(details: any) : Observable<any>{
    return this.http.post(`${this.apiUrl}/api/admin/add-location`, details);
  }

  getAllLocations() : Observable<any>{
    return this.http.get(`${this.apiUrl}/api/admin/locations`);
  }

  addHotel(details: FormData) : Observable<any>{
    return this.http.post(`${this.apiUrl}/api/admin/add-hotel`, details);
  }

  getAllHotels(page: number = 0, size: number = 3):Observable<any>{
    let params = new HttpParams().set('page', page).set( 'size', size);
    return this.http.get(`${this.apiUrl}/api/customer/hotels`, { params });
  }

  getHotelsByLocation(city: any): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/admin/view-hotels/${city}`);
  }

  getRoomsByHotel(hotelId: any): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/admin/hotels/${hotelId}/rooms`);
  }

  getHotelById(hotelId: any): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/admin/hotel/${hotelId}`);
  }

  postRoom(roomDetails: any, hotelId: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/api/admin/hotels/${hotelId}/add-room`, roomDetails);
  }

  filterHotels(searchStr: any, page:number = 0, size:number = 3): Observable<any>{
    let params = new HttpParams().set('value', searchStr)
                                  .set('page', page)
                                  .set('size', size);
    return this.http.get(`${this.apiUrl}/api/customer/search-hotels`, { params }); 
  }

  bookRoom(details: any) : Observable<any>{
    return this.http.post(`${this.apiUrl}/api/customer/add-reservation`, details);
  }

  getReservations(): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/admin/all-reservations`);
  }

  getRoomPrice(id: any): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/customer/room-price/${id}`);
  }

  confirmBooking(details: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/api/customer/confirm-reservation`, details);
  }

}
