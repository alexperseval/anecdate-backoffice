import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Anecdate } from './anecdate';
import { AnecdateService } from './anecdate.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Quiz } from './quiz';

@Component({
  selector: 'app-anecdate',
  templateUrl: './anecdate.component.html',
  styleUrls: ['./anecdate.component.css'],
})
export class AnecdateComponent implements OnInit {
  moment = moment().locale('fr')
  date: string = this.moment.format("D MMMM").toLowerCase();

  anecdates: Anecdate[] = [];
  show: boolean = this.anecdates.length > 0 ? true : false;

  anecdateCpt: number = 0;
  currentAnecdate: Anecdate = this.anecdates[0];
  currentQuiz!: Quiz;
  hasQuiz: boolean = false;

  constructor(private anecdateService: AnecdateService, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.getAnecdatesByDate(moment().format("YYYY-MM-DD"))
    //console.log("Anecdates : " + this.anecdates);
  }

  changeDate(event: MatDatepickerInputEvent<Date>) {
    this.moment = moment(event.value);
    this.moment.locale('fr');
    this.date = this.moment.format("D MMMM").toLowerCase()
    this.getAnecdatesByDate(this.moment.format("YYYY-MM-DD"))
  }

  getAnecdatesByDate(date: string): void {
    this.anecdateService.getAnecdatesByDate(date).subscribe(data => {
      this.anecdates = data;
      this.show = this.anecdates.length > 0 ? true : false;
      this.currentAnecdate = this.anecdates[0];
    });
  }

  nextAnecdate() {
    if (this.anecdates.length > 1) {
      this.anecdateCpt++;
      if (this.anecdateCpt >= this.anecdates.length) {
        this.anecdateCpt = 0;
        this._snackBar.open("Vous avez regarder toutes les anec'dates. Retour au début !", "Fermer", {
          duration: 3000
        });
      }
      this.currentAnecdate = this.anecdates[this.anecdateCpt];
    } else {
      this._snackBar.open("Il n'y a pas d'autre anec'date !", "Fermer", {
        duration: 3000
      });
    }
  }

}
