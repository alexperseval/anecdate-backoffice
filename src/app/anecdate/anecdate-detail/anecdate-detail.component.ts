import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/categories/category';
import { Anecdate } from '../anecdate';
import { AnecdateService } from '../anecdate.service';

@Component({
  selector: 'app-anecdate-detail',
  templateUrl: './anecdate-detail.component.html',
  styleUrls: ['./anecdate-detail.component.css']
})
export class AnecdateDetailComponent implements OnInit {
  id:number = Number(this.route.snapshot.paramMap.get('id'));

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

      this.anecdateService.getComments(this.currentAnecdate.id).subscribe(comments => {this.comments = comments; console.log("com",comments)});

      this.sources = this.currentAnecdate.sources.split(" ");

      this.show = this.currentAnecdate != null ? true : false;
    })
  }

}
