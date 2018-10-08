import { LeaderService } from './../services/leader.service';
import { Leader } from './../shared/leader';
import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  errMess: string;

  constructor(private leaderService: LeaderService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders, errmess => this.errMess = <any>errmess.message);
  }

}
