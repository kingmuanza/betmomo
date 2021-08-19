import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Saison } from 'src/app/models/saison.model';

@Component({
  selector: 'app-display-saison',
  templateUrl: './display-saison.component.html',
  styleUrls: ['./display-saison.component.scss']
})
export class DisplaySaisonComponent implements OnInit {

  @Input() saison: Saison | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
