import { Component } from '@angular/core';

@Component({
  selector: 'app-rm-table',
  standalone: true,
  imports: [],
  template: `
     <!--
    table 
-->
<div class="table-div">
      <div>
  <!--for demo wrap-->
  <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th>Cab</th>
          <th>pick-up</th>
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
        <tr>
          <td>AAC</td>
          <td>SUV CAB 1 </td>
          <td>$1.38</td>
          <td>+2.01</td>
          <td>-0.36%</td>
          <td><button><img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/write-circle-green-512.png" alt="" height="30px"></button></td>
          <td><button><img src="https://static.vecteezy.com/system/resources/previews/010/161/272/original/trash-can-recycle-bin-icon-free-png.png" alt="" height="30px"></button></td>
        </tr>
        <tr>
          <td>AAD</td>
          <td>AUSENCO</td>
          <td>$2.38</td>
          <td>-0.01</td>
          <td>-1.36%</td>
          <td><button><img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/write-circle-green-512.png" alt="" height="30px"></button></td>
          <td><button><img src="https://static.vecteezy.com/system/resources/previews/010/161/272/original/trash-can-recycle-bin-icon-free-png.png" alt="" height="30px"></button></td>
        </tr>
        <tr>
          <td>AAX</td>
          <td>ADELAIDE</td>
          <td>$3.22</td>
          <td>+0.01</td>
          <td>+1.36%</td>
          <td><button><img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/write-circle-green-512.png" alt="" height="30px"></button></td>
          <td><button><img src="https://static.vecteezy.com/system/resources/previews/010/161/272/original/trash-can-recycle-bin-icon-free-png.png" alt="" height="30px"></button></td>
        </tr>
        <tr>
          <td>XXD</td>
          <td>ADITYA BIRLA</td>
          <td>$1.02</td>
          <td>-1.01</td>
          <td>+2.36%</td>
          <td><button><img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/write-circle-green-512.png" alt="" height="30px"></button></td>
          <td><button><img src="https://static.vecteezy.com/system/resources/previews/010/161/272/original/trash-can-recycle-bin-icon-free-png.png" alt="" height="30px"></button></td>
        </tr>
        <tr>
          <td>AAC</td>
          <td>AUSTRALIAN COMPANY </td>
          <td>$1.38</td>
          <td>+2.01</td>
          <td>-0.36%</td>
          <td><button><img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/write-circle-green-512.png" alt="" height="30px"></button></td>
          <td><button><img src="https://static.vecteezy.com/system/resources/previews/010/161/272/original/trash-can-recycle-bin-icon-free-png.png" alt="" height="30px"></button></td>
        </tr>
        <tr>
          <td>AAD</td>
          <td>AUSENCO</td>
          <td>$2.38</td>
          <td>-0.01</td>
          <td>-1.36%</td>
        </tr>
        <tr>
          <td>AAX</td>
          <td>ADELAIDE</td>
          <td>$3.22</td>
          <td>+0.01</td>
          <td>+1.36%</td>
        </tr>
        <tr>
          <td>XXD</td>
          <td>ADITYA BIRLA</td>
          <td>$1.02</td>
          <td>-1.01</td>
          <td>+2.36%</td>
        </tr>
        <tr>
          <td>AAC</td>
          <td>AUSTRALIAN COMPANY </td>
          <td>$1.38</td>
          <td>+2.01</td>
          <td>-0.36%</td>
        </tr>
        <tr>
          <td>AAD</td>
          <td>AUSENCO</td>
          <td>$2.38</td>
          <td>-0.01</td>
          <td>-1.36%</td>
        </tr>
        <tr>
          <td>AAX</td>
          <td>ADELAIDE</td>
          <td>$3.22</td>
          <td>+0.01</td>
          <td>+1.36%</td>
        </tr>
        <tr>
          <td>XXD</td>
          <td>ADITYA BIRLA</td>
          <td>$1.02</td>
          <td>-1.01</td>
          <td>+2.36%</td>
        </tr>
        <tr>
          <td>AAC</td>
          <td>AUSTRALIAN COMPANY </td>
          <td>$1.38</td>
          <td>+2.01</td>
          <td>-0.36%</td>
        </tr>
        <tr>
          <td>AAD</td>
          <td>AUSENCO</td>
          <td>$2.38</td>
          <td>-0.01</td>
          <td>-1.36%</td>
        </tr>
        <tr>
          <td>AAX</td>
          <td>ADELAIDE</td>
          <td>$3.22</td>
          <td>+0.01</td>
          <td>+1.36%</td>
        </tr>
      </tbody>
    </table>
  </div>
      </div>


    </div>
  `,
  styleUrl: './rm-table.component.css'
})
export class RmTableComponent {

}


// and also can you give the function to show the data present in the CabCardDetailsList that are needed in the rm-table.component.ts dynamically and a function to edit that data and also a function to delete the data when clicked on the edit and delete icon respectively.