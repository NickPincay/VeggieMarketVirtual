import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginProvidersComponent } from './pages/login-providers/login-providers.component';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginAdminsComponent } from './pages/login-admins/login-admins.component';

@NgModule({
  declarations: [
    LoginProvidersComponent,
    LoginAdminsComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
