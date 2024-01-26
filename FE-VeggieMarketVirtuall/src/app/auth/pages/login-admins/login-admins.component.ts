import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';
import { ICredenciales } from '../../interfaces/icredenciales';
import { AuthenticationService } from '../../services/authentication.service';
import { Respuesta } from 'src/app/shared/interface/respuesta';

@Component({
  selector: 'app-login-admins',
  templateUrl: './login-admins.component.html',
  styleUrls: ['./login-admins.component.css']
})
export class LoginAdminsComponent implements OnInit {
  bandera: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _alert: AlertService,
    private router: Router,
    private _authentication: AuthenticationService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    localStorage.removeItem("token-Veggie")
  }

  handleSubmit() {
    if (this.form.invalid) {
      this._alert.error("Todos los campos son requeridos.")
      return
    }

    const credentials: ICredenciales = {
      username: this.form.value.username,
      password: this.form.value.password,
      transaccion: "AUTH"
    };

    this._authentication.authAdmin(credentials).subscribe({
      next: (respuesta: Respuesta) => {
        if(respuesta.status){
          localStorage.setItem("token-Veggie", respuesta.data)
          this._alert.success('Bienvenido')
          this.router.navigate(['/dashboard/'])
          return
        }else {
          this._alert.warning(respuesta.data)
          this.form.reset()
          return
        }
      }
    })
  }

}
