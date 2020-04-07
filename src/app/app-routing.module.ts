import { RouterModule, Routes, Router } from '@angular/router';
import { LayoutComponent } from './module/layout/layout.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    // { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: '', loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],

})

export class AppRoutingModule { }
