import { Component, Input, OnInit } from '@angular/core';
import { CompetitionEdition } from 'src/app/models/competition.edition.model';

@Component({
  selector: 'app-display-competition-edition',
  templateUrl: './display-competition-edition.component.html',
  styleUrls: ['./display-competition-edition.component.scss']
})
export class DisplayCompetitionEditionComponent implements OnInit {

  @Input() competitionEdition?: CompetitionEdition;
  constructor() { }

  ngOnInit(): void {
  }

}
