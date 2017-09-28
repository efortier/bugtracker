import { Component, EventEmitter, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IssuesTablePage } from '../../src/issues_table_page';
import { IssuesPagedData } from '../../src/issues_table_pagedata';
import { IssuesTableRecord } from '../../src/issues_table_entry';
import { Observable } from 'rxjs/Rx';
import { IssuesService } from '../../services/issues.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})

export class IssuesComponent implements OnInit {

  page = new IssuesTablePage();
  rows = new Array<IssuesTableRecord>();

  ngx_columns = [
    { name: 'Titre du problème', prop: 'issue_title', flexGrow: 50, minWidth: 50, resizeable: false, draggable: false, sortable: false, },
    //{ name: 'Actions', prop: 'issue_action', width:64, maxWidth:64, resizeable: false, draggable: false, sortable: false, },
    { name: 'Projet', prop: 'issue_project', width: 120, minWidth: 120, maxWidth: 120, resizeable: false,  draggable: false, sortable: false,},
    { name: 'Type', prop: 'issue_type', width: 120, minWidth: 120, maxWidth: 120, resizeable: false,  draggable: false, sortable: false,},
    { name: 'Gravité', prop: 'issue_severity', width: 80, minWidth: 80, maxWidth: 80, resizeable: false,  draggable: false, sortable: false,},
    { name: 'État', prop: 'issue_status', width: 120, minWidth: 120, maxWidth: 120, resizeable: false,  draggable: false, sortable: false,},
    { name: 'Date création', prop: 'issue_date', width: 180, minWidth: 110, maxWidth: 180, resizeable: false,  draggable: false, sortable: false,},
  ];

  ngx_sorts = []; //[{prop: 'issue_date', dir: 'desc'}];

  loadingIndicator = false;
  selected = [];

  public constructor(private issuesService: IssuesService, private router: Router) {
    // this.temp = this.ngx_rows;
    this.page.pageNumber = 0;
    this.page.pageSize = 15;
  }

  public ngOnInit(): void {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.loadingIndicator = true;

    const pagedData = new IssuesPagedData<IssuesTableRecord>();

    // console.log( 'Service data: sending request.' );
    this.issuesService.getIssuesByPage(this.page).subscribe(
      Data => {

        this.page.totalElements = Data.totalElements;
        this.page.totalPages = this.page.totalElements / this.page.pageSize;

        // console.log('page: ', Data);

        const newrows = new Array<IssuesTableRecord>();

        var datePipe = new DatePipe("fr-CA");
        for (let i = 0; i < Data.issues.length; i++) {

          const e = new IssuesTableRecord();
          e.issue_id = Data.issues[i]._id,
          e.issue_author = Data.issues[i].issue_author,
          e.issue_title = Data.issues[i].issue_title,
          e.issue_description = Data.issues[i]._id;
          e.issue_assignee = Data.issues[i].issue_assignee;

          const date = datePipe.transform(this.dateFromObjectId(Data.issues[i]._id), 'yMMMdjms');
          e.issue_date = date.toString();

          e.issue_feedback = Data.issues[i].issue_feedback;
          e.issue_priority = Data.issues[i].issue_priority;
          e.issue_project = Data.issues[i].issue_project;
          e.issue_severity = Data.issues[i].issue_severity;
          e.issue_status = Data.issues[i].issue_status;
          e.issue_tags = Data.issues[i].issue_tags;
          e.issue_type = Data.issues[i].issue_type;

          //e.issue_action = '<i class="glyphicon glyphicon-trash" (click)="Alert(row)" id="DELETE"></i>'
          
          newrows.push(e);
        }

        this.rows = newrows;

      });

      this.loadingIndicator = false;

  }

  objectIdFromDate(date) {
    return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
  };
  
  dateFromObjectId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  };

  onActivate(event) {
    if( event.type === 'click' ) {
      if( event.cellIndex === 0 ) {
        this.issuesService.reportExists( event.row.issue_id ).subscribe( Data => {
          if( Data.success === true ) {
            this.router.navigate(['/viewissue'], {queryParams: { report_id: event.row.issue_id }});  
            }else{

            }
        });
      } 
    }
  }  

  updateTitleFilter(value) {
    this.page.titleFilter = value;    
    this.setPage({ offset: 0 });
  }
    
  updateProjectFilter(value) {
    this.page.projectFilter = value;    
    this.setPage({ offset: 0 });
  }

  updateTypeFilter(value) {
    this.page.typeFilter = value;    
    this.setPage({ offset: 0 });
  }
    
  updateSeverityFilter(value) {
    this.page.severityFilter = value;    
    this.setPage({ offset: 0 });
  }
    
  updateStatusFilter(value) {
    this.page.statusFilter = value;    
    this.setPage({ offset: 0 });
  }

  onResetClick() {
    this.page.titleFilter = '';
    this.page.projectFilter = '';
    this.page.typeFilter = '';
    this.page.severityFilter = '';
    this.page.statusFilter = '';
    this.setPage({ offset: 0 });
  }

}
