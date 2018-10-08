import { Comment } from './../shared/comment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
import {coerceNumberProperty} from '@angular/cdk/coercion';

import { switchMap } from 'rxjs/operators';
import { visibility, flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishDetailComponent implements OnInit {
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  feedbackForm: FormGroup;
  comment: Comment;
  errMess: string;
  dishcopy = null;
  visibility = 'shown';
  
  formErrors = {
    'author': '',
    'comment': ''
  };

  validationComments = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.'
    },
    'comment': {
      'required': 'Comment is required.'
    },
  };

  autoTicks = false;
  showTicks = true;
  rating = 5;

  constructor(private dishService: DishService, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }

  ngOnInit() {
    this.createForm();

    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds, errmess => this.errMess = <any>errmess.message);

    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(+params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: [''],
      comment: ['', [Validators.required] ]
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation comment now
  }
  
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error comment (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const comments = this.validationComments[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += comments[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment =  this.feedbackForm.value;

    let date = new Date();
    this.comment.date = date.toISOString()
    ;
    //this.dish.comments.push(this.comment);

    this.dishcopy.comments.push(this.comment);
    this.dishcopy.save().subscribe(dish => this.dish = dish);

    this.feedbackForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;

}
