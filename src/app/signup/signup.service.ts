import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { SignupResponse } from '../model/SignupResponse';

import { CommonRestService } from '../shared-services/common-rest.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private commonRestService: CommonRestService) { }

  public signup(payload: any): Observable<SignupResponse> {
    return this.commonRestService.postMethod(environment.BASE_PATH + 'user/signup', payload);
  }
}
