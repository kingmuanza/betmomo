import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Championnat } from 'src/app/models/championnat.model';

@Component({
  selector: 'app-display-championnat',
  templateUrl: './display-championnat.component.html',
  styleUrls: ['./display-championnat.component.scss']
})
export class DisplayChampionnatComponent implements OnInit {

  @Input() championnat: Championnat | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
