import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment.development';
import {ApiService} from '../../../services/api.service';
import {MessageService} from 'primeng/api';
import {Location} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-outstanding-bills',
  imports: [RouterLink],
  templateUrl: './outstanding-bills.component.html',
  styleUrl: './outstanding-bills.component.css'
})
export class OutstandingBillsComponent implements OnInit{


  APP_CURRENCY: string = environment.APP_CURRENCY;
  isFormSubmitted: boolean = false;
  lgaList: any [] = [];
  billList: any [] = [];
  errorBag: any[] = [];
  billingYear:number = new Date().getFullYear();
  constructor(private apiService: ApiService, private messageService: MessageService, private location: Location) {}



  ngOnInit() {

    this.loadOutstandingBills();
  }

  private loadOutstandingBills() {
    this.apiService.get(`billing/outstanding-bills`).subscribe((result:any)=>{
      this.billList = result.data;
      //console.log(this.billList)
    },error => {
      this.errorBag = error.message
      //console.log(this.errorBag)
      // alert("Whoops! Something went wrong.")
    })

  }

  goBack(): void {
    this.location.back();
  }
}
