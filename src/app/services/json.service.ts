import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(public http: HttpClient) {}

  public obtenerDatos() {
    return this.http.get('https://api.covid19api.com/summary');
  }
}
