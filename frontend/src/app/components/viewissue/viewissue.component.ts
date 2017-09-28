import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-viewissue',
  templateUrl: './viewissue.component.html',
  styleUrls: ['./viewissue.component.css']
})
export class ViewissueComponent implements OnInit {

  queryParams: any;
  reportID: null;

  btProjects = [];
  btTypes = [];
  btSeverity = [];
  btUsers = [];
  btStates = [];

  btReport = {
    // report_id: undefined,
    isValid: false,
    issue_project: '',
    issue_author: '',
    issue_title: '',
    issue_description: '',
    issue_feedback: '',
    issue_type: '',
    issue_severity: '',
    issue_status: '',
    issue_assigned: '',
    issue_tags: '',
  };

  constructor(
    private issuesService: IssuesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private validateService: ValidateService
  ) {}

  ngOnInit() {
    this.queryParams = this.activatedRoute.snapshot.queryParams;
    this.reportID = this.queryParams['report_id'];
    // console.log(this.reportID);
    this.getReport(this.reportID);
    // this.btReport.report_id = this.queryParams["report_id"];
    this.readProjects();
    this.readTypes();
    this.readSeverity();
    this.readUsers();
    this.readStates();
  }

  readProjects() {
    this.btProjects.length = 0;
    this.issuesService.getProjects().subscribe(Data => {
      if ((Data.success = true)) {
        for (let i = 0; i < Data.projects.length; i++) {
          this.btProjects.push({
            id: Data.projects[i].project_id,
            name: Data.projects[i].project_name
          });
        }
      }
    });
  }

  readTypes() {
    this.btTypes.length = 0;
    this.issuesService.getTypes().subscribe(Data => {
      if ((Data.success = true)) {
        for (let i = 0; i < Data.types.length; i++) {
          this.btTypes.push({
            id: Data.types[i].type_id,
            name: Data.types[i].type_name
          });
        }
      }
    });
  }

  readSeverity() {
    this.btSeverity.length = 0;
    this.issuesService.getSeverity().subscribe(Data => {
      if ((Data.success = true)) {
        for (let i = 0; i < Data.severity.length; i++) {
          this.btSeverity.push({
            id: Data.severity[i].severity_id,
            name: Data.severity[i].severity_name
          });
        }
      }
    });
  }

  readStates() {
    this.btStates.length = 0;
    this.issuesService.getStates().subscribe(Data => {
      // console.log("States: ", Data);
      if ((Data.success = true)) {
        for (let i = 0; i < Data.states.length; i++) {
          this.btStates.push({
            id: Data.states[i].state_id,
            name: Data.states[i].status_name
          });
        }
      }
    });
  }

  readUsers() {
    this.btUsers.length = 0;
    this.issuesService.getUsers().subscribe(Data => {
      if ((Data.success = true)) {
        for (let i = 0; i < Data.users.length; i++) {
          this.btUsers.push({
            id: Data.users[i].user_id,
            name: Data.users[i].user_name
          });
        }
      }
    });
  }

  getReport(report_id) {
    this.issuesService.getReport(report_id).subscribe(Data => {
      this.btReport = Data.report;
      this.btReport.isValid = false;
      // console.log('getReport: ', Data);
    });
  }

  validateReport() {
    this.btReport.isValid = this.validateService.validateExistingReport( this.btReport );
    // console.log("Valid: ", this.btReport.isValid);
  }

  onTitleChanged(value) {
    this.btReport.issue_title = value;
    this.validateReport();
  }

  onProjectChanged(value) {
    this.btReport.issue_project = value;
    this.validateReport();
  }

  onStatusChanged( value ) {
    this.btReport.issue_status = value;
    this.validateReport();
  }

  onAssignedChanged( value ) {
    this.btReport.issue_assigned = value;
    this.validateReport();
  }

  onAuthorChanged( value ) {
    this.btReport.issue_author = value;
    this.validateReport();
  }

  onTypeChanged( value ) {
    this.btReport.issue_type = value;
    this.validateReport();
  }

  onSeverityChanged( value ) {
    this.btReport.issue_severity = value;
    this.validateReport();
  }

  onTagsChanged( value ) {
    this.btReport.issue_tags = value;
    this.validateReport();
  }

  onDescChanged( value ) {
    this.btReport.issue_description = value;
    this.validateReport();
  }

  onFeedbackChanged( value ) {
    this.btReport.issue_feedback = value;
    this.validateReport();
  }

  onDeleteClick() {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rapport?')) {
      this.issuesService.deleteReport(this.btReport).subscribe(
        Data => {
          if (Data.success === true) {
            this.router.navigate(['/issues']);
          }
        }
      );
    }
  }

  onCancelClick() {
    this.router.navigate(['/issues']);
  }

  onSubmitClick() {
    this.issuesService.updateReport(this.btReport).subscribe(
      Data => {
        if (Data.success === true) {
          this.router.navigate(['/updateconfirm'], {queryParams: {report_id: this.reportID}});
        }
      }
    );
  }

}
