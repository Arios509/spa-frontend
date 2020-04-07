import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './customer/create/create.component';
import { EditComponent } from './customer/edit/edit.component';
import { DetailComponent } from './customer/detail/detail.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        CustomerComponent,
        HomeComponent,
        CreateComponent,
        EditComponent,
        DetailComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        LoginComponent,
        SignupComponent
    ],

})

export class UserModule { }
