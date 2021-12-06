import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from './users.service';
import { User } from '../anecdate/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Anecdate } from '../anecdate/anecdate';
import { Comment } from '../anecdate/comment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'pseudo', 'mail', 'role'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  users: User[] = [];

  userSelected!: User;
  userComments : Comment[] = [];
  userAnecdates : Anecdate[] = [];

  userForm!: FormGroup;
  
  datepipe = new DatePipe("fr-FR");

  constructor(private usersService: UsersService) {
    
  }

  ngOnInit() {
    this.usersService.getAll().subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
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

  select(row: User) {
    this.userSelected = row;
    this.userForm = new FormGroup({
      userPseudo: new FormControl(row.pseudo,Validators.required),
      userMail: new FormControl(row.mail,Validators.required),
      userAdmin: new FormControl(row.role==1),
    });
    this.getComments(row);
    this.getAnecdates(row);
  }

  saveUser(user: User) {
    this.usersService.updateUser(user.id, this.userForm.value.userPseudo, this.userForm.value.userMail, this.userForm.value.userAdmin).subscribe(res => {
      if (res== "OK") {
        let index = this.users.indexOf(user);
        user.pseudo = this.userForm.value.userPseudo;
        user.mail = this.userForm.value.userMail;
        user.role = this.userForm.value.userAdmin == true ? 1 : 2;
        this.users[index] = user;
      }
    })
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(user.id).subscribe(res => {
      if (res== "OK") {
        let index = this.users.indexOf(user);
        user.status = "inactive";
        this.users[index] = user;
      }
    })
  }

  activateUser(user: User) {
    this.usersService.activateUser(user.id).subscribe(res => {
      if (res== "OK") {
        let index = this.users.indexOf(user);
        user.status = "active";
        this.users[index] = user;
      }
    })
  }

  getComments(user: User) {
    this.usersService.getComments(user.id).subscribe(res => {
      this.userComments = res.filter(c => c.status == "active");
      this.userComments.forEach(com => {
        let d = this.datepipe.transform(com.date, "d MMMM y");
        com.date = d || new Date("d MMMM y").toString();
      });
      }
    )
  }

  getAnecdates(user: User) {
    this.usersService.getAnecdates(user.id).subscribe(res => {
      this.userAnecdates = res.filter(c => c.status == "active");
      this.userAnecdates.forEach(anec => {
        let d = this.datepipe.transform(anec.date, "d MMMM y");
        anec.date = d || new Date("d MMMM y").toString();
      });
      }
    )
  }

}
