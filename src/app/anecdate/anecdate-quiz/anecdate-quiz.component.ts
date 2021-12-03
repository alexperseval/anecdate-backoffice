import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Anecdate } from '../anecdate';
import { AnecdateService } from '../anecdate.service';
import { Quiz } from '../quiz';

@Component({
  selector: 'app-anecdate-quiz',
  templateUrl: './anecdate-quiz.component.html',
  styleUrls: ['./anecdate-quiz.component.css']
})
export class AnecdateQuizComponent implements OnInit, OnChanges{
  @Input() anecdate! : Anecdate;

  loaded: boolean = true;
  quiz!: Quiz;

  constructor(private anecdateService: AnecdateService) { }

  ngOnInit(): void {
    //console.log(this.anecdate)
    this.getQuiz(this.anecdate.idQuiz)
    //console.log("quiz",this.loaded)
    //console.log("quiz",this.quiz)
  }

  ngOnChanges() {
    //console.log(this.anecdate)
    this.getQuiz(this.anecdate.idQuiz)
  }

  getQuiz(id: number): void {
    this.loaded = false;
    //console.log("getQuiz(",id,")")
    this.anecdateService.getQuiz(id).subscribe(data => {
      this.quiz = data[0];
      this.loaded = true;
    });
  }

}
