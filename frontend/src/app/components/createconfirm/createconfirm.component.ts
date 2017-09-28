import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidateService } from "../../services/validate.service";

@Component({
  selector: 'app-createconfirm',
  templateUrl: './createconfirm.component.html',
  styleUrls: ['./createconfirm.component.css']
})
export class CreateconfirmComponent implements OnInit {

  queryParams: any;
  report_id: null;

  constructor( 
    public  authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private validateService: ValidateService) { }

  ngOnInit() {
    this.queryParams = this.activatedRoute.snapshot.queryParams;
    this.report_id = this.queryParams['report_id'];
  }

  onBackClick() {
    this.router.navigate(['/issues']);
  }

  onCreateClick() {
    this.router.navigate(['/newissue']);
  }

  onViewClick() {
    if( this.validateService.isStringEmpty(this.report_id) === true ) {
      this.router.navigate(['/issues']);
    } else {
      this.router.navigate(['/viewissue'], {queryParams: { report_id: this.report_id }});
    }
  }

}
