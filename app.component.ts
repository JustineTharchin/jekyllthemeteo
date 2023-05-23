import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  cityName!: string;
  WeatherData!: WeatherData;

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.getWeatherDataByCoordinates(latitude, longitude);
        },
        (error) => {
          console.log('Erreur de géolocalisation : ', error);
        }
      );
    } else {
      console.log('La géolocalisation n\'est pas prise en charge par ce navigateur.');
    }
  }

  getWeatherDataByCoordinates(latitude: number, longitude: number): void {
    this.weatherService.getWeatherDataByCoordinates(this.cityName, latitude, longitude).subscribe({
      next: (response) => {
        this.WeatherData = response;
        console.log(response);
      },
    });
  }

  onSubmit() {}
}
