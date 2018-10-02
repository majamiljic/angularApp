import { LeaderService } from './../services/leader.service';
import { Leader } from './../shared/leader';
import { PromotionService } from './../services/promotion.service';
import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';
import { Component, OnInit } from '@angular/core';
import { Promotion } from '../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(private dishservice: DishService, private promotionservice: PromotionService, private leaderService: LeaderService) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader);
  }

}
