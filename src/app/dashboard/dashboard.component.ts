import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  symptomsDict: any = {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      symptoms: [null, [Validators.required, Validators.pattern("[a-z\,]")]],
      location: [null, [Validators.required, Validators.pattern("[a-z]")]],
    });
  }
  form: FormGroup;
  public barChartLabels: any[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true
      }
    }
  };
  ngOnInit(): void {
    /* this.barChartLabels = ['bangalore', 'mumbai', 'delhi'];
    this.barChartData = [
      { data: [1, 2, 3], label: 'cough' },
      { data: [6, 5, 10], label: 'fever' }
    ] */
  }

  showChart(form: FormGroup) {
    this.barChartData = [];
    this.barChartLabels = [];
    this.prepareSymptomsData(form);
    const citiesLabel = new Set();
    Object.keys(this.symptomsDict).forEach((symptom) => {
      const data: number[] = [];
      Object.entries(this.symptomsDict[symptom]).forEach((sympLoc) => {
        data.push(Number.parseInt(sympLoc[1] + ''));
        citiesLabel.add(sympLoc[0]);
      });
      this.barChartData.push({ data, label: symptom });
    });
    this.barChartLabels = Array.from(citiesLabel);
  }

  prepareSymptomsData(form: FormGroup) {
    const location: string = form.value.location;
    if (form.value.location == undefined) return;
    let symptoms: string[] = form.value.symptoms.split(',');
    symptoms = symptoms.map(symptom => symptom.trim());
    for (const symptom of symptoms) {
      if (!(symptom in this.symptomsDict)) this.symptomsDict[symptom] = {}
      const symptomLocationDict = this.symptomsDict[symptom];
      if (!(location in symptomLocationDict)) symptomLocationDict[location] = 0;
      symptomLocationDict[location] += 1;
    }
    this.symptomsDict;
  }
}

