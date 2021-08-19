import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { StatistiqueService } from 'src/app/services/statistiques.service';

@Component({
  selector: 'app-display-graphe',
  templateUrl: './display-graphe.component.html',
  styleUrls: ['./display-graphe.component.scss']
})
export class DisplayGrapheComponent implements OnInit, OnChanges {

  @Input() matchs = new Array<Match>();

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['0-15', '15-30', '30-45', '45-60', '60-75', '75-90'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Best Fruits' }
  ];

  constructor(
    private statistiqueService: StatistiqueService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.recalculerButs();
  }

  ngOnInit(): void {
    this.recalculerButs();
  }

  recalculerButs() {
    const data = [0, 0, 0, 0, 0, 0, 0]
    const dataDomicile = [0, 0, 0, 0, 0, 0, 0]
    const dataExterieur = [0, 0, 0, 0, 0, 0, 0]
    const dataPremiersButs = [0, 0, 0, 0, 0, 0, 0]
    const dataSecondsButs = [0, 0, 0, 0, 0, 0, 0]
    const dataDerniersButs = [0, 0, 0, 0, 0, 0, 0]
    const dataPremiersButsDomicile = [0, 0, 0, 0, 0, 0, 0]
    const dataDerniersButsDomicile = [0, 0, 0, 0, 0, 0, 0]
    const dataPremiersButsExterieur = [0, 0, 0, 0, 0, 0, 0]
    const dataDerniersButsExterieur = [0, 0, 0, 0, 0, 0, 0]

    const buts = this.statistiqueService.repartitionDesButs(this.matchs).buts;
    const butsDomicile = this.statistiqueService.repartitionDesButs(this.matchs).butsDomicile;
    const butsExterieur = this.statistiqueService.repartitionDesButs(this.matchs).butsExterieur;
    const premiersButs = this.statistiqueService.repartitionDesButs(this.matchs).premiersButs;
    const secondsButs = this.statistiqueService.repartitionDesButs(this.matchs).secondsButs;
    const derniersButs = this.statistiqueService.repartitionDesButs(this.matchs).derniersButs;
    const premiersButsDomicile = this.statistiqueService.repartitionDesButs(this.matchs).premiersButsDomicile;
    const derniersButsDomicile = this.statistiqueService.repartitionDesButs(this.matchs).derniersButsDomicile;

    const premiersButsExterieur = this.statistiqueService.repartitionDesButs(this.matchs).premiersButsExterieur;
    const derniersButsExterieur = this.statistiqueService.repartitionDesButs(this.matchs).derniersButsExterieur;

    console.log('buts.length')
    console.log(buts.length)
    buts.forEach((but) => {
      if (but.minute < 15) {
        data[0] = data[0] + 1;
      }
      if (but.minute >= 15 && but.minute < 30) {
        data[1] = data[1] + 1;
      }
      if (but.minute >= 30 && but.minute < 46) {
        data[2] = data[2] + 1;
      }
      if (but.minute >= 46 && but.minute < 60) {
        data[3] = data[3] + 1;
      }
      if (but.minute >=60  && but.minute < 75) {
        data[4] = data[4] + 1;
      }
      if (but.minute >=75  && but.minute <=90 ) {
        data[5] = data[5] + 1;
      }
    });
    butsDomicile.forEach((but) => {
      if (but.minute < 15) {
        dataDomicile[0] = dataDomicile[0] + 1;
      }
      if (but.minute >= 15 && but.minute < 30) {
        dataDomicile[1] = dataDomicile[1] + 1;
      }
      if (but.minute >= 30 && but.minute < 46) {
        dataDomicile[2] = dataDomicile[2] + 1;
      }
      if (but.minute >= 46 && but.minute < 60) {
        dataDomicile[3] = dataDomicile[3] + 1;
      }
      if (but.minute >=60  && but.minute < 75) {
        dataDomicile[4] = dataDomicile[4] + 1;
      }
      if (but.minute >=75  && but.minute <=90 ) {
        dataDomicile[5] = dataDomicile[5] + 1;
      }
    });
    butsExterieur.forEach((but) => {
      if (but.minute < 15) {
        dataExterieur[0] = dataExterieur[0] + 1;
      }
      if (but.minute >= 15 && but.minute < 30) {
        dataExterieur[1] = dataExterieur[1] + 1;
      }
      if (but.minute >= 30 && but.minute < 46) {
        dataExterieur[2] = dataExterieur[2] + 1;
      }
      if (but.minute >= 46 && but.minute < 60) {
        dataExterieur[3] = dataExterieur[3] + 1;
      }
      if (but.minute >=60  && but.minute < 75) {
        dataExterieur[4] = dataExterieur[4] + 1;
      }
      if (but.minute >=75  && but.minute <=90 ) {
        dataExterieur[5] = dataExterieur[5] + 1;
      }
    });
    premiersButs.forEach((but) => {
      if (but.minute < 15) {
        dataPremiersButs[0] = dataPremiersButs[0] + 1;
      }
      if (but.minute >= 15 && but.minute < 30) {
        dataPremiersButs[1] = dataPremiersButs[1] + 1;
      }
      if (but.minute >= 30 && but.minute < 46) {
        dataPremiersButs[2] = dataPremiersButs[2] + 1;
      }
      if (but.minute >= 46 && but.minute < 60) {
        dataPremiersButs[3] = dataPremiersButs[3] + 1;
      }
      if (but.minute >=60  && but.minute < 75) {
        dataPremiersButs[4] = dataPremiersButs[4] + 1;
      }
      if (but.minute >=75  && but.minute <=90 ) {
        dataPremiersButs[5] = dataPremiersButs[5] + 1;
      }
    });
    secondsButs.forEach((but) => {
      if (but.minute < 15) {
        dataSecondsButs[0] = dataSecondsButs[0] + 1;
      }
      if (but.minute >= 15 && but.minute < 30) {
        dataSecondsButs[1] = dataSecondsButs[1] + 1;
      }
      if (but.minute >= 30 && but.minute < 46) {
        dataSecondsButs[2] = dataSecondsButs[2] + 1;
      }
      if (but.minute >= 46 && but.minute < 60) {
        dataSecondsButs[3] = dataSecondsButs[3] + 1;
      }
      if (but.minute >=60  && but.minute < 75) {
        dataSecondsButs[4] = dataSecondsButs[4] + 1;
      }
      if (but.minute >=75  && but.minute <=90 ) {
        dataSecondsButs[5] = dataSecondsButs[5] + 1;
      }
    });
    premiersButsDomicile.forEach((but) => {
      if (but.minute < 15) {
        dataPremiersButsDomicile[0] = dataPremiersButsDomicile[0] + 1;
      }
      if (but.minute >= 15 && but.minute < 30) {
        dataPremiersButsDomicile[1] = dataPremiersButsDomicile[1] + 1;
      }
      if (but.minute >= 30 && but.minute < 46) {
        dataPremiersButsDomicile[2] = dataPremiersButsDomicile[2] + 1;
      }
      if (but.minute >= 46 && but.minute < 60) {
        dataPremiersButsDomicile[3] = dataPremiersButsDomicile[3] + 1;
      }
      if (but.minute >=60  && but.minute < 75) {
        dataPremiersButsDomicile[4] = dataPremiersButsDomicile[4] + 1;
      }
      if (but.minute >=75  && but.minute <=90 ) {
        dataPremiersButsDomicile[5] = dataPremiersButsDomicile[5] + 1;
      }
    });
    premiersButsExterieur.forEach((but) => {
      if (but.minute < 15) {
        dataPremiersButsExterieur[0] = dataPremiersButsExterieur[0] + 1;
      }
      if (but.minute >= 15 && but.minute < 30) {
        dataPremiersButsExterieur[1] = dataPremiersButsExterieur[1] + 1;
      }
      if (but.minute >= 30 && but.minute < 46) {
        dataPremiersButsExterieur[2] = dataPremiersButsExterieur[2] + 1;
      }
      if (but.minute >= 46 && but.minute < 60) {
        dataPremiersButsExterieur[3] = dataPremiersButsExterieur[3] + 1;
      }
      if (but.minute >=60  && but.minute < 75) {
        dataPremiersButsExterieur[4] = dataPremiersButsExterieur[4] + 1;
      }
      if (but.minute >=75  && but.minute <=90 ) {
        dataPremiersButsExterieur[5] = dataPremiersButsExterieur[5] + 1;
      }
    });
    derniersButs.forEach((but) => {
      if (but.minute < 15) {
        dataDerniersButs[0] = dataDerniersButs[0] + 1;
      }
      if (but.minute >= 15 && but.minute < 30) {
        dataDerniersButs[1] = dataDerniersButs[1] + 1;
      }
      if (but.minute >= 30 && but.minute < 46) {
        dataDerniersButs[2] = dataDerniersButs[2] + 1;
      }
      if (but.minute >= 46 && but.minute < 60) {
        dataDerniersButs[3] = dataDerniersButs[3] + 1;
      }
      if (but.minute >=60  && but.minute < 75) {
        dataDerniersButs[4] = dataDerniersButs[4] + 1;
      }
      if (but.minute >=75  && but.minute <=90 ) {
        dataDerniersButs[5] = dataDerniersButs[5] + 1;
      }
    });
    derniersButsDomicile.forEach((but) => {
      if (but.minute < 15) {
        dataDerniersButsDomicile[0] = dataDerniersButsDomicile[0] + 1;
      }
      if (but.minute >= 15 && but.minute < 30) {
        dataDerniersButsDomicile[1] = dataDerniersButsDomicile[1] + 1;
      }
      if (but.minute >= 30 && but.minute < 46) {
        dataDerniersButsDomicile[2] = dataDerniersButsDomicile[2] + 1;
      }
      if (but.minute >= 46 && but.minute < 60) {
        dataDerniersButsDomicile[3] = dataDerniersButsDomicile[3] + 1;
      }
      if (but.minute >=60  && but.minute < 75) {
        dataDerniersButsDomicile[4] = dataDerniersButsDomicile[4] + 1;
      }
      if (but.minute >=75  && but.minute <=90 ) {
        dataDerniersButsDomicile[5] = dataDerniersButsDomicile[5] + 1;
      }
    });
    derniersButsExterieur.forEach((but) => {
      if (but.minute < 15) {
        dataDerniersButsExterieur[0] = dataDerniersButsExterieur[0] + 1;
      }
      if (but.minute >= 15 && but.minute < 30) {
        dataDerniersButsExterieur[1] = dataDerniersButsExterieur[1] + 1;
      }
      if (but.minute >= 30 && but.minute < 46) {
        dataDerniersButsExterieur[2] = dataDerniersButsExterieur[2] + 1;
      }
      if (but.minute >= 46 && but.minute < 60) {
        dataDerniersButsExterieur[3] = dataDerniersButsExterieur[3] + 1;
      }
      if (but.minute >=60  && but.minute < 75) {
        dataDerniersButsExterieur[4] = dataDerniersButsExterieur[4] + 1;
      }
      if (but.minute >=75  && but.minute <=90 ) {
        dataDerniersButsExterieur[5] = dataDerniersButsExterieur[5] + 1;
      }
    });
    console.log('data');
    console.log(data);
    this.barChartData[0] = {
      data: data,
      label: 'Tous les buts'
    };
    this.barChartData[1] = {
      data: dataDomicile,
      backgroundColor: 'green',
      label: 'Buts à domicile'
    };
    this.barChartData[2] = {
      data: dataExterieur,
      backgroundColor: 'orange',
      label: 'Buts à l\'extérieur'
    };
    this.barChartData[3] = {
      data: dataPremiersButs,
      backgroundColor: 'red',
      label: 'Premier but du match'
    };
    this.barChartData[4] = {
      data: dataDerniersButs,
      backgroundColor: 'blue',
      label: 'Dernier but du match'
    };
    this.barChartData[5] = {
      data: dataPremiersButsDomicile,
      backgroundColor: 'orangered',
      label: 'Premier but de l\'equipe à domicile'
    };
    this.barChartData[6] = {
      data: dataDerniersButsDomicile,
      backgroundColor: 'cyan',
      label: 'Dernier but de l\'equipe à domicile'
    };
    this.barChartData[7] = {
      data: dataPremiersButsExterieur,
      backgroundColor: 'magenta',
      label: 'Premier but de l\'equipe à extérieur'
    };
    this.barChartData[8] = {
      data: dataDerniersButsExterieur,
      backgroundColor: 'yellow',
      label: 'Dernier but de l\'equipe à extérieur'
    };
    this.barChartData[9] = {
      data: dataSecondsButs,
      backgroundColor: 'gray',
      label: 'Deuxième but du match'
    };
  }
}
