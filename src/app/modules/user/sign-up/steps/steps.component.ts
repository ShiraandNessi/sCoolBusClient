import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api'; 
@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  constructor() { }

  items!: MenuItem[];

    ngOnInit() {
      this.items = [{
        label: 'Personal',
        routerLink: 'personal'
    },
    {
        label: 'Seat',
        routerLink: 'seat'
    },
    {
        label: 'Payment',
        routerLink: 'payment'
    },
    {
        label: 'Confirmation',
        routerLink: 'confirmation'
    }
];
    }

}
