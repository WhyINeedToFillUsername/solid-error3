import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InruptComponent} from './components/inrupt/inrupt.component';

const routes: Routes = [
  {path: 'inrupt', component: InruptComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
