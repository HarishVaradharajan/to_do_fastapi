import { Routes } from '@angular/router';
import { Login } from './login/login';
import { ToDo } from './to-do/to-do';
import { Tasktocomplete } from './tasktocomplete/tasktocomplete';
import { Taskcompleted } from './taskcompleted/taskcompleted';
export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:Login},
  {path:'to-do',component:ToDo,
    children:[
      {path:'',redirectTo:'tasktocomplete',pathMatch:'full'},
      {path:'tasktocomplete',component:Tasktocomplete},
      {path:'taskcompleted',component:Taskcompleted}
    ]
  },
];
