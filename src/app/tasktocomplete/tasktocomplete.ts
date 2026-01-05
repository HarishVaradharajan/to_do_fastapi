import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CheckCheck, SquareMousePointer, Trash2, RotateCcw } from 'lucide-angular';
import { NgClass } from '@angular/common';
import { ToDo } from '../services/to-do';
@Component({
  selector: 'app-tasktocomplete',
  imports: [FormsModule, LucideAngularModule, NgClass, CommonModule],
  templateUrl: './tasktocomplete.html',
  styleUrl: './tasktocomplete.scss',
})
export class Tasktocomplete {
  tick = CheckCheck;
  right = SquareMousePointer;
  delete = Trash2;
  reply = RotateCcw;
  completedcount = 0;
  todoData: any[] = [];
  showToast = false;
  toastMessage = '';
  toastfun = '';
  showDeleteConfirm = false;   // controls popup
  taskToDelete: any = null;
  constructor(private todoService: ToDo, private cdf: ChangeDetectorRef,) { }

  ngOnInit() {
    this.todoService.fetchTasks().subscribe({
      next: (data) => {
        this.todoData = data;
        this.completedcount = 0;
        for (let i = 0; i < this.todoData.length; i++) {
          if (this.todoData[i].completed == 1) {
            this.completedcount = this.completedcount + 1;
          }
        }
        console.log(data);
        this.cdf.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  add(form: any) {
    if (!form.valid) {
      this.showToast = true;
      this.toastMessage = "Please enter a task data";
      this.toastfun = "delete";
      setTimeout(() => {
        this.showToast = false;
        this.toastMessage = "";
        this.cdf.detectChanges();
      }, 2000);
      return;
    }
    this.todoService.addTask({
      description: form.value.task,
      completed: 0
    }).subscribe({
      next: (data) => {
        this.toastMessage = "Task Added Successfully";
        this.showToast = true;
        this.toastfun = "add";
        setTimeout(() => {
          this.showToast = false;
          this.toastMessage = "";
          console.log("toast hidden");
          this.cdf.detectChanges();
        }, 2000);

        this.ngOnInit();
      }
    });
    form.reset();
    this.ngOnInit();
  }

  complete(index: any) {
    this.todoService.editTask(index).subscribe({
      next: (data) => {
        this.toastMessage = "Task Completed Successfully";
        this.showToast = true;
        this.toastfun = "complete";
        setTimeout(() => {
          this.showToast = false;
          this.toastMessage = "";
          console.log("toast hidden");
          this.cdf.detectChanges();
        }, 2000);

        this.ngOnInit();
      }
    });

  }

  reassign(i: any) {
    this.todoService.taskredo(i).subscribe({
      next: (data) => {
        this.toastMessage = "Task Reassigned Successfully";
        this.showToast = true;
        this.toastfun = "complete";
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
