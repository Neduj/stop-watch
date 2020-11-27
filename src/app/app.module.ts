import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RoutesModule } from './route.module';
import { StopWatchModule } from './stopwatch/stopwatch.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutesModule,
    StopWatchModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
