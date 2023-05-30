import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'shiv-bull-app-update',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent {
  data =[
    {
      tittle:'RATE UPDATES',
      details:'RATE UPDATES',
      date:'07/02/2023 ',
      time:'12:03'
    },
    {
      tittle:'ONLINE TRADING      ',
      date:'28/11/2022       ',

      details:'PLEASE CALL ON THIS NUMBER FOR OPEN ONLINE TRADING ACCOUNT -8866524872      ',
      time:'11:17'
    },
    {
      tittle:'ONLINE TRADING STARTED      ',
      date:'03/11/2022       ',

      details:'ONLINE TRADING STARTED      ',
      time:'11:44'
    },
    {
      tittle:'OUR OFFICE IS NOW CLOSED      ',
      date:'01/09/2022       ',

      details:'PLEASE CALL TOMORROW      ',
      time:'20:22'
    },
    {
      tittle:'PLEASE NOTE THAT,      ',
      date:'22/08/2022      ',

      details:'ALL ORDERS ARE TRADE+2 DAYS DELIVERY , THEN LATE FEE IS 15 RS. PER KG ,PER DAY WILL BE CHARGED ON ALL PENDING ORDERS      ',
      time:' 18:38'
    },
    {
      tittle:'PLEASE NOTE THAT,      ',
      date:'22/08/2022       ',

      details:'ALL ORDERS ARE TRADE+2 DAYS DELIVERY , THEN LATE FEE IS 15 RS. PER KG ,PER DAY WILL BE CHARGED ON ALL PENDING ORDERS      ',
      time:'18:38'
    },
    {
      tittle:'PLEASE NOTE THAT,      ',
      date:'22/08/2022       ',

      details:'ALL ORDERS ARE TRADE+2 DAYS DELIVERY , THEN LATE FEE IS 15 RS. PER KG ,PER DAY WILL BE CHARGED ON ALL PENDING ORDERS      ',
      time:'18:35'
    },
    {
      tittle:'PLEASE NOTE THAT,      ',
      date:'17/08/2022       ',

      details:'OUR OFFICE WILL REMAIN CLOSE FROM 18/08 TO 21/08 DUE TO JANMASHTMI HOLIDAYS. OFFICE WILL RESUME FROM 22/08 ( MONDAY )      ',
      time:'17:05'
    },
    {
      tittle:'Wlcome',
      date:'18/07/2022       ',

      details:'Welcome To Shiv Bullion      ',
      time:'04:09'
    },
      ]
}
