import { Observable } from 'rxjs';
import { Restangular } from 'ngx-restangular';
import { Feedback } from './../shared/feedback';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  feedbacks: Feedback[];
  errMess: string;

  constructor(private restangular: Restangular, @Inject('BaseURL') private BaseURL) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    return this.restangular.all('feedbacks').post(feedback);
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.restangular.all('feedbacks').getList();
  }
}
