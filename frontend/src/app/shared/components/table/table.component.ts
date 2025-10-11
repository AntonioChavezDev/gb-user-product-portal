import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonDirective, TableDirective } from '@coreui/angular';
import { cilPencil, cilTrash } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-table',
  imports: [TableDirective, CommonModule, ButtonDirective, IconDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  /** Column headers (titles) */
  @Input() columns: TableColumn[] = [];

  /** Rows of data (array of objects or arrays) */
  @Input() data: any[] = [];

  /** Optional custom classes for <table> */
  @Input() tableClass: string = 'cTable table-hover table-striped';

  @Input() actions!: TableAction[];

  icons = { cilPencil, cilTrash };
}

export interface TableColumn {
  title: string;
  field: string;
  type?: 'text' | 'number' | 'date';
}

export interface TableAction {
  label: string;
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link';
  icon: 'cilPencil' | 'cilTrash';
  onClick: Function;
}
