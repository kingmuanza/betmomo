import { Component, Input, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-display-match',
  templateUrl: './display-match.component.html',
  styleUrls: ['./display-match.component.scss']
})
export class DisplayMatchComponent implements OnInit {

  @Input() match!: Match;
  constructor() { }

  ngOnInit(): void {
  }

}
