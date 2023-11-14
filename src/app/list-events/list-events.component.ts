import { Component } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css'],
})
export class ListEventsComponent {
  //declare variable to hold response and make it public to be accessible from components.html
  public events: any;
  //initialize the call using EventService
  constructor(private _myService: EventService) {}
  ngOnInit() {
    this.getEvents();
  }
  //method called OnInit
  getEvents() {
    this._myService.getEvents().subscribe(
      //read data and assign to public variable
      (data) => {
        this.events = data;
      },
      (err) => console.error(err),
      () => console.log('finished loading')
    );
  }
  onDelete(eventId: string) {
    this._myService.deleteEvent(eventId);
  }
}
