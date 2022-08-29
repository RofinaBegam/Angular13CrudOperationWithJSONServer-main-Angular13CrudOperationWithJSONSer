import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'; 
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
   
  providers: [ApiService  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
employeeModelObj:EmployeeModel=new EmployeeModel();

  formValue !: FormGroup;
employeeData!:any;
showAdd!:boolean;
showUpdate!:boolean;


showUpdateTitle!:boolean;
showAddTitle!:boolean;
  constructor(private formBuilder:FormBuilder,private api:ApiService) { 

  }

  addButtonClickFunction(){
    this.formValue.reset();
    this.showUpdate=false;
    this.showAdd=true;
    
    this.showUpdateTitle=false;
    this.showAddTitle=true;
  }



  ngOnInit(): void {

  this.formValue=this.formBuilder.group({
userId:["",[Validators.required,Validators.maxLength(2),]],
  Title:["",[Validators.required,Validators.maxLength(20)]],
  Comments:["",[Validators.required,Validators.maxLength(10)]],
 
      
    })  
this.getAllEmployee();
}

postEmployeeDetails(){
//alert("fucntion call");
this.employeeModelObj.id=this.formValue.value.id ;

this.employeeModelObj.userId=this.formValue.value.userId;
  this.employeeModelObj.Title=this.formValue.value.Title;
  this.employeeModelObj.Comments=this.formValue.value.Comments;
 

  let cancel=document.getElementById("cancel");
  this.api.postData(this.employeeModelObj).subscribe(a=> {

    console.log(a);
    alert("Record inserted successfully");
    cancel?.click();this.formValue.reset();
    this.getAllEmployee();
  })
 }


getAllEmployee(){
  this.api.getData().subscribe(a=>{
    this.employeeData=a;
  })

}
deleteEmployee(row:any){

  this.api.deleteData(row.id).subscribe(a=>{
    alert("Record Deleted Succesfully");
    this.getAllEmployee();
  })

}
updateEmployee(row:any){
  this.showUpdate=true;
  this.showAdd=false;

  this.showUpdateTitle=true;
  this.showAddTitle=false;
  this.employeeModelObj.id=row.id;
  this.formValue.controls['userId'].setValue(row.userId);
  this.formValue.controls['Title'].setValue(row.Title);
  this.formValue.controls['Comments'].setValue(row.Comments);
  
}

updateEmployeeDetails(){
  this.employeeModelObj.userId=this.formValue.value.userId;
  this.employeeModelObj.Title=this.formValue.value.Title;
  this.employeeModelObj.Comments=this.formValue.value.Comments;
  
  this.api.updateData(this.employeeModelObj,this.employeeModelObj.id).subscribe(a=>{
    alert("Record updated Succesfully");

  let cancel=document.getElementById("cancel");

    cancel?.click();
    this.formValue.reset();
    this.getAllEmployee();
  })
}

}
