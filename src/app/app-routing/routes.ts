import { ContactComponent } from './../contact/contact.component';
import { AboutComponent } from './../about/about.component';
import { MenuComponent } from './../menu/menu.component';
import { HomeComponent } from './../home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'contact', component: ContactComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
]