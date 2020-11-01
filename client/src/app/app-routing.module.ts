import { ErrorComponent } from './error/error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoRoomComponent } from './video-room/video-room.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full'},  // Wildcard route for a 404 page
    { path: ':room', component: VideoRoomComponent, pathMatch: 'full' },
    { path: '**', component: ErrorComponent },  // Wildcard route for a 404 page
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
