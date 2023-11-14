import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from './event.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { ListEventsComponent } from './list-events/list-events.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';
import { MatSelectModule } from '@angular/material/select';

const appRoutes: Routes = [
  {
    path: '', //default component to display
    component: ListEventsComponent,
  },
  {
    path: 'addEvent',
    component: NewEventFormComponent,
  },
  {
    path: 'editEvent/:_id',
    component: NewEventFormComponent,
  },
  {
    path: 'listEvents',
    component: ListEventsComponent,
  },
  {
    path: '**', //when path cannot be found
    component: NotFoundComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    NewEventFormComponent,
    NavigationMenuComponent,
    ListEventsComponent,
    NotFoundComponent,
    NewEventFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
