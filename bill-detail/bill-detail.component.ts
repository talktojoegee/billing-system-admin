import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {environment} from '../../../../environments/environment.development';
import {Location} from '@angular/common';

@Component({
  selector: 'app-bill-detail',
  imports: [RouterLink],
  templateUrl: './bill-detail.component.html',
  styleUrl: './bill-detail.component.css'
})
export class BillDetailComponent implements OnInit{

  APP_CURRENCY :string = environment.APP_CURRENCY;
  assessmentYear:number = new Date().getFullYear();

  // url: any = '';


  ownerName:string = '';
  buildingCode:string = '';
  contactAddress:string = '';
  propertyClassification:string = '';
  kgTin:string = '';
  entryDate:string = '';
  assessmentNo:string = '';
  propertyAddress:string = '';
  phoneNo:string = '';
  assessValue: number = 0;
  chargeRate:number = 0;
  url:any = null;

  //buildingCode: string = '';
  //assessmentNo: string = '';
  assessedValue: string = '';
  billAmount:number = 0;
  date: string = '';
  paid:number = 0;
  paidAmount: number = 0;
  objection: string = '';
  year: number = 0;
  lgaName: string = '';
  constructor(private apiService: ApiService, private route: ActivatedRoute, private location:Location) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     this.url = params.get('url');
    this.loadBill();
    });
  }

  loadBill(){
    this.apiService.get(`billing/detail/${this.url}`).subscribe((res:any)=>{
      this.ownerName = res.data.ownerName;
      this.buildingCode = res.data.buildingCode;
      this.contactAddress = res.data.contactAddress;
      this.propertyClassification = res.data.propertyClassification;
      this.kgTin = res.data.kgTin;
      this.entryDate = res.data.entryDate;
      this.assessmentNo = res.data.assessmentNo;
      this.propertyAddress = res.data.propertyAddress;
      this.phoneNo = res.data.phoneNo;
      this.assessValue = res.data.assessValue;
      this.chargeRate = res.data.chargeRate;

      this.buildingCode = res.data.buildingCode;
      this.assessmentNo =  res.data.assessmentNo;
      this.assessedValue =  res.data.assessedValue;
      this.billAmount = res.data.billAmount;
      this.date =  res.data.date;
      this.paid = res.data.paid;
      this.paidAmount =  res.data.paidAmount;
      this.objection =  res.data.objection;
      this.assessmentYear =  res.data.year;
      this.url = res.data.url;

      //this.lgaName =  res.lgaName;

    },error=>{

    })


  }


  goBack(): void {
    this.location.back();
  }


  downloadPDF() {
    alert("Coming soon...")
  }
}
