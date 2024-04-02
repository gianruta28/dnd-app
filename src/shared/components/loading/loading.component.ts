import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-loading',
	templateUrl: 'loading.template.html',
	styleUrl: 'loading.component.scss',
	standalone: true,
	imports: [CommonModule],
})
export class LoadingComponent {
	@Input() loadingStatus: boolean;
	@Input() noBg: boolean;
	@Input() noFullScreen: boolean;
}
