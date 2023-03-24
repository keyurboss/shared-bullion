import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'akshat-bull-app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  name = new FormControl('');
  profileForm = new FormGroup({
    tName: new FormControl(''),
    firmtName: new FormControl(''),
  });
}

















//  implements OnInit {
//   reactiveForm: FormGroup;  
//   ngOnInit(){
//       this.reactiveForm=new FormGroup({
//           userid: new FormControl(null),
//           password: new FormControl(null),
//       });
//     }
//   }