import { TaskResponse } from './../model/TaskResponse';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonRestService } from '../shared-services/common-rest.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private commonRestService: CommonRestService) { }

  public submitTask(payload:any) {
    return this.commonRestService.postMethod(environment.BASE_PATH + 'task/add', payload);
  }

  public getTaskByContactNumber(contactNumber:any):Observable<TaskResponse> {
    return this.commonRestService.getMethod(environment.BASE_PATH + 'task/getTaskList?contactNumber='+contactNumber);
  }

  public deleteTaskByid(id:number):Observable<TaskResponse> {
    return this.commonRestService.deleteMethod(environment.BASE_PATH + 'task/delete?id='+id);
  }

  public updateTask(record : TaskResponse) :Observable<TaskResponse>{
    return this.commonRestService.putMethod(environment.BASE_PATH + 'task/update', record);
  }
}

