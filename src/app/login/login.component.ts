import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }
  form: FormGroup;
  ngOnInit(): void {
  }

  onSubmit() {

  }

  login(form: FormGroup) {
    console.log(this.form)
    if (form.value.username == 'ashu' && form.value.password == 'ashu') this.router.navigate(['/home']);
  }

}
