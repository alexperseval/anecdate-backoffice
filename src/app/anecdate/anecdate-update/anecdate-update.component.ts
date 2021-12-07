import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anecdate } from '../anecdate';
import { AnecdateService } from '../anecdate.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/categories/category.service';
import { Category } from 'src/app/categories/category';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-anecdate-update',
  templateUrl: './anecdate-update.component.html',
  styleUrls: ['./anecdate-update.component.css']
})
export class AnecdateUpdateComponent implements OnInit {

  id: number = Number(this.route.snapshot.paramMap.get('id'));
  anecdate!: Anecdate;
  found: boolean = false;

  categories: Category[] = [];

  anecForm!: FormGroup;

  datepipe = new DatePipe("fr-FR");

  constructor(private anecdateService: AnecdateService, private route: ActivatedRoute, private categoryService: CategoryService, private router: Router, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.anecdateService.get(this.id).subscribe(anec => {
      if (anec) {
        this.anecdate = anec;

        let d = this.datepipe.transform(anec.date, "YYYY-M-dd");
        this.anecdate.date = d || new Date("YYYY-M-D").toString();

        this.anecForm = new FormGroup({
          anecTitle: new FormControl(this.anecdate.title, Validators.required),
          anecDescription: new FormControl(this.anecdate.description, Validators.required),
          anecDate: new FormControl(this.anecdate.date, Validators.required),
          anecCategory: new FormControl(this.anecdate.idCategory, Validators.required),
          anecSources: new FormControl(this.anecdate.sources, Validators.required),
        });

        if (anec.idQuiz) {
          this.anecdateService.getQuiz(this.anecdate.idQuiz).subscribe(q => {
            if (q) {
              this.found = true;
              this.anecdate.quiz = q[0];
              this.anecForm.addControl("question", new FormControl(this.anecdate.quiz.question, Validators.required));
              this.anecForm.addControl("quizTAnswer", new FormControl(this.anecdate.quiz.true_answer, Validators.required));
              this.anecForm.addControl("quizWAnswer1", new FormControl(this.anecdate.quiz.wrong_answer1, Validators.required));
              this.anecForm.addControl("quizWAnswer2", new FormControl(this.anecdate.quiz.wrong_answer2, Validators.required));
              this.anecForm.addControl("quizWAnswer3", new FormControl(this.anecdate.quiz.wrong_answer3, Validators.required));
            }
            console.log(this.anecdate.quiz)
          })
        } else {
          this.found = true;
        }
      }
    })

    this.categoryService.getCategories().subscribe(cat => this.categories = cat);

  }



  saveAnec(anec: Anecdate) {
    let d = this.datepipe.transform(this.anecForm.value.anecDate, "YYYY-M-dd")?.toString() || this.anecdate.date;

    if (anec.idQuiz) {
      var question = this.anecForm.value.question
      var tanswer = this.anecForm.value.quizTAnswer
      var wanswer1 = this.anecForm.value.quizWAnswer1
      var wanswer2 = this.anecForm.value.quizWAnswer2
      var wanswer3 = this.anecForm.value.quizWAnswer3
    }

    this.anecdateService.updateAnecdate(
      anec.id,
      d,
      this.anecForm.value.anecDescription,
      this.anecForm.value.anecSources,
      this.anecForm.value.anecTitle,
      this.anecForm.value.anecCategory,
      question,
      tanswer,
      wanswer1,
      wanswer2,
      wanswer3

    ).subscribe(res => {
      if (res == "OK") {
        let url = "/anecdate/" + this.anecdate.id;
        this.router.navigate([url]);
        this.snack.open("Anecdate modifiée !", "Fermer", {
          duration: 3000
        });
      } else {
        this.snack.open("Une erreur est survenue lors de la modification", "Fermer", {
          duration: 3000
        });
      }
    })
  }

}
