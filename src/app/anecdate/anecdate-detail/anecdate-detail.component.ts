import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/categories/category';
import { Anecdate } from '../anecdate';
import { AnecdateService } from '../anecdate.service';
import { Comment } from '../comment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-anecdate-detail',
  templateUrl: './anecdate-detail.component.html',
  styleUrls: ['./anecdate-detail.component.css']
})
export class AnecdateDetailComponent implements OnInit {
  id: number = Number(this.route.snapshot.paramMap.get('id'));

  category!: Category;

  comments: Comment[] = [];

  sources: string[] = [];

  currentAnecdate!: Anecdate;
  show: boolean = this.currentAnecdate != null ? true : false;

  constructor(private anecdateService: AnecdateService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.anecdateService.getAnecdate(this.id).subscribe(data => {
      this.currentAnecdate = data;

      this.anecdateService.getCategory(this.currentAnecdate.idCategory).subscribe(cat => this.category = cat);

      this.anecdateService.getComments(this.currentAnecdate.id).subscribe(comments => {
        this.comments = comments;
        const datepipe = new DatePipe("fr-FR")
        comments.forEach(com => {
          let d = datepipe.transform(com.date, "d MMMM y")
          com.date = d || new Date().toString();

          this.anecdateService.getCommentAuthor(com.idAuthor).subscribe(author => {
            if (author)
              com.idAuthor = author.pseudo;
          });
        });
      });

      //Get anecdate author
      this.anecdateService.getCommentAuthor(this.currentAnecdate.idAuthor +"").subscribe(author => {
        if (author)
          this.currentAnecdate.idAuthor = author.pseudo;
      });

      this.sources = this.currentAnecdate.sources.split(" ");

      this.show = this.currentAnecdate != null ? true : false;
    })
  }

  delete() {
    this.anecdateService.deleteAnecdate(this.currentAnecdate.id).subscribe(res => {
      if (res == "OK")
        this.currentAnecdate.status = "inactive";
    })
  }

  activate() {
    this.anecdateService.activateAnecdate(this.currentAnecdate.id).subscribe(res => {
      if (res == "OK")
        this.currentAnecdate.status = "active";
    })
  }

  deleteComment(comment :Comment) {
    this.anecdateService.deleteComment(comment.id).subscribe(res => {
      if (res == "OK")
        this.comments = this.comments.filter(c=> c !== comment)
    })
  }

}
