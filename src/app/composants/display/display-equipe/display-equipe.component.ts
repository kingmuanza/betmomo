import { Component, Input, OnInit } from '@angular/core';
import { Equipe } from 'src/app/models/equipe.model';

@Component({
  selector: 'app-display-equipe',
  templateUrl: './display-equipe.component.html',
  styleUrls: ['./display-equipe.component.scss']
})
export class DisplayEquipeComponent implements OnInit {

  @Input() equipe = new Equipe('inconnu');
  constructor() { }

  ngOnInit(): void {
  }

}
