import { Injectable } from '@angular/core';
import { CabCardDetails } from '../model/cabcard-details';
import { Booking } from '../model/booking';
import {v4 as uuidv4} from 'uuid';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CabService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  private url = 'http://localhost:3000/CabCardDetailsList';
  private url2 = 'http://localhost:3000';

  async getcabCardDetailsList(): Promise<CabCardDetails[]> {
    const data = await fetch(this.url);
    return await data.json();
  }

  async getcabCardDetails(rideType: string): Promise<CabCardDetails | undefined> {
    const allCabs = await this.getcabCardDetailsList();
    return allCabs.find(cabCardDetails => cabCardDetails.rideType === rideType);
  }
  async getCabDetailsById(id: string): Promise<CabCardDetails | undefined> {
    const response = await fetch(`${this.url}/${id}`);
    if (!response.ok) {
      console.error(`Error fetching cab details: ${response.statusText}`);
      return undefined;
    }
    return await response.json();
  }

  async bookCab(cabId: string, userDetails: { name: string; email: string }): Promise<void> {
    try {
      const cabDetails = await this.getCabDetailsById(cabId);
      if (!cabDetails) {
        throw new Error('Cab not found!');
      }
  
      const bookingId = uuidv4();
      const bookingData = {
        id: bookingId,
        cab: cabDetails, 
        user: userDetails,
        timestamp: Date.now() 
      };
  
      // Save booking data
      await fetch(`${this.url2}/Bookings`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });
  
      // Remove from available cabs
      await fetch(`${this.url2}/CabCardDetailsList/${cabId}`, {
        method: 'DELETE'
      });
  
      // Add to booked cabs
      cabDetails.Booked = true;
      cabDetails.available = false;
      await fetch(`${this.url2}/BookedCabList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });
  
      // Save user details
      await fetch(`${this.url2}/UserDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
      });
  
      // Store email in session storage
      sessionStorage.setItem('userEmail', userDetails.email);
      
      // Store booking IDs in local storage as an array
      const existingBookings: string[] = JSON.parse(localStorage.getItem('userBookings') || '[]');
      existingBookings.push(bookingId);

      localStorage.setItem('userBookings', JSON.stringify(existingBookings));
      
    } catch (error) {
      console.error('Error booking cab:', error);
      throw error;
    }
  }   
  
  async getBookedCabs(): Promise<CabCardDetails[]> {
    try {
      if (!isPlatformBrowser(this.platformId)) {
        console.log('Not in a browser environment');
        return [];
      }
  
      const userEmail = sessionStorage.getItem('userEmail');
      const userBookings: string[] = JSON.parse(localStorage.getItem('userBookings') || '[]');
  
      if (!userEmail || !userBookings.length) {
        console.log('No user email or bookings found in storage');
        return [];
      }
  
      const response = await fetch(`${this.url2}/BookedCabList`);
      if (!response.ok) {
        throw new Error('Failed to fetch booked cabs');
      }
  
      const bookedCabs: {
        id: string;
        cab: CabCardDetails;
        user: {
          name: string;
          email: string;
        };
        timestamp: number;
      }[] = await response.json();
  
      // Filter booked cabs based on user email and booking IDs
      const userCabs = bookedCabs.filter(booking => 
        booking.user.email === userEmail && 
        userBookings.includes(booking.id)
      );
  
      return userCabs.map(booking => ({
        ...booking.cab,
        Booked: true,
        available: false
      }));
  
    } catch (error) {
      console.error('Error fetching booked cabs:', error);
      throw error;
    }
  }

  async cancelBooking(cabId: string): Promise<void> {
    try {
      const userEmail = sessionStorage.getItem('userEmail');
      const userBookings: string[] = JSON.parse(localStorage.getItem('userBookings') || '[]');
  
      if (!userEmail || !userBookings.length) {
        throw new Error('No booking credentials found');
      }
  
      // Define the type for booked cab entries
      interface BookedCab {
        id: string;
        cab: CabCardDetails;
        user: {
          name: string;
          email: string;
        };
        timestamp: number;
      }
  
      // Find the booking in BookedCabList that matches the cab ID
      const bookedCabsResponse = await fetch(`${this.url2}/BookedCabList`);
      const bookedCabs: BookedCab[] = await bookedCabsResponse.json();
      const booking = bookedCabs.find((b: BookedCab) => 
        b.cab.id === cabId && 
        b.user.email === userEmail && 
        userBookings.includes(b.id)
      );
  
      if (!booking) {
        throw new Error('Booking not found');
      }
  
      // Remove from BookedCabList
      await fetch(`${this.url2}/BookedCabList/${booking.id}`, {
        method: 'DELETE'
      });
  
      // Update status in Bookings
      const bookingResponse = await fetch(`${this.url2}/Bookings/${booking.id}`);
      if (bookingResponse.ok) {
        const bookingRecord = await bookingResponse.json();
        bookingRecord.cab.Cancelled = true;
        await fetch(`${this.url2}/Bookings/${booking.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingRecord)
        });
      }
  
      // Add cab back to available list
      const cabDetails = booking.cab;
      cabDetails.Booked = false;
      cabDetails.available = true;
      cabDetails.Cancelled = true;
      
      await fetch(`${this.url2}/CabCardDetailsList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cabDetails)
      });
  
      // Update booking IDs in localStorage
      const updatedBookings = userBookings.filter((bookingId: string) => bookingId !== booking.id);
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
  
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
}
  // finding the cabs for history according to useremail
  async getBookingsByUserEmail(email: string): Promise<Booking[]> { 
    const response = await fetch(`${this.url2}/Bookings`);
    const bookings: Booking[] = await response.json(); // Specify the type here
    return bookings.filter(booking => booking.user.email === email);
  }

  async getPickupLocations(): Promise<string[]> {
    const response = await fetch(`${this.url2}/pickupLocations`);
    const data = await response.json();
    return data.map((location: any) => Object.values(location)[0]); // Extract location names
  }

  async getDropoffLocations(): Promise<string[]> {
    const response = await fetch(`${this.url2}/dropoffLocations`);
    const data = await response.json();
    return data.map((location: any) => Object.values(location)[0]); // Extract location names
  }
  async deleteCab(cabId: string): Promise<void> {
    try {
      const response = await fetch(`${this.url}/${cabId}`, {
        method: 'DELETE'
      });
      if(!response.ok) {
        throw new Error(`Failed to delete cab with ID: ${cabId}`);
      }
    } catch(error) {
        console.error('Error deleting cab', error);
        throw error
    }
  }

  async updateCab(cabId: string, cabData: CabCardDetails): Promise<void> {
    try {
      const response = await fetch(`${this.url}/${cabId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cabData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update cab with ID: ${cabId}`);
      }
    } catch (error) {
      console.error('Error updating cab', error);
        throw error
    }
  }
}
