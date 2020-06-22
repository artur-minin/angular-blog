import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Provider } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import enGBLocale from '@angular/common/locales/en-GB';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AuthInterceptor } from './shared/auth.interceptor';

registerLocaleData(enGBLocale, 'en-GB');

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
