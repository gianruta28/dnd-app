import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-paginator',
	standalone: true,
	templateUrl: 'paginator.component.html',
	styleUrl: 'paginator.component.scss',
})
export class PaginatorComponent implements OnInit, OnDestroy {
	@Output() changePage: EventEmitter<number> = new EventEmitter<number>();
	@Input() currentPage: number;
	constructor() {}

	ngOnInit(): void {}

	ngOnDestroy(): void {}

	public nextClick(): void {
		this.changePage.emit(this.currentPage + 1);
	}

	public previousClick(): void {
		this.changePage.emit(this.currentPage - 1);
	}
}
