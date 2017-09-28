import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { IssuesTablePage } from '../src/issues_table_page';
import { IssuesPagedData } from '../src/issues_table_pagedata';
import { IssuesTableRecord } from '../src/issues_table_entry';
import { Observable } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
const config = require('../../../../configs/db');

@Injectable()
export class IssuesService {

  isDev: boolean;

  constructor(private http: Http) {
    this.isDev = config.isDev;
  }

  prepEndpoint(ep) {
    if (this.isDev) {
      return config.backendHost + ep;
    } else {
      return ep; // 'https://localhost:8080/' + ep;
    }
  }

  public getIssuesByPage(page: IssuesTablePage): any {
    const ep = this.prepEndpoint('issues/getpage');
    return this.http.post(ep, page).map(response => response.json());
  }

  public getProjects(): any {
    const ep = this.prepEndpoint('issues/getprojects');
    return this.http.get(ep).map(response => response.json());
  }

  public getTypes(): any {
    const ep = this.prepEndpoint('issues/gettypes');
    return this.http.get(ep).map(response => response.json());
  }

  public getSeverity(): any {
    const ep = this.prepEndpoint('issues/getseverity');
    return this.http.get(ep).map(response => response.json());
  }

  public getUsers(): any {
    const ep = this.prepEndpoint('issues/getusers');
    return this.http.get(ep).map(response => response.json());
  }

  public getStates(): any {
    const ep = this.prepEndpoint('issues/getstates');
    return this.http.get(ep).map(response => response.json());
  }

  public saveReport(report): any {
    const ep = this.prepEndpoint('issues/savereport');
    return this.http.post(ep, report).map(response => response.json());
  }

  public getReport(report_id): any {
    const ep = this.prepEndpoint('issues/getreport');
    return this.http.post(ep, {report_id: report_id}).map(response => response.json());
  }

  public updateReport(report): any {
    const ep = this.prepEndpoint('issues/updatereport');
    return this.http.post(ep, report).map(response => response.json());
  }

  public reportExists(report_id): any {
    const ep = this.prepEndpoint('issues/reportexists');
    return this.http.post(ep, {report_id: report_id}).map(response => response.json());
  }

  public deleteReport(report_id): any {
    const ep = this.prepEndpoint('issues/deletereport');
    return this.http.post(ep, {report_id: report_id}).map(response => response.json());
  }


}
