import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LogOutPageComponent } from './log-out-page/log-out-page.component';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'logout', component: LogOutPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
