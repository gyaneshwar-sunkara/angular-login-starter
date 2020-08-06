import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: "",
      email: "",
      password: "",
    });
  }

  ngOnInit() {}

  onSubmit(registerData) {
    this.userService.createUser(registerData).subscribe((data) => {
      if (data) {
        this.userService.setToken(data.token);
        this.userService.setUser(data.user);
        this.registerForm.reset();
        this.router.navigate(["/update"]);
      }
    });
  }
}
