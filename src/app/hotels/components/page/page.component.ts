import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HotelSearchService } from '../../services/hotel-search.service'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { RatingComponent } from '../rating/rating.component';
import { Router, NavigationEnd  } from '@angular/router';
import { HotelIdService } from '../../services/hotel-id.service';
import { Hotel } from '../../models/interfaces'; 

@Component({
  standalone: true,
  imports: [CommonModule, RatingComponent, RouterModule],
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  hotelDetails: Hotel | null = null;
  similarHotels: Hotel[] = []; // Array to store similar hotels
  allHotels: Hotel[] = []; // Array to store all hotels available (to be fetched from the service)
  hotelId: string | null = null;
  currentIndex = 0; // Track the current image index
  transformStyle = 'translateX(0%)'; // Used to move the carousel left/right
  transitionStyle = 'transform 0.5s ease-in-out'; // Smooth transition
  currentPage: number = 1;
  imagesPerPage: number = 4;
  rotatingImages: string[] = [];
  rotationInterval: any;
  error: string | null = null;
  safeMapUrl: SafeResourceUrl | null = null; // Safe URL for the iframe

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelSearchService,
    private hotelIdService: HotelIdService,
    private sanitizer: DomSanitizer, // Add DomSanitizer
    @Inject(PLATFORM_ID) private platformId: Object, // Detect SSR/browser
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);

      // Subscribe to router events to handle scrolling when route changes
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // This ensures the page scrolls to the top on navigation end
          window.scrollTo(0, 0);
          // Smoothly scroll to the #hotel-room-section if it exists
          const element = document.getElementById('hotel-room-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });

      this.route.queryParams.subscribe((params) => {
        const hotelId = params['id'];
        console.log('Hotel ID of page:', hotelId);
        if (hotelId) {
          this.hotelId = hotelId; 
          this.initializeHotelData(hotelId);
        } else {
          // Start a loop to keep checking until a valid hotelId is found
          const interval = setInterval(() => {
          this.hotelId = this.hotelIdService.getHotelId();
          console.log('Checking for Hotel ID from service:', this.hotelId);

          if (this.hotelId) {
            clearInterval(interval); // Stop the loop when hotelId is found
            this.initializeHotelData(this.hotelId);
          }
        }, 500); // Check every 500ms
        }
      });
    } else {
      console.warn('SSR environment: Skipping browser-specific logic.');
    }
  }

  private initializeHotelData(hotelId: string): void {
    this.fetchHotelDetails(hotelId);
    this.getAllHotels(); // Fetch all hotels for comparison
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
  }

  goBack(): void {
    this.location.back();
  }

  viewHotelDetails(hotel: any): void {
    const hotelId = hotel.id;  // Get the hotel ID
    console.log('Hotel ID:', hotelId);  // Log the hotel ID (optional)
    this.router.navigate(['/page'], { queryParams: { id: hotelId } });  // Navigate with queryParams
  }

  // Fetch all hotels (or a list of hotels to compare)
  getAllHotels(): void {
    this.hotelService.getHotels().subscribe((hotels: Hotel[]) => {
      this.allHotels = hotels;
      this.filterSimilarHotels(); // Filter hotels based on similar amenities
    });
  }

  private fetchHotelDetails(hotelId: string): void {
    this.hotelService.getHotelDetails(hotelId).subscribe(
      (data) => {
        this.hotelDetails = data; // Use the API response
        this.updateMapUrl(); // Update map URL after fetching details
        this.initializeRotatingImages();
      },
      (err) => {
        this.error = 'Error fetching hotel data from the backend.';
      }
    );
    if (!this.hotelDetails) {
      this.error = 'Hotel not found.';
    }
  }

// Filter hotels based on exactly matching amenities (all amenities must match) and exclude the current hotel
filterSimilarHotels(): void {
  if (this.hotelDetails && this.allHotels) {
    // Get the list of available amenities for the current hotel (only if hotelDetails is not null)
    const currentHotelAmenities = this.hotelDetails.amenities?.filter(amenity => amenity.available) || [];

    this.similarHotels = this.allHotels.filter(hotel => {
      // Ensure the hotel is not the same as the current hotel
      if (hotel.id === this.hotelId) {
        return false; // Exclude the current hotel
      }

      // Check if all amenities of the current hotel are available in the other hotel
      const allMatch = currentHotelAmenities.every(currentAmenity => 
        hotel.amenities?.some(hotelAmenity => 
          hotelAmenity.id === currentAmenity.id && hotelAmenity.available === currentAmenity.available
        )
      );

      return allMatch; // Only include hotels where all amenities match
    });
  }
}


  private updateMapUrl(): void {
    if (this.hotelDetails?.location) {
      const mapUrl = `${this.hotelDetails.location}`;
      this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl); // Use sanitizer
    }
  }

  private initializeRotatingImages(): void {
    if (this.hotelDetails?.images) {
      // Clone the images array for rotation
      this.rotatingImages = [...this.hotelDetails.images];
  
      // Clear any existing interval to prevent multiple intervals running
      if (this.rotationInterval) {
        clearInterval(this.rotationInterval);
      }
  
      // Set up interval for rotating images
      this.rotationInterval = setInterval(() => {
        const firstImage = this.rotatingImages.shift();
        if (firstImage) {
          this.rotatingImages.push(firstImage);
        }
      }, 4000); // Rotate every 4 second
    }
  }  

  // Calculate total pages based on images available
  get totalPages(): number {
    if (!this.hotelDetails) return 0;
    return Math.ceil((this.hotelDetails.images.length - 1) / this.imagesPerPage);
  }

  // Get images to display on the current page (except the first image)
  getImagesForPage(): string[] {
    if (!this.hotelDetails) return [];
    const startIndex = (this.currentPage - 1) * this.imagesPerPage + 1;
    const endIndex = Math.min(startIndex + this.imagesPerPage, this.hotelDetails.images.length);
    return this.hotelDetails.images.slice(startIndex, endIndex);
  }

  // Navigate to the previous page of images
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Navigate to the next page of images
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  nextImage() {
    // Prepare the next index
    const nextIndex = this.currentIndex + 1 < this.rotatingImages.length ? this.currentIndex + 1 : 0;
    this.updateTransform(nextIndex);
    this.currentIndex = nextIndex; // Update currentIndex after transition starts
  }

  prevImage() {
    // Prepare the previous index
    const prevIndex = this.currentIndex - 1 >= 0 ? this.currentIndex - 1 : this.rotatingImages.length - 1;
    this.updateTransform(prevIndex);
    this.currentIndex = prevIndex; // Update currentIndex after transition starts
  }

  private updateTransform(nextIndex: number) {
    this.transitionStyle = 'transform 0.5s ease-in-out'; // Ensures smooth transition
    // Move the images based on the index (using percentage for the width of each image)
    this.transformStyle = `translateX(-${nextIndex * 100}%)`; // Shift images horizontally
  }

  // goToPage(hotel: any) : void{
  //   const hotelId = hotel.id;  // Get the hotel ID
  //   console.log('Hotel ID:', hotelId);
  //   this.router.navigate(['/page/hotel-room'], { queryParams: { hotelId: hotelId, roomId: roomId } }); 
  // }

}
