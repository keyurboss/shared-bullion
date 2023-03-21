import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor} from '@angular/common';
// interface bankdata{
//   tittle:string;
//   data:string;
// }
@Component({
  selector: 'akshat-bull-app-bank-details',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
})
export class BankdetailsComponent {
// data:bankdata[]=[
//   {
//     tittle:'Account Name',
//     data:'Akshat Bullion',
//   },
//   {
//     tittle:'Bank Name',
//     data:'Axis Bank',
//   },
//   {
//     tittle:'Account No',
//     data:'9200-2006-575-5340',
//   },
//   {
//     tittle:'IFSC Code',
//     data:'UTIB-000-4758',
//   },
//   {
//     tittle:'Branch Name',
//     data:'Balasinor',
//   },
// ];
}
