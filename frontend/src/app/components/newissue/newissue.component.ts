import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IssuesService } from '../../services/issues.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';


@Component({
  selector: 'app-newissue',
  templateUrl: './newissue.component.html',
  styleUrls: ['./newissue.component.css']
})

export class NewissueComponent implements OnInit {

  btProjects = [];
  btTypes = [];
  btSeverity = [];
  btUsers = [];
  btReport = {
    isValid: false,
    project: null,
    type: null,
    severity: null,
    title: null,
    description: null,
    tags: null,
    username: null,
  }

  constructor(private issuesService: IssuesService,
    private router: Router,
    private validateService: ValidateService) {
    this.readProjects();
    this.readTypes();
    this.readSeverity();
    this.readUsers();
  }

  ngOnInit() {
  }

  readProjects() {
    this.btProjects.length = 0;
    this.issuesService.getProjects().subscribe(
      Data => {
        if (Data.success === true) {
          for (let i = 0; i < Data.projects.length; i++) {
            this.btProjects.push(
              { id: Data.projects[i].project_id, name: Data.projects[i].project_name }
            );
          }
        }

      }
    );

  }

  readTypes() {
    this.btTypes.length = 0;
    this.issuesService.getTypes().subscribe(
      Data => {
        if (Data.success === true) {
          for (let i = 0; i < Data.types.length; i++) {
            this.btTypes.push(
              { id: Data.types[i].type_id, name: Data.types[i].type_name }
            );
          }
        }
      }
    );
  }

  readSeverity() {
    this.btSeverity.length = 0;
    this.issuesService.getSeverity().subscribe(
      Data => {
        if (Data.success === true) {
          for (let i = 0; i < Data.severity.length; i++) {
            this.btSeverity.push(
              { id: Data.severity[i].severity_id, name: Data.severity[i].severity_name }
            );
          }
        }
      }
    );
  }

  readUsers() {
    this.btUsers.length = 0;
    this.issuesService.getUsers().subscribe(
      Data => {
        if (Data.success === true) {
          for (let i = 0; i < Data.users.length; i++) {
            this.btUsers.push(
              { id: Data.users[i].user_id, name: Data.users[i].user_name }
            );
          }
        }
      }
    );
  }

  onCancelClick() {
    this.router.navigate(['/issues']);
  }

  onSubmitClick() {
    this.saveReport();
  }

  validateReport() {
    this.btReport.isValid = this.validateService.validateNewReport(this.btReport);
  }

  onProjectChanged(value) {
    this.btReport.project = value;
    this.validateReport();
  }

  onTypeChanged(value) {
    this.btReport.type = value;
    this.validateReport();
  }

  onSeverityChanged(value) {
    this.btReport.severity = value;
    this.validateReport();
  }

  onTitleChanged(value) {
    this.btReport.title = value;
    this.validateReport();
  }

  onDescChanged(value) {
    this.btReport.description = value;
    this.validateReport();
  }

  onTagsChanged(value) {
    this.btReport.tags = value;
  }

  saveReport() {
    const json = JSON.parse(localStorage.getItem('user'));
    this.btReport.username = json.username;
    this.issuesService.saveReport(this.btReport).subscribe(
      Data => {
        if (Data.success === true) {
          this.router.navigate(['/createconfirm'], {queryParams: {report_id: Data.report_id}});
        }
      }
    );


  }

} // end of component.
