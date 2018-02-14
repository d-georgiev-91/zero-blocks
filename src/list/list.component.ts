import { CommonModule } from "@angular/common";
import {
	Component,
	ContentChildren,
	ElementRef,
	EventEmitter,
	forwardRef,
	HostBinding,
	Inject,
	Input,
	NgModule,
	Output,
	QueryList,
	ViewChild,
	TemplateRef,
	ContentChild,
} from "@angular/core";

import { IgxRippleModule } from "../directives/ripple/ripple.directive";
import { IgxEmptyListTemplateDirective } from "./list.common"
import { IgxListItemComponent } from "./list-item.component"

// ====================== LIST ================================
// The `<igx-list>` directive is a list container for items and headers
@Component({
	host: {
		role: "list"
	},
	selector: "igx-list",
	templateUrl: "list.component.html"
})
export class IgxListComponent {

	constructor(private element: ElementRef) {
	}

	@ContentChildren(forwardRef(() => IgxListItemComponent)) public children: QueryList<IgxListItemComponent>;

	@ContentChild(IgxEmptyListTemplateDirective, { read: IgxEmptyListTemplateDirective })
	public emptyListTemplate: IgxEmptyListTemplateDirective;

	@ViewChild("defaultEmptyList", { read: TemplateRef })
	protected defaultEmptyListTemplate: TemplateRef<any>;

	@Input() public allowLeftPanning: boolean = false;
	@Input() public allowRightPanning: boolean = false;

	@Output() public onLeftPan = new EventEmitter();
	@Output() public onRightPan = new EventEmitter();
	@Output() public onPanStateChange = new EventEmitter();
	@Output() public onItemClicked = new EventEmitter();

	@HostBinding("class")
	public get innerStyle(): string {
		return this.children.length === 0 ? "igx-list-empty" : "igx-list";
	}

	public get items(): IgxListItemComponent[] {
		const items: IgxListItemComponent[] = [];
		if (this.children !== undefined) {
			for (const child of this.children.toArray()) {
				if (!child.isHeader) {
					items.push(child);
				}
			}
		}

		return items;
	}

	public get headers(): IgxListItemComponent[] {
		const headers: IgxListItemComponent[] = [];
		if (this.children !== undefined) {
			for (const child of this.children.toArray()) {
				if (child.isHeader) {
					headers.push(child);
				}
			}
		}

		return headers;
	}

	public get context(): any {
		return {
			$implicit: this
		};
	}

	public get template() : TemplateRef<any> {
		return this.emptyListTemplate ? this.emptyListTemplate.template : this.defaultEmptyListTemplate;
	}
}

@NgModule({
	declarations: [IgxListComponent, IgxListItemComponent, IgxEmptyListTemplateDirective],
	exports: [IgxListComponent, IgxListItemComponent, IgxEmptyListTemplateDirective],
	imports: [CommonModule, IgxRippleModule]
})
export class IgxListModule {
}