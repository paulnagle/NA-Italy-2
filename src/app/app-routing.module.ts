import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'settings',
    loadChildren: './pages/settings/settings.module#SettingsPageModule'
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule'
  },
  {
    path: 'jft',
    loadChildren: './pages/jft/jft.module#JftPageModule'
  },
  {
    path: 'calc',
    loadChildren: './pages/calc/calc.module#CalcPageModule'
  },
  {
    path: 'contact',
    loadChildren: './pages/contact/contact.module#ContactPageModule'
  },
  {
    path: 'map',
    loadChildren: './pages/map/map.module#MapPageModule'
  },
  {
    path: 'events',
    loadChildren: './pages/events/events.module#EventsPageModule'
  },
  {
    path: 'mapmodal',
    loadChildren: () => import('./pages/mapmodal/mapmodal.module').then( m => m.MapmodalPageModule)
  },
  {
    path: 'virtual',
    loadChildren: () => import('./pages/virtual/virtual.module').then( m => m.VirtualPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
