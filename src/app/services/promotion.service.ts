import { Restangular } from 'ngx-restangular';
import { baseURL } from './../shared/baseurl';
import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';

import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private restangular: Restangular) { }

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return  this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
      .pipe(map(promotions => promotions[0]));
  }
}