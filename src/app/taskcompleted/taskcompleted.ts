import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CheckCheck, SquareMousePointer, Trash2, RotateCcw } from 'lucide-angular';
import { ToDo } from '../services/to-do';
@Component({
  selector: 'app-taskcompleted',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './taskcompleted.html',
  styleUrl: './taskcompleted.scss',
})
export class Taskcompleted {
  todoData: any[] = [];
  tick = CheckCheck;
  right = SquareMousePointer;
  delete = Trash2;
  reply = RotateCcw;
  cco=0;
  showToast = false;
  toastMessage = '';
  toastfun='';
  showDeleteConfirm = false;   // controls popup
  taskToDelete: any = null;

  constructor(
    private todoService: ToDo,
    private cdf: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.todoService.fetchTasks().subscribe({
      next: (data) => {
        this.todoData = data;
        console.log("dataaa:", this.todoData);
        for(let i=0;i<this.todoData.length;i++){
        if(this.todoData[i].completed==1){
          this.cco=this.cco+1;
        }
      }

      this.cdf.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  reassign(i: any) {
    this.todoService.taskredo(i).subscribe({
      next: (data) => {
        this.toastMessage = "Task Reassigned Successfully";
        this.showToast = true;
        this.toastfun="complete";
        setTimeout(() => {
          this.showToast = false;
          this.toastMessage = "";
          console.log("toast hidden");
          this.cdf.detectChanges();
        }, 2000);
        this.ngOnInit();
        // alert("Reassigned task");
      }
    })
  }

  confirmDelete(taskid: any) {
    this.taskToDelete = taskid;
    this.showDeleteConfirm = true;
  }

  deleteConfirmed() {
    this.todoService.deleteTask(this.taskToDelete).subscribe({
      next: () => {
        this.showDeleteConfirm = false;
        this.taskToDelete = null;

        this.toastMessage = 'Task deleted successfully';
        this.toastfun = 'delete';
        this.showToast = true;
        this.ngOnInit();

        setTimeout(() => {
          this.showToast = false;
          this.cdf.detectChanges();
        }, 2000);
      },
      error: () => {
        alert('Delete failed');
      }
    });
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
    this.taskToDelete = null;
  }
}
