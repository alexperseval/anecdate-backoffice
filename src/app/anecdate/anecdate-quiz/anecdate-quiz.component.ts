import { Component, Input, OnInit } from '@angular/core';
import { Anecdate } from '../anecdate';
import { AnecdateService } from '../anecdate.service';
import { Quiz } from '../quiz';

@Component({
  selector: 'app-anecdate-quiz',
  templateUrl: './anecdate-quiz.component.html',
  styleUrls: ['./anecdate-quiz.component.css']
})
export class AnecdateQuizComponent implements OnInit {
  @Input() anecdate! : Anecdate;

  quiz!: Quiz;

  constructor(private anecdateService: AnecdateService) { }

  ngOnInit(): void {
    //console.log(this.anecdate)
    this.getQuiz()
    console.log("quiz",this.quiz)
  }

  getQuiz(): void {
    this.anecdateService.getQuiz(this.anecdate.id).subscribe(data =>
      this.quiz = data
    );
  }

}
