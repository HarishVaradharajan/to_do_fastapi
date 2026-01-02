import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from "@angular/router";
import { LucideAngularModule,ClipboardList,ListTodo } from 'lucide-angular';

@Component({
  selector: 'app-to-do',
  imports: [CommonModule, RouterOutlet, RouterLinkWithHref, LucideAngularModule, RouterLinkActive],
  templateUrl: './to-do.html',
  styleUrl: './to-do.scss',
})
export class ToDo {
  readonly clip=ClipboardList;
  readonly todo=ListTodo;
  newd: any;
  dele: any;
  output = JSON.parse(localStorage.getItem('users') || '[]');
  length = this.output.length;
  out = this.output[this.length-1].email;
  ngOnInit() {
    // this.dele=this.output.splice(i,1);
    // localStorage.setItem('users',JSON.stringify(this.output));
    // let newdata=JSON.parse(localStorage.getItem('newdata')||'[]');
    // newdata.push(this.dele[0]);
    // localStorage.setItem('newdata',JSON.stringify(newdata));
    // this.newd=JSON.parse(localStorage.getItem('newdata')||'[]');
    console.log(this.out);
  }
  today = new Date();

}
