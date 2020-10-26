import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Position } from './position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>('https://calm-temple-53110.herokuapp.com/positions')
  }

  // Assignment 6 code

  savePosition(position: Position) {
    return this.http.put<any>("https://calm-temple-53110.herokuapp.com/position/" + position._id, position);
  }

  getPosition(id){
    return this.http.get<Position[]>("https://calm-temple-53110.herokuapp.com/position/" + id);
  }
}
