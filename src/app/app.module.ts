import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [], // No components declared here when using standalone
  imports: [
    BrowserModule, // Required for browser applications
  ],
  providers: [
    provideHttpClient() // Provides HttpClient for the entire application
  ],
  bootstrap: [AppComponent] // Bootstrap your root standalone component
})
export class AppModule {}