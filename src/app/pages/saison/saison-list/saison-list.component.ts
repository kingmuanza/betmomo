import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Saison } from 'src/app/models/saison.model';
import { SaisonService } from 'src/app/services/saison.service';

@Component({
  selector: 'app-saison-list',
  templateUrl: './saison-list.component.html',
  styleUrls: ['./saison-list.component.scss']
})
export class SaisonListComponent implements OnInit {
  saisons = new Array<Saison>();

  constructor(
    private router: Router,
    private saisonService: SaisonService,
  ) { }

  ngOnInit(): void {
    this.saisonService.getAll().then((saisons) => {
      this.saisons = saisons;
    });
  }

  voir(saison: Saison) {
    this.router.navigate(['championnat', 'saison', saison.id]);
  }

  nouveau() {
    this.router.navigate(['saison', 'edit']);
  }

}
