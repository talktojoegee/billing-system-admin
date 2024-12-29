import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment.development';
import {ApiService} from '../../../services/api.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule, Location} from '@angular/common';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-bill-processing',
  imports: [ReactiveFormsModule, CommonModule, ToastModule,RouterLink],
  templateUrl: './bill-processing.component.html',
  styleUrl: './bill-processing.component.css',
  providers: [MessageService]
})
export class BillProcessingComponent implements OnInit{

  APP_CURRENCY: string = environment.APP_CURRENCY;
  isFormSubmitted: boolean = false;
  lgaList: any [] = [];
  billList: any [] = [];
  errorBag: any[] = [];

  lgaName:string = '';
  noOfBuildings:number = 0;
  noOfBills:number = 0;
  billAmount:number = 0;
  billId:number = 0;
  isRetrieved:boolean = false;
  isProcessed:boolean = false;

  billingYear:number = new Date().getFullYear();
  constructor(private apiService: ApiService,
              private messageService: MessageService,
              private location: Location
  ) {}

  billingForm: FormGroup = new FormGroup({
    lgaId: new FormControl("", [Validators.required]),
    year: new FormControl("", [Validators.required]),
    billedBy: new FormControl(1),
  });
  formValue: any;
  private validationErrors: any;

  ngOnInit() {

    this.loadLGAs();
  }

  processBilling(){

    this.isFormSubmitted = true;
    this.formValue = this.billingForm.value;
    this.apiService.post(`billing/process`, this.formValue).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: "Bill Process Request Done"
      });
      this.loadLGAs();
      this.billingForm.reset();
      this.isProcessed = true;
      this.isRetrieved = false;
    },(error)=>{

      this.isFormSubmitted = false;
      this.isProcessed = false;
      this.isRetrieved = false;




    })


  }

  loadLGAs(){
    this.apiService.get(`lga/all`).subscribe((result:any)=>{
      this.lgaList = result.data;
    },error => {
      this.errorBag = error.message
      //console.log(this.errorBag)
      // alert("Whoops! Something went wrong.")
    })


  }

  retrieveBills() {
    this.isFormSubmitted = true;
    this.formValue = this.billingForm.value;
    this.billingYear = this.formValue.year;
    this.apiService.post(`billing/retrieve`, this.formValue).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: "Bills Retrieved!"
      });
      //this.billList = res.data;
      this.lgaName = res.data.lgaName;
      this.noOfBuildings = res.data.noOfBuildings;
      this.noOfBills = res.data.noOfBills;
      this.billAmount = res.data.billAmount;
      this.billId = res.data.id;
      this.isRetrieved = true;
      this.isProcessed = false;

      this.loadLGAs();
      this.billingForm.reset();
    },(error)=>{
      this.isFormSubmitted = false;
      this.isRetrieved = false;
      this.isProcessed = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Conflict Error',
        detail: error.error.message
      });
    })
  }

  goBack():void{
    this.location.back();
  }
}
