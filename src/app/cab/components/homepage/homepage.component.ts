import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink],
  //"https://m.media-amazon.com/images/I/71cR+sc93tL.jpg"
  template: `
#improve the ui. Ai!
<body class="tw-bg-gray-100">
    <!-- Hero Section -->
    <div class="tw-container tw-mx-auto tw-px-4">
        <div class="tw-relative tw-w-full">
            <img src="https://m.media-amazon.com/images/I/71cR+sc93tL.jpg" 
                 alt="Norway" 
                 class="tw-w-full tw-h-[600px] tw-object-cover">
            
            <div class="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                <div class="tw-text-center tw-p-8">
                    <div class="tw-space-y-4">
                        <div class="tw-w-full"></div>
                        <div class="tw-w-full"></div>
                        <div>
                            <h1 class="tw-text-5xl tw-font-bold tw-text-white tw-shadow-md">
                                World Around 24/7
                            </h1>
                            <h1 class="tw-text-5xl tw-font-bold tw-text-white tw-shadow-md">
                                CAB service
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="tw-nav tw-bg-gray-900 tw-px-6 tw-py-6 tw-rounded-lg tw-shadow-xl">
            <ul class="tw-space-y-4 tw-flex tw-justify-center">
                <li class="tw-group">
                    <a routerLink="/" routerLinkActive="active" class="tw-block tw-px-6 tw-py-3 tw-text-white tw-hover:text-gray-400 tw-transition-all duration-300 hover:tw-bg-gray-800 rounded-full">
                        Home
                    </a>
                </li>
                <li class="tw-group">
                    <a routerLink="/search" routerLinkActive="active" class="tw-block tw-px-6 tw-py-3 tw-text-white tw-hover:text-gray-400 tw-transition-all duration-300 hover:tw-bg-gray-800 rounded-full">
                        Search And Book
                    </a>
                </li>
                <li class="tw-group">
                    <a routerLink="/history" routerLinkActive="active" class="tw-block tw-px-6 tw-py-3 tw-text-white tw-hover:text-gray-400 tw-transition-all duration-300 hover:tw-bg-gray-800 rounded-full">
                        History
                    </a>
                </li>
                <li class="tw-group">
                    <a routerLink="/cancellation" routerLinkActive="active" class="tw-block tw-px-6 tw-py-3 tw-text-white tw-hover:text-gray-400 tw-transition-all duration-300 hover:tw-bg-gray-800 rounded-full">
                        Cancel
                    </a>
                </li>
                <li class="tw-group">
                    <a routerLink="/updates" routerLinkActive="active" class="tw-block tw-px-6 tw-py-3 tw-text-white tw-hover:text-gray-400 tw-transition-all duration-300 hover:tw-bg-gray-800 rounded-full">
                        Update
                    </a>
                </li>
                <li class="tw-group">
                    <a routerLink="/admin" routerLinkActive="active" class="tw-block tw-px-6 tw-py-3 tw-text-white tw-hover:text-gray-400 tw-transition-all duration-300 hover:tw-bg-gray-800 rounded-full">
                        Admin
                    </a>
                </li>
            </ul>
        </nav>

        <!-- Features Section -->
        <div class="tw-container tw-mx-auto tw-px-4 tw-py-12">
            <p class="tw-text-4xl tw-font-bold tw-text-center tw-mb-12 tw-text-gray-800">
                Here are the features<br>
                we’re proud of
            </p>

            <div class="tw-grid tw-grid-cols-1 tw-md:grid-cols-2 tw-lg:grid-cols-4 tw-gap-8">
                <div class="tw-card tw-bg-green-500 tw-p-8 tw-rounded-xl tw-shadow-2xl transform transition-all duration-300 hover:scale-105">
                    <h3 class="tw-text-2xl tw-font-bold tw-text-white tw-mb-4">Advanced Booking</h3>
                    <p class="tw-text-lg tw-text-white tw-text-sm">Riders can wish to opt for a scheduled ride for planned trip instead of booking on the spot.</p>
                </div>

                <div class="tw-card tw-bg-white tw-p-8 tw-rounded-xl tw-shadow-2xl transform transition-all duration-300 hover:scale-105">
                    <h3 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-4">Verified Drivers</h3>
                    <p class="tw-text-lg tw-text-gray-600 tw-text-sm">Provides verified and professional drivers who are trained and examined before being sent to customers.</p>
                </div>

                <div class="tw-card tw-bg-yellow-400 tw-p-8 tw-rounded-xl tw-shadow-2xl transform transition-all duration-300 hover:scale-105">
                    <h3 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-4">Ride History</h3>
                    <p class="tw-text-lg tw-text-gray-600 tw-text-sm">A feature that allows riders to view details of all their completed and canceled rides.</p>
                </div>

                <div class="tw-card tw-bg-blue-500 tw-p-8 tw-rounded-xl tw-shadow-2xl transform transition-all duration-300 hover:scale-105">
                    <h3 class="tw-text-2xl tw-font-bold tw-text-white tw-mb-4">Easy cancellation</h3>
                    <p class="tw-text-lg tw-text-white tw-text-sm">Refunds the full advance deposit if the booking is canceled more than 24 hours before the pickup time.</p>
                </div>
            </div>

            <!-- Reviews Section -->
            <div class="tw-container tw-mx-auto tw-px-4 tw-py-12">
                <p class="tw-text-4xl tw-font-bold tw-text-center tw-mb-12 tw-text-gray-800">
                    Here are the reviews<br>of customers
                </p>

                <div class="tw-grid tw-grid-cols-1 tw-md:grid-cols-2 tw-lg:grid-cols-3 tw-gap-8">
                    <div class="tw-card tw-bg-white tw-p-8 tw-rounded-xl tw-shadow-2xl transform transition-all duration-300 hover:scale-105">
                        <div class="tw-flex tw-items-center tw-space-x-4">
                            <img src="https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-daniel.jpg" 
                                 alt="" 
                                 class="tw-w-20 tw-h-20 tw-rounded-full tw-border-4 tw-border-white">
                            <div>
                                <p class="tw-text-xl tw-font-bold">Daniel Clifford</p>
                                <p class="tw-text-gray-600">Verified Graduate</p>
                            </div>
                        </div>
                        <div class="tw-mt-6">
                            <h4 class="tw-text-xl tw-font-bold">It was an Excellent Service</h4>
                            <p class="tw-text-gray-600 tw-text-sm tw-mt-3">
                                "The driver went above and beyond to ensure a positive and enjoyable experience, exceeding typical expectations of a cab ride."
                            </p>
                        </div>
                    </div>
                    <!-- Repeat for other review cards -->
                </div>
            </div>
        </div>
    </div>
</body>

  `,
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
//images : https://img.freepik.com/free-photo/taxi-sign-car-night_181624-14020.jpg?t=st=1735995278~exp=1735998878~hmac=359b7968548aeda70653051f4116bdee3a7f2b7404fc9348673c6a685d9d4505&w=900
//https://img.freepik.com/free-photo/blurred-street-scene-city_1359-237.jpg?t=st=1735995359~exp=1735998959~hmac=ddb99ad7b843ad27551a57371cb658618e16c779db0918e16a25ffa961704891&w=900
//https://img.freepik.com/free-photo/taxi-sign-night_181624-25843.jpg?t=st=1735995505~exp=1735999105~hmac=3e4e82e4fdb27146b7a3c10a2943fb53e8f90993c45378d6b67231d237e4b409&w=900
//https://img.freepik.com/free-photo/blurred-city-street_23-2147786060.jpg?t=st=1735995557~exp=1735999157~hmac=103aaafcddc2ee71c7050c50367bc17afa79eccc6f44ed1c8ce4e98534dbc063&w=900
//https://img.freepik.com/free-photo/car-traffic-night-streets_23-2148055611.jpg?t=st=1735995670~exp=1735999270~hmac=271239887752aa2dd04e4ca0473c469ad7b4f1215ab4a0292d66f976e3f8423a&w=900
//https://img.freepik.com/free-photo/car-mirror-showing-blurred-city-traffic-evening_157027-4038.jpg?t=st=1735995768~exp=1735999368~hmac=b5eaff817ce52746135af4256556e8194783485c23efa124bc58445579d417e1&w=1060
