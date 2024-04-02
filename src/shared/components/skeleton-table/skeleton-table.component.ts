import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
	selector: 'app-skeleton-table',
	standalone: true,
	templateUrl: 'skeleton-table.component.html',
	styleUrl: 'skeleton-table.component.scss',
})
export class SkeletonTableComponent implements OnInit, OnDestroy {
	@Input() rowsNumber: number;
	rows: any[];

	constructor() {}

	ngOnInit(): void {
		this.rows = Array.from({ length: this.rowsNumber }, (_, i) => ({ id: i + 1 }));
	}

	ngOnDestroy(): void {}
}
