import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (!user.username || !user.password) {
      return false;
    } else {
      if (user.username.length === 0 || user.password.length === 0) {
        return false;
      }
    }
    return true;
  }

  isStringEmpty(str) {
    if ( str === null ) return true;
    if ( str.length === 0 ) return true;
    return false;
  }

  validateNewReport(report) {
    if ( this.isStringEmpty( report.project ) ) return false;
    if ( this.isStringEmpty( report.type ) ) return false;
    if ( this.isStringEmpty( report.severity ) ) return false;
    if ( this.isStringEmpty( report.title ) ) return false;
    if ( this.isStringEmpty( report.description ) ) return false;
    return true;
  }

    validateExistingReport(report) {
      if ( this.isStringEmpty( report.issue_project ) ) return false;
      if ( this.isStringEmpty( report.issue_author ) ) return false;
      if ( this.isStringEmpty( report.issue_title ) ) return false;
      if ( this.isStringEmpty( report.issue_description ) ) return false;
      if ( this.isStringEmpty( report.issue_type ) ) return false;
      if ( this.isStringEmpty( report.issue_severity ) ) return false;
      if ( this.isStringEmpty( report.issue_status ) ) return false;
      return true;
    }

}
