import { Component } from '@angular/core';
import { Weather } from '../weather-list/weather-list.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  weather: Weather = new Weather();

  constructor() {}

  ngOnInit() {

  }

  loadWeather() {
    
  }

  onDelete() {
    
  }

}
