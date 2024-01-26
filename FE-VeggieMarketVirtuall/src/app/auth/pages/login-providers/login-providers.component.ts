import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ICredenciales } from '../../interfaces/icredenciales';
import { Respuesta } from 'src/app/shared/interface/respuesta';

@Component({
  selector: 'app-login-providers',
  templateUrl: './login-providers.component.html',
  styleUrls: ['./login-providers.component.css']
})
export class LoginProvidersComponent implements OnInit {
  form: FormGroup;
  bandera: boolean = false;

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
    localStorage.removeItem("token-Veggie-comunidad")
  }

  handleSubmit() {
    if (this.form.invalid) {
      this._alert.error("Todos los campos son requeridos.")
      return
    }

    const credentials: ICredenciales = {
      username: this.form.value.username,
      password: this.form.value.password,
      transaccion: 'AUTH'
    };

    this._authentication.authAdmin(credentials).subscribe({
      next: (respuesta: Respuesta) => {
        if(respuesta.status){
          localStorage.setItem("token-Veggie-comunidad", respuesta.data)
          this._alert.success('Bienvenido')
          this.router.navigate(['/dashboard-comunidad/'])
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
 