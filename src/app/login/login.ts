import { Component } from '@angular/core';
import { RouterOutlet, } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  out=[];
  constructor(private router: Router) { }
  signIn(form: any) {
    if (form.invalid) {
      alert("please enter your valid mailId.(or)please check password(min 3digit).");
      return;
    }
    console.log(form.value);
    let users=JSON.parse(localStorage.getItem('users')||'[]');
    users.push({
      email:form.value.email,
      password:form.value.password
    })
    localStorage.setItem('users',JSON.stringify(users));
    this.out=JSON.parse(localStorage.getItem('users')||'[]');

    this.router.navigate(['/to-do']);
    console.log(this.out);

  }
}


