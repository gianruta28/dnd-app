import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModelInterface } from '@interfaces/core/model.interface';

interface IOption {
	id: string;
	redirectUrl?: string;
	icon?: string;
}
interface IOptions {
	header: string;
	elements: IOption[];
}

interface ValuesToDisplay {
	headers: string[];
	accessors: string[];
}

export interface OptionEvent {
	option: string;
	id: string;
}

@Component({
	selector: 'app-table',
	standalone: true,
	templateUrl: 'table.component.html',
	styleUrl: 'table.component.scss',
})
export class TableComponent {
	@Input() data: ModelInterface[];
	@Input() options: IOptions;
	@Input() valuesToDisplay: ValuesToDisplay;
	@Output() onOptionClicked: EventEmitter<OptionEvent> = new EventEmitter<OptionEvent>();

	public optionClicked(option: string, id: string): void {
		this.onOptionClicked.emit({
			option,
			id,
		});
	}
}
