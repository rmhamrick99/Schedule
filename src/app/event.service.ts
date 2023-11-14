import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}
  getEvents() {
    return this.http.get('http://localhost:8000/events');
  }
  //Uses http.get() to request data based on event id
  getEvent(eventId: string) {
    return this.http.get('http://localhost:8000/events/' + eventId);
  }

  deleteEvent(eventId: string) {
    this.http
      .delete('http://localhost:8000/events/' + eventId)
      .subscribe(() => {
        console.log('Deleted: ' + eventId);
      });
    location.reload();
  }
  updateEvent(
    eventId: string,
    eventTitle: string,
    eventDate: string,
    eventLength: string,
    eventTime: string
  ) {
    //request path http://localhost:8000/events/5xbd456xx
    //first and last names will be send as HTTP body parameters
    this.http
      .put('http://localhost:8000/events/' + eventId, {
        eventTitle,
        eventDate,
        eventLength,
        eventTime,
      })
      .subscribe(() => {
        console.log('Updated: ' + eventId);
      });
  }
  //Uses http.post() to post data
  addEvents(
    eventTitle: string,
    eventDate: string,
    eventLength: string,
    eventTime: string
  ) {
    this.http
      .post('http://localhost:8000/events', {
        eventTitle,
        eventDate,
        eventLength,
        eventTime,
      })
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}
