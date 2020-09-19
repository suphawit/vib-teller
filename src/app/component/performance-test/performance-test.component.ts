import { Component, OnInit } from '@angular/core';
import { LogService } from '../../_service/log.service';

@Component({
  selector: 'vib-performance-test',
  templateUrl: './performance-test.component.html',
  styleUrls: ['./performance-test.component.sass']
})
export class PerformanceTestComponent implements OnInit {
  public logList = [];
  t;
  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logList = this.logService.log;
  }

}
