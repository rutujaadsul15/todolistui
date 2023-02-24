import { TaskResponse } from './../model/TaskResponse';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',
  '../../assets/css/bootstrap.min.css', 
  '../../assets/lib/animate/animate.css',
  '../../assets/lib/animate/animate.min.css',
  '../../assets/lib/owlcarousel/assets/owl.carousel.min.css'],
})
export class DashboardComponent implements OnInit {
  [x: string]: any;
  private subscription$: Subscription[] = [];
  public displayFlag: Boolean = false;   //this flag is for displaying task form 
  public displayTaskTableFlag: Boolean = false;   //this flag is for displaying task table 
  public taskResponse!: TaskResponse;
  public taskResponseList!: TaskResponse[];
  public form: any = {};
  private subscriptions$: Subscription[] = [];
  public config_for_task: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.displayFlag = false;
    this.getTaskByContactNumber();
  }
  ngOnDestroy(): void {
    this.subscriptions$.map((sub) => sub && sub.unsubscribe());
  }

  public displayFlagUpdate( ) {
    this.displayFlag = !this.displayFlag;
    this.displayTaskTableFlag= false;
  }

  public displayTaskTableFlagUpdate() {
    this.displayTaskTableFlag = !this.displayTaskTableFlag;
  }

  public taskForm = new FormGroup({
    taskDetails: new FormControl('', [Validators.required]),
    taskStartTime: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
    taskEndTime: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
    username: new FormControl('', [Validators.required]),
  });

  public submitTask() {
    console.log(this.taskForm);
    this.taskForm.controls.username.setValue(
      sessionStorage.getItem('username')
    );
    const submitTask$ = this.dashboardService
      .submitTask(this.taskForm.value)
      .subscribe(
        (resp: any) => {
          console.log('New task has been submitted successfully');
          this.getTaskByContactNumber();
        },
        (err: any) => {
          console.log('Error while adding the task');
        }
      );
    this.subscription$.push(submitTask$);
  }

  public getTaskByContactNumber() {
  
    const contactNumber = sessionStorage!.getItem('username');
    const getTasksSub$ = this.dashboardService
      .getTaskByContactNumber(contactNumber)
      .subscribe(
        (resp: any) => {
          this.taskResponseList = resp;
           this.displayTaskTableFlag = true;
        },
        (err: any) => {
          console.log('Error while fetching for the tasks');
        }
      );
    this.subscriptions$.push(getTasksSub$);
  }

  public deleteTaskByid(id: number) {
    const deleteTasksSub$ = this.dashboardService.deleteTaskByid(id).subscribe(
      (resp: any) => {
        console.log('RECORD DELETED SUCCESSFULLY');
        this.getTaskByContactNumber();
      },
      (err: any) => {
        console.log('Error while DELETING the tasks');
      }
    );
    this.subscriptions$.push(deleteTasksSub$);
  }

  public updateTask(record:TaskResponse, currStatus: string) {
   if(currStatus){
   record.status=currStatus;
   }
    const updateTask$ = this.dashboardService
      .updateTask(record)
      .subscribe(
        (resp: any) => {
          console.log(' task has been updated successfully');
          this.getTaskByContactNumber();
        },
        (err: any) => {
          console.log('Error while updating the task');
        }
      );
    this.subscription$.push(updateTask$);
  }
}
