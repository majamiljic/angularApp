import { Restangular } from 'ngx-restangular';
import { baseURL } from './../shared/baseurl';
import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';

import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
    return  this.restangular.one('leaders', id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({featured: true})
      .pipe(map(leaders => leaders[0]));
  }
}