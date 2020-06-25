import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'fs-tabelas-impostos',
  templateUrl: './tabelas-impostos.component.html',
  styleUrls: ['./tabelas-impostos.component.css']
})
export class TabelasImpostosComponent implements OnInit {

  public title: string;
  route$ = new Observable();
  constructor(private route: ActivatedRoute) {
    this.route$ = this.route.paramMap
      .pipe(switchMap((params: ParamMap) => params.getAll('id')));
  }

  ngOnInit(): void {
    this.route$.subscribe(param => this.title = param.toString());
  }
}
