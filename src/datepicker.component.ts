import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Day } from './models/day.model';

const htmlTemplate = `
<div class="multiple-datepicker-modal-main" [ngClass]="!status ? 'close-calendar' : ''">
<div class="modal-body">
  <div class="calendar-main">
    <div class="calendar-container">
      <div class="calendar-header">
        <div class="control-panel">
          <button class="calendar-button">
            {{ now | date: 'MMMM y' | uppercase }}
          </button>
          <div class="spacer"></div>
          <button class="calendar-button step-button previous" (click)="previous()">
          </button>
          <button class="calendar-button step-button next" (click)="next()">
          </button>
        </div>
      </div>
      <div class="calendar-content">
        <table>
          <thead>
            <tr>
              <th>P</th>
              <th>P</th>
              <th>S</th>
              <th>Ç</th>
              <th>P</th>
              <th>C</th>
              <th>C</th>
            </tr>
            <tr>
              <th colspan="7" class="divider"></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of dayList; let rowIndex = index">
              <td class="calendar-day" (click)="selectDay(rowIndex, dayIndex)"
                *ngFor="let day of row; let dayIndex = index">
                <div class="day"
                  [ngClass]="[
                    day.was_selected ? 'selected' : '',
                    day.date === currentDate ? 'today' : ''
                  ]"
                  [ngStyle]="{
                    color: !day.this_is_month ? 'rgba(0,0,0,.38)': 'rgba(0, 0, 0, 0.87)'
                  }">{{ day.number_of_days }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<div class="modal-background" (click)="status = false"></div>
</div>
`;

const cssTemplate = `
.close-calendar {
  display: none !important;
}

.multiple-datepicker-modal-main .modal-background {
  opacity: 1;
  background: rgba(0, 0, 0, 0.32);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.multiple-datepicker-modal-main .modal-body {
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  z-index: 1001;
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.multiple-datepicker-modal-main .modal-body .calendar-main {
  max-width: 80vw;
  pointer-events: auto;
  position: static;
  box-sizing: border-box;
  display: flex;
  max-height: 100%;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container {
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14),
  0 9px 46px 8px rgba(0, 0, 0, 0.12);
  background: #fff;
  display: block;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: auto;
  outline: 0;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
  transform: none;
  color: rgba(0, 0, 0, 0.87);
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-header {
  padding: 28px 20px 0 20px;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-header .control-panel {
  display: flex;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-header .control-panel .calendar-button {
  font-family: Roboto, "Helvetica Neue", sans-serif;
  cursor: pointer;
  outline: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  padding: 0 16px;
  line-height: 36px;
  border: unset;
  background-color: unset;
  font-weight: 500;
  font-size: 14px;
  transition: background 0.8s;
  border-radius: 4px;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-header .control-panel .calendar-button:active {
  background-color: rgb(221, 221, 221);
  background-size: 100%;
  transition: background 0s;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-header .control-panel .spacer {
  flex: 1 1 auto;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-header .control-panel .step-button {
  width: 40px;
  position: relative;
  height: 40px;
  flex-shrink: 0;
  line-height: 40px;
  padding: 0;
  color: rgba(0, 0, 0, 0.54);
  border-radius: 50%;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-header .control-panel .step-button::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  content: "";
  margin: 15.5px;
  border: 0 solid currentColor;
  border-top-width: 2px;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-header .control-panel .previous::after {
  border-left-width: 2px !important;
  transform: translateX(2px) rotate(-45deg);
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-header .control-panel .next::after {
  border-right-width: 2px;
  transform: translateX(-2px) rotate(45deg);
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-content {
  outline: 0;
  padding: 24px 8px 8px 8px;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-content table {
  width: 100%;
  border-collapse: collapse;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-content table th {
  font-weight: 400;
  font-family: Roboto, "Helvetica Neue", sans-serif;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.38);
  padding: 0 0 8px 0;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-content table .divider {
  text-align: center;
  padding: 0 0 8px 0;
  height: 1px;
  position: relative;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-content table .divider::after {
  content: "";
  position: absolute;
  top: 0;
  left: -6px;
  right: -6px;
  height: 1px;
  background: rgba(0, 0, 0, 0.12);
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-content table .calendar-day {
  width: 14.2857%;
  padding-top: 7.14286%;
  padding-bottom: 7.14286%;
  position: relative;
  height: 0;
  line-height: 0;
  text-align: center;
  outline: 0;
  cursor: pointer;
  font-family: Roboto, "Helvetica Neue", sans-serif;
  font-size: 13px;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -ms-user-select: none;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-content table .calendar-day .day {
  position: absolute;
  top: 5%;
  left: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 90%;
  height: 90%;
  line-height: 1;
  border-width: 1px;
  border-style: solid;
  border-radius: 999px;
  color: rgba(0, 0, 0, 0.87);
  border-color: transparent;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-content table .calendar-day .day:hover {
  background-color: rgb(221, 221, 221);
  background-size: 100%;
  transition: background 0s;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-content table .calendar-day .day.selected {
  background-color: #3f51b5;
  color: #fff !important;
}

.multiple-datepicker-modal-main .modal-body .calendar-main .calendar-container .calendar-content table .calendar-day .day.today {
  border-color: rgba(0, 0, 0, 0.38);
}

@media all and (orientation: landscape) {
  .multiple-datepicker-modal-main .calendar-main {
    width: 64vh;
    height: 80vh;
  }
}

@media all and (orientation: portrait) {
  .multiple-datepicker-modal-main .calendar-main {
    width: 80vw;
    height: 100vw;
  }
}
`;

