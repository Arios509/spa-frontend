import { RouterModule, Routes, Router } from '@angular/router';
import { LayoutComponent } from './module/layout/layout.component';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './module/notfound/notfound.component';
import { PathResolveService } from './core/_services/path-resolve.service';

const routes: Routes = [
    // { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: '', loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)},
    {
        path: '**',
        resolve: {
          path: PathResolveService
        },
        component: NotfoundComponent
      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],

})

export class AppRoutingModule { }
