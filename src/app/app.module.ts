import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { JqueryComponent } from './jquery/jquery.component';
import { AngularComponent } from './angular/angular.component';
import { AppRoutingModule } from './app-routing.module';
import {MatCardModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    JqueryComponent,
    AngularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