type DataType = 'time' | 'string' | 'date';

@Component({
  selector: 'datepicker',
  template: htmlTemplate,
  styles: [cssTemplate],
})
export class DatepickerComponent implements OnInit {
  private currentDate: string;
  private selectedDays: string[] = [];

  /**
   * Calendar view status.
   */
  public status: boolean;
  public now: Date;
  public dayList: Array<Array<Day>>;

  @Input()
  private value: any[];

  @Input()
  private dataType: DataType;

  @Output()
  private valueChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.value) {
      this.initializeCalendar();
    }

    this.now = new Date();
    this.currentDate = this.dateFormatter(
      this.now.getFullYear(),
      this.now.getMonth() + 1,
      this.now.getDate(),
    );

    this.redesignCalendar();
  }

  /**
   * Changes active month to previous month.
   */
  public previous(): void {
    this.now = new Date(this.now.setMonth(
      this.now.getMonth() - 1
    ));

    this.redesignCalendar();
  }

  /**
   * Changes active month to next month.
   */
  public next(): void {
    this.now = new Date(this.now.setMonth(
      this.now.getMonth() + 1
    ));

    this.redesignCalendar();
  }

  private selectDay(rowIndex: number, dayIndex: number): void {
    const day: Day = this.dayList[rowIndex][dayIndex];
    const status: boolean = this.selectedDays.some(
      (value) => value === day.date
    );

    if (status) {
      this.dayList[rowIndex][dayIndex].was_selected = false;
      this.selectedDays.splice(
        this.selectedDays.findIndex((value) => value === day.date), 1
      );
    } else {
      this.selectedDays.push(day.date);
      this.dayList[rowIndex][dayIndex].was_selected = true;
    }

    this.value = [];
    this.selectedDays.forEach((day) => {
      if (this.dataType === 'date') {
        this.value.push(new Date(day));
      } else if (this.dataType === 'time') {
        this.value.push(new Date(day).getTime());
      } else if (this.dataType === 'string') {
        this.value.push(day);
      }
    });

    this.valueChange.emit(this.value);
  }

  private initializeCalendar(): void {
    if (this.dataType === 'date') {
      this.value.forEach((date: Date) => {
        this.selectedDays.push(
          this.dateFormatter(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          )
        );
      });
    } else if (this.dataType === 'time') {
      this.value.forEach((time) => {
        const date = new Date(time);

        this.selectedDays.push(
          this.dateFormatter(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          )
        );
      });
    } else if (this.dataType === 'string') {
      this.selectedDays = this.value;
    }
  }

  private dateFormatter(year: number, month: number, date: number): string {
    return `${year}-${
      this.convertToTwoDigit(month)
      }-${
      this.convertToTwoDigit(date)
      }`;
  }

  private convertToTwoDigit(value: number): string {
    return ('0' + value).slice(-2);
  }

  private createDay(dayNumber: number, monthStatus: boolean, month: number): Day {
    const editedDate: string = this.dateFormatter(
      this.now.getFullYear(),
      this.now.getMonth() + month,
      dayNumber
    );

    const day: Day = {
      number_of_days: dayNumber,
      this_is_month: monthStatus,
      was_selected: this.selectedDays.some((value) => value === editedDate),
      date: editedDate,
    };

    return day;
  }

  private redesignCalendar(): void {
    this.dayList = [];
    const days: Day[] = [];

    const dayLength: number = new Date(
      this.now.getFullYear(),
      this.now.getMonth() + 1,
      0
    ).getDate();

    const monthStartDay: number = new Date(
      this.now.setDate(1)
    ).getDay();
    let prevMonthDayLength: number = new Date(
      this.now.getFullYear(),
      this.now.getMonth(),
      0
    ).getDate() - monthStartDay + 1;

    for (let i = 0; i < monthStartDay; i++) {
      days.push(this.createDay(prevMonthDayLength++, false, 0));
    }

    for (let i = 1; i <= dayLength; i++) {
      days.push(this.createDay(i, true, 1));
    }

    const missingDay: number = 7 - (days.length % 7);
    for (let i = 1; i <= missingDay && (days.length % 7 !== 0); i++) {
      days.push(this.createDay(i, false, 2));
    }

    let temporaryDays = [];
    for (let i = 0; i <= days.length; i++) {
      if (i % 7 !== 0 || i === 0) {
        temporaryDays.push(days[i]);
      } else {
        this.dayList[this.dayList.length] = temporaryDays;
        temporaryDays = [];

        temporaryDays.push(days[i]);
      }
    }
  }
}
