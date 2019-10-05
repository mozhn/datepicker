# Datepicker

Multiple datepicker for Angular.

## Installation

Use the package manager [npm](https://www.npmjs.com/package/@mozhn/datepicker) to install foobar.

```bash
npm install  angular-datepicker --save
```

## Usage

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { AppComponent } from './app.component';

import { DatepickerModule } from '@mozhn/datepicker';

registerLocaleData(localeTr, 'tr');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DatepickerModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'tr' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
```
Select language after including module.

```typescript
import { Component, ViewChild } from '@angular/core';
import { DatepickerComponent } from '@mozhn/datepicker';

type DataType = 'time' | 'string' | 'date';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild(DatepickerComponent, {
    static: true
  }) datepicker: DatepickerComponent;

  public readonly type: DataType = 'string'

  dateList = [
    new Date('2019-10-01'),
    new Date('2019-10-02'),
    new Date('2019-10-23')
  ];

  timeList = [
    1569888000000,
    1570492800000
  ]

  stringList = ['2019-10-01','2019-10-02','2019-10-08'];

  openCalendar() {
    this.datepicker.status = !this.datepicker.status;
  }
}
```

```typescript
<button (click)="openCalendar()">Open Calendar</button>
<ul>
  <li *ngFor="let item of stringList">
    {{item}}
  </li>
  <li *ngFor="let item of timeList">
    {{item}}
  </li>
</ul>

<datepicker #datepicker [(value)]="stringList" [dataType]="type">
</datepicker>
```
There are 3 data types. These date object, time and string.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
