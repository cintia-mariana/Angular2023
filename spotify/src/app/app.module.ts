import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritePageComponent } from './modules/favorites/pages/favorite-page/favorite-page.component';
import { SharedModule } from "./shared/shared.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service'
import { InjectSessionInterceptor } from '@core/interceptors/inject-session.interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers:[
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InjectSessionInterceptor,
            multi:true
    }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ]
})
export class AppModule { }
