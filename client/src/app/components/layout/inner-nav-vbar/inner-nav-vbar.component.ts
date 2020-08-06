import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-inner-nav-vbar",
  templateUrl: "./inner-nav-vbar.component.html",
  styleUrls: ["./inner-nav-vbar.component.css"],
})
export class InnerNavVBarComponent implements OnInit {
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.userService.logoutUser();
    this.router.navigate(["/"]);
  }
}
