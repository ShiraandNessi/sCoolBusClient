import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private _acr: ActivatedRoute) { }
  email!: string | null
  pass!: string | null
  ngOnInit(): void {
    this.email= this._acr.snapshot.paramMap.get('newEmail');
    this.pass= this._acr.snapshot.paramMap.get('newPass');
 }
 


}
