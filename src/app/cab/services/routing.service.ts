import { Injectable } from '@angular/core';
import { RouteRequest, RouteResponse } from '../Components/update/routing';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private apiUrl = '/ors/v2/directions/driving-car';
  private apiKey = '5b3ce3597851110001cf6248e3c2b93ce282428b80acb2538a7f51ab';

  constructor() {}

  async getRoute(start: [number, number], end: [number, number]): Promise<RouteResponse> {
    const requestBody = {
      coordinates: [start, end],
      instructions: true,
      geometry: true
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': this.apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching route:', error);
      throw error;
    }
  }
}