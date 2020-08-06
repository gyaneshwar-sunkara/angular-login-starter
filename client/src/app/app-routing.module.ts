import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AboutComponent } from "./components/about/about.component";
import { GenericNotFoundComponent } from "./components/generic-not-found/generic-not-found.component";
import { UpdateComponent } from "./components/update/update.component";
import { DeleteComponent } from "./components/delete/delete.component";
import { AuthGuard } from "./guards/auth.guard";
import { UserGuard } from "./guards/user.guard";

const routes: Routes = [
  { path: "", component: LoginComponent, canActivate: [UserGuard] },
  { path: "register", component: RegisterComponent, canActivate: [UserGuard] },
  { path: "update", component: UpdateComponent, canActivate: [AuthGuard] },
  { path: "delete", component: DeleteComponent, canActivate: [AuthGuard] },
  { path: "about", component: AboutComponent },
  { path: "404", component: GenericNotFoundComponent },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
