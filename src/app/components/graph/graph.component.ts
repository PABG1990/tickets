import { Component, Input } from '@angular/core';

import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  standalone: true,
  imports: [
    HighchartsChartModule,
  ]
})
export class GraphComponent {

  Highcharts = Highcharts;
  @Input() graphOptions: any = {};

}
