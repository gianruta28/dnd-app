import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-navigation',
	templateUrl: 'navigation.template.html',
	styleUrl: 'navigation.component.scss',
	standalone: true,
	imports: [CommonModule],
})
export class NavigationComponent {
	@Input() title: string;
	isSidebarOpen = false;

	toggleSidebar(): void {
		this.isSidebarOpen = !this.isSidebarOpen;
	}
}
