import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anecdate',
  templateUrl: './anecdate.component.html',
  styleUrls: ['./anecdate.component.css']
})
export class AnecdateComponent implements OnInit {

  date = "28 novembre";

  constructor() { }

  ngOnInit(): void {
  }

}
