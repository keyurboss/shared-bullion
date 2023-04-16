import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { UserDataService } from '../services/rememberData.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'akshat-bull-app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  @ViewChild('first', { static: true }) first: ElementRef;
  constructor(public userData: UserDataService) { }

  nospace(event: any) {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  }
  formatPhone(event: KeyboardEvent) {
    const input = event.key;
    if (input === 'Backspace') {
      return;
    }
    if (typeof input !== 'undefined' && isNaN(+input)) {
      event.preventDefault();
    }
  }
  ngOnInit() {
    const inputs = document.querySelectorAll<HTMLInputElement>('#otp > *[id]');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Backspace') {
          inputs[i].value = '';
          if (i !== 0) inputs[i - 1].focus();
        } else {
          if (i === inputs.length - 1 && inputs[i].value !== '') {
            return true;
          } else if (
            (event.keyCode > 47 && event.keyCode < 58) ||
            (event.keyCode > 95 && event.keyCode < 106)
          ) {
            inputs[i].value = event.key;
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          } else if (event.keyCode > 64 && event.keyCode < 91) {
            inputs[i].value = String.fromCharCode(event.keyCode);
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          }
        }
        return false; // add a default return statement
      });
    }
    this.first.nativeElement.focus();
  }
}
