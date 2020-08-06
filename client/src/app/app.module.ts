import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { FlashMessagesModule } from "angular2-flash-messages";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { InnerNavVBarComponent } from "./components/layout/inner-nav-vbar/inner-nav-vbar.component";
import { AboutComponent } from "./components/about/about.component";
import { GenericNotFoundComponent } from "./components/generic-not-found/generic-not-found.component";
import { UpdateComponent } from "./components/update/update.component";
import { DeleteComponent } from "./components/delete/delete.component";
import { AuthGuard } from "./guards/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    AboutComponent,
    GenericNotFoundComponent,
    UpdateComponent,
    DeleteComponent,
    InnerNavVBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
