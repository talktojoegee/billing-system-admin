import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule, Location} from '@angular/common';

@Component({
  selector: 'app-sync',
  imports: [ToastModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sync.component.html',
  styleUrl: './sync.component.css',
  providers: [MessageService]
})
export class SyncComponent implements OnInit{

   lgaList: any[] = [];
  logList: any[] = [];
  isFormSubmitted: boolean = false;
  syncForm!: FormGroup;
  formValue:any;

  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              private messageService: MessageService,
              private location:Location
              ) {
  }

  ngOnInit(): void {
    this.loadLGAs();
    this.loadSyncLog()
    this.initiateForm();
  }

  initiateForm(){
   this.syncForm = this.fb.group({
     lgaId: ["", Validators.required]
   });
  }


  loadLGAs(){
    this.apiService.get(`lga/all`).subscribe((result:any)=>{
      this.lgaList = result.data;
      //console.log(this.lgaList)
    },error => {
      //this.errorBag = error.message
    })
  }
  loadSyncLog(){
    this.apiService.get(`synchronization-report`).subscribe((result:any)=>{
      this.logList = result.data;
      //console.log(this.lgaList)
    },error => {
      //this.errorBag = error.message
    })
  }

  syncData(){
    this.formValue = this.syncForm.value;
    let id = this.formValue.lgaId;
    this.isFormSubmitted = true;
    this.apiService.get(`sync-data/${id}`).subscribe((result:any)=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: result.data
      });
      this.isFormSubmitted = false;
      this.loadSyncLog();
      //console.log(result)
    },(error:any) => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Action successful',
        detail: "Whoops! Something went wrong."
      });
      this.isFormSubmitted = false;
    })
  }


  goBack():void {
    this.location.back();
  }
}
