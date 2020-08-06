import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.css"],
})
export class DeleteComponent implements OnInit {
  name: string = "dafdf";

  constructor(private userService: UserService, private router: Router) {
    const user = userService.getUser();
    this.name = user ? user.name : "";
  }

  ngOnInit() {}

  deleteUser() {
    this.userService.deleteuser().subscribe((data) => {
      if (data) {
        this.userService.logoutUser();
        this.router.navigate(["/"]);
      }
    });
  }
}
