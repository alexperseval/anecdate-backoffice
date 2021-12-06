import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Anecdate } from '../anecdate';
import { DatePipe } from '@angular/common';
import { AnecdateService } from '../anecdate.service';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-anecdate-list',
  templateUrl: './anecdate-list.component.html',
  styleUrls: ['./anecdate-list.component.css']
})
export class AnecdateListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'category', 'idAuthor', 'date', 'like', 'dislikes', 'link'];
  dataSource!: MatTableDataSource<Anecdate>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  anecdates: Anecdate[] = [];

  datepipe = new DatePipe("fr-FR")

  constructor(private anecdateService: AnecdateService, private userService: UsersService) {
  }

  ngOnInit() {
    this.anecdateService.getAll().subscribe(anecdates => {
      this.anecdates = anecdates;
      this.anecdates.forEach(anec => {
        this.anecdateService.getCategory(anec.idCategory).subscribe(cat => {
          anec.category = cat.name;
        })
        this.userService.get(anec.idAuthor).subscribe(user => {
          anec.idAuthor = user.pseudo;
        })
        let d = this.datepipe.transform(anec.date, "d MMMM y");
        anec.date = d || new Date("d MMMM y").toString();
      });

      this.dataSource = new MatTableDataSource(this.anecdates);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
