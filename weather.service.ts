import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}
  getWeatherDataByCoordinates(cityName: string, latitude: number, longitude: number): Observable<WeatherData> {
    const url = environment.WeatherApiBaseUrl + cityName;
  
    return this.http.get<WeatherData>(url, {
      headers: new HttpHeaders()
        .set(
          environment.XRapidAPIHostHeaderName,
          environment.XRapidAPIHostHeaderValue
        )
        .set(
          environment.XRapidAPIKeyHeaderName,
          environment.XRapidAPIKeyHeaderValue
        ),
      params: new HttpParams()
      .set('q', `${latitude},${longitude}`)
        .set('units', 'metric')
        .set('mode', 'json'),
    });
  }
}
