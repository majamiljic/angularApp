import { Dish } from './../shared/dish';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {

    @Input()
    dish: Dish;

  constructor() { }

  ngOnInit() {}

}
