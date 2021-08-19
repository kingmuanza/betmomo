import { Component, Input, OnInit } from '@angular/core';
import { Competition } from 'src/app/models/competition.model';

@Component({
  selector: 'app-display-competition',
  templateUrl: './display-competition.component.html',
  styleUrls: ['./display-competition.component.scss']
})
export class DisplayCompetitionComponent implements OnInit {

  @Input() competition: Competition | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
