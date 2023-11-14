import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css'],
})
export class NewEventFormComponent implements OnInit {
  @Input() eventTitle: string = '';
  @Input() eventDate: string = '';
  @Input() eventLength: string = '';
  @Input() eventTime: string = '';

  public mode = 'Add'; //default mode
  private id: any; //event ID
  private event: any;

  // Define calendar variables
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(
    private _myService: EventService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'Edit'; /*request had a parameter _id */
        this.id = paramMap.get('_id');

        //request event info based on the id
        this._myService.getEvent(this.id).subscribe(
          (data) => {
            //read data and assign to private variable event
            this.event = data;

            //notice that this is done through the two-way bindings
            this.eventTitle = this.event.eventTitle;
            this.eventDate = this.event.eventDate;
            this.eventLength = this.event.eventLength;
            this.eventTime = this.event.eventTime;
          },
          (err) => console.error(err),
          () => console.log('finished loading')
        );
      } else {
        this.mode = 'Add';
        this.id = null;
      }
    });
  }

  onSubmit() {
    console.log(
      'You submitted: ' +
        this.eventTitle +
        ' ' +
        this.eventDate +
        this.eventLength +
        ' ' +
        this.eventTime +
        ' '
    );

    // Add the event to the calendar
    const newEvent: CalendarEvent = {
      title: this.eventTitle,
      start: new Date(this.eventDate),
      end: new Date(this.eventDate),
      meta: {
        length: this.eventLength,
        time: this.eventTime,
      },
    };
    this.events.push(newEvent);

    if (this.mode == 'Add')
      this._myService.addEvents(
        this.eventTitle,
        this.eventDate,
        this.eventLength,
        this.eventTime
      );
    if (this.mode == 'Edit')
      this._myService.updateEvent(
        this.id,
        this.eventTitle,
        this.eventDate,
        this.eventLength,
        this.eventTime
      );
    this.router.navigate(['/listEvents']);
  }
  handleCalendarClick(event: any): void {
    // You can access the clicked date from the event object
    const clickedDate: Date = event.day.date;

    // Handle the click event as needed
    console.log('Clicked date:', clickedDate);
  }
}
