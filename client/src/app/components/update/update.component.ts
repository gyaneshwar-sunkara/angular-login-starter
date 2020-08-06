import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"],
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  name: string;

  constructor(
    private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService,
    private userService: UserService
  ) {
    const user = userService.getUser();
    this.name = user ? user.name : "";

    this.updateForm = this.formBuilder.group({
      name: user ? user.name : "",
      email: user ? user.email : "",
    });
  }

  ngOnInit() {}

  onSubmit(updateData) {
    this.userService.updateUser(updateData).subscribe((data) => {
      if (data) {
        this.name = data.user.name;
        this.userService.setUser(data.user);
        this.flashMessagesService.show("Updated Successfully", {
          cssClass: "alert-success",
          timeout: 3000,
        });
      }
    });
  }
}
