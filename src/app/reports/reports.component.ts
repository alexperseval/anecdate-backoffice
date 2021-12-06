import { Component, OnInit } from '@angular/core';
import { Report } from './report';
import { ReportService } from './report.service';
import { DatePipe } from '@angular/common';
import { UsersService } from '../users/users.service';
import { AnecdateService } from '../anecdate/anecdate.service';
import { Anecdate } from '../anecdate/anecdate';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports: Report[] = [];

  currentReport: Report = this.reports[0];
  currentAnecdate!: Anecdate;
  currentNbAnec: number = 0;
  currentNbComm: number = 0;

  datepipe = new DatePipe("fr-FR");

  constructor(private reportService: ReportService, 
    private userService: UsersService, 
    private anecdateService: AnecdateService,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.reportService.getAll().subscribe(res => {
      this.reports = res.filter(rep => rep.status == "active");
      this.reports.forEach(report => {
        this.userService.get(report.idAuthor).subscribe(res => report.idAuthor = res.pseudo);
        this.anecdateService.get(report.idAnecdate).subscribe(res => report.anecdate = res.title);
        this.userService.getComments(Number(report.idAuthor)).subscribe(nb => report.nbCom = nb.length);
        this.userService.getAnecdates(Number(report.idAuthor)).subscribe(nb => report.nbAnec = nb.length);

        let d = this.datepipe.transform(report.date, "dd/MM/y");
        report.date = d || new Date("d MMMM y").toString();
      })

      if (this.reports.length > 0) {
        this.select(this.reports[0])
      }
    })
  }

  select(report: Report) {
    this.currentReport = report;
    this.anecdateService.get(this.currentReport.idAnecdate).subscribe(res => this.currentAnecdate = res);
  }

  disable(report: Report) {
    this.anecdateService.deleteAnecdate(report.idAnecdate).subscribe(res => {
      if (res == "OK") {
        this.delete(report, "Anecdate désactivée");
      }
    })
  }

  delete(report: Report, mess: string) {
    this.reportService.updateReport(report.id, "treated").subscribe(res => {
      if(res == "OK") {
        this.reports = this.reports.filter(rep => rep !== report);
        this.select(this.reports[0]);
        this._snackBar.open(mess, "Fermer", {
          duration: 3000
        });
      }
    })
  }
}
