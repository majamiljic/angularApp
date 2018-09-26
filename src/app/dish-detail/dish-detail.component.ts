import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {

  dish: Dish;

  constructor(private dishService: DishService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.dish = this.dishService.getDish(id);
  }

  goBack(): void {
    this.location.back();
  }

}
