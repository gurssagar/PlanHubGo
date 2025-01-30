import { Component, OnInit } from '@angular/core';
import { CabService } from '../../../services/cab.service';
import { CabCardDetails } from '../../../model/cabcard-details';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rm-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="table-div">
      <div>
        <div class="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>Cab</th>
                <th>Pick-up</th>
                <th>Drop-off</th>
                <th>Charges</th>
                <th>Timing</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr *ngFor="let cab of cabs">
                <td>{{ cab.rideType }}</td>
                <td>{{ cab.pickupLocation }}</td>
                <td>{{ cab.dropoffLocation }}</td>
                <td>{{ cab.price }}</td>
                <td>{{ cab.time }}</td>
                <td>
                  <button (click)="openEditModal(cab)">
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/write-circle-green-512.png"
                      alt=""
                      height="30px"
                    />
                  </button>
                </td>
                <td>
                  <button (click)="deleteCab(cab.id)">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/010/161/272/original/trash-can-recycle-bin-icon-free-png.png"
                      alt=""
                      height="30px"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div *ngIf="isEditModalOpen" class="modal">
        <div class="modal-content">
            <span class="close" (click)="closeEditModal()">&times;</span>
            <h2>Edit Cab Details</h2>
              <form (ngSubmit)="saveCabDetails()">
                  <div class="form-group">
                      <label for="rideType">Ride Type:</label>
                      <input type="text" id="rideType" name="rideType" [(ngModel)]="editedCab.rideType" required>
                  </div>
                  <div class="form-group">
                      <label for="pickupLocation">Pickup Location:</label>
                      <input type="text" id="pickupLocation" name="pickupLocation" [(ngModel)]="editedCab.pickupLocation" required>
                  </div>
                  <div class="form-group">
                      <label for="dropoffLocation">Dropoff Location:</label>
                      <input type="text" id="dropoffLocation" name="dropoffLocation" [(ngModel)]="editedCab.dropoffLocation" required>
                  </div>
                  <div class="form-group">
                      <label for="price">Price:</label>
                      <input type="number" id="price" name="price" [(ngModel)]="editedCab.price" required>
                  </div>
                    <div class="form-group">
                      <label for="time">Time:</label>
                      <input type="text" id="time" name="time" [(ngModel)]="editedCab.time" required>
                    </div>
                  <button type="submit" class="save-btn">Save</button>
              </form>
        </div>
    </div>
  `,
  styleUrl: './rm-table.component.css',
})
export class RmTableComponent implements OnInit {
  cabs: CabCardDetails[] = [];
  isEditModalOpen = false;
  editedCab: CabCardDetails = {} as CabCardDetails;

  constructor(private cabService: CabService) {}

  ngOnInit(): void {
    this.loadCabData();
  }

  loadCabData() {
    this.cabService
      .getcabCardDetailsList()
      .then((cabs) => (this.cabs = cabs))
      .catch((error) => console.error('Error fetching cabs:', error));
  }
    openEditModal(cab: CabCardDetails) {
      this.editedCab = { ...cab }; // Create a copy to avoid modifying the original cab directly
      this.isEditModalOpen = true;
    }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  saveCabDetails() {
      this.cabService.updateCab(this.editedCab.id, this.editedCab)
          .then(() => {
              console.log('Cab details updated successfully');
              this.closeEditModal();
              this.loadCabData();
          })
          .catch(error => console.error('Error updating cab', error));
    }


  deleteCab(cabId: string) {
    if (confirm('Are you sure you want to delete this cab?')) {
      this.cabService
        .deleteCab(cabId)
        .then(() => {
          console.log(`Cab with ID: ${cabId} deleted successfully`);
          this.loadCabData();
        })
        .catch((error) => {
          console.error(`Error deleting cab with ID: ${cabId}`, error);
        });
    }
  }
}
