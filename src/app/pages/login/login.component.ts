import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup     } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  http = inject(HttpClient)
  router = inject(Router)
  showRegisteration = signal<boolean>(false);

  customerObj: any =
    {
      "userId": 0,
      "userName": "",
      "emailId": "",
      "fullName": "",
      "password": ""
    };

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(""),
    password: new FormControl("")
  })
  changeView() {
    this.showRegisteration.set(!this.showRegisteration())
  }

  onRegister() {

    this.http.post("https://projectapi.gerasim.in/api/BankLoan/RegisterCustomer", this.customerObj).subscribe((res: any) => {
      if (res.result) {
        alert("Customer Registered Successfully!!")
      }else{
        alert(res.message)
      }
    }, error => {
      alert("error")
    });

  }

  onLogin(){
    debugger
    const formValue = this.loginForm.value;
    debugger
    this.http.post("https://projectapi.gerasim.in/api/BankLoan/login",formValue).subscribe((res: any)=>{
      debugger
      if(res.result){
        sessionStorage.setItem("bankUser",JSON.stringify(res.data));
        this.router.navigateByUrl('loan-application-list')  
      }else{
        alert(res.message)
      }
    },error => {
      alert("some error")
    })
  } 
}
