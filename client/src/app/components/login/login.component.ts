import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: "",
      password: "",
    });
  }

  ngOnInit() {}

  onSubmit(loginData) {
    this.userService.authUser(loginData).subscribe((data) => {
      if (data) {
        this.userService.setToken(data.token);
        this.userService.setUser(data.user);
        this.loginForm.reset();
        this.router.navigate(["/update"]);
      }
    });
  }
}
