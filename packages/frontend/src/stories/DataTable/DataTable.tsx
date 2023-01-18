import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import {
  DataTable as PDataTable,
  DataTableSortOrderType,
} from 'primereact/datatable';
import { Ripple } from 'primereact/ripple';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { useState } from 'react';
import EmptyState from '../EmptyState/EmptyState';
import './DataTable.scss';

export type DataRow = { isActive?: boolean } & { [key: string]: any };

export type HeaderRow = {
  field: string;
  title: string;
  template?: (data: any) => void;
  sortable?: boolean;
  sortField?: string;
  sortType?: 'string' | 'number'; // 'dropdown' | 'date'
  filter?: boolean;
  filterFunction?: (values: any, filter: string) => boolean;
  sortFunction?: () => void;
  placeholder?: string;
  disabled?: boolean;
  headerStyle?: object;
  scrollHeight?: string;
};

export type DataTableProps = {
  id: string;
  bodyData: DataRow[];
  headerData: HeaderRow[];
  paginationRows?: number;
  showExporting?: boolean;
  exportLabel?: string;
  removeSeparators?: boolean;
  onFilter?: () => void;
  onSort?: (e) => void;
  onValueChange?: (value) => void;
  defaultSortField: string;
  scrollHeight?: string;
  defaultSortOrder?: DataTableSortOrderType;
};

const DataTable: FunctionComponent<DataTableProps> = ({
  id,
  bodyData = [],
  headerData = [],
  showExporting,
  exportLabel,
  paginationRows,
  removeSeparators,
  onFilter,
  onSort,
  onValueChange,
  defaultSortField,
  scrollHeight,
  defaultSortOrder = -1,
}) => {
  const dt = useRef(null);
  const DESC = -1;
  const [sortField, setSortField] = useState(defaultSortField);
  const [sortOrder, setSortOrder] = useState<DataTableSortOrderType>(
    defaultSortOrder as DataTableSortOrderType
  );

  useEffect(() => {
    dt && dt.current && (dt.current as any).reset();
  }, [dt]);

  const rowClass = (data) => {
    return {
      'row-opacity': data.isActive === false,
    };
  };

  const exportCSV = (selectionOnly) => {
    dt && dt.current && (dt.current as any).exportCSV({ selectionOnly });
  };

  const paginatorTemplate = {
    layout: 'PrevPageLink CurrentPageReport NextPageLink',
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-p-3">{'< Prev'}</span>
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-p-3">{'Next >'}</span>
          <Ripple />
        </button>
      );
    },
    CurrentPageReport: ({ currentPage, totalPages }) => {
      return (
        <div className={currentPage > totalPages ? 'p-disabled' : ''}>
          {currentPage}/{currentPage > totalPages ? '1' : totalPages}
        </div>
      );
    },
  };

  const buildContent = (field, { template }, data) => {
    return (
      <div className="m-display-flex">
        <div className="m-row-content">
          {template ? template(data) : data[field]}
        </div>
      </div>
    );
  };

  return (
    <div id="m-data-table">
      {showExporting && (
        <div className="m-header-table">
          <div className="lbl">{exportLabel || 'Export'}</div>
          <Button
            data-testid="m-table-button"
            className="p-button-text button-header"
            onClick={() => exportCSV(false)}
            data-pr-tooltip="CSV"
          >
            <img src="./assets/icons/export.svg" alt="export" />
          </Button>
        </div>
      )}
      <PDataTable
        onValueChange={onValueChange}
        scrollable
        scrollHeight={scrollHeight || '100%'}
        id={id}
        autoLayout={true}
        ref={dt}
        value={bodyData}
        rowClassName={rowClass}
        className={removeSeparators ? 'no-separators' : ''}
        dataKey="id"
        alwaysShowPaginator={false}
        paginator={true}
        rows={paginationRows || bodyData.length || 1}
        paginatorTemplate={paginatorTemplate as any}
        onSort={(e) => {
          onSort && onSort(e);
          setSortField(e.sortField);
          setSortOrder(e.sortOrder);
          dt && dt.current && (dt.current as any).reset();
        }}
        emptyMessage={<EmptyState />}
        {...(onFilter ? { onFilter: onFilter } : {})}
        sortField={sortField}
        sortOrder={sortOrder}
        defaultSortOrder={DESC as DataTableSortOrderType}
      >
        {headerData?.map(
          (
            {
              sortType = 'string',
              title,
              field,
              placeholder,
              sortable,
              sortField,
              template,
              filter,
              filterFunction,
              sortFunction,
              disabled,
              headerStyle,
            }: HeaderRow,
            i
          ) => (
            <Column
              key={i}
              field={`${
                sortType.toLowerCase() === 'dropdown'
                  ? `${field.toLowerCase()}`
                  : field.toLowerCase()
              }`}
              header={`${title.toUpperCase()}`}
              headerStyle={
                headerStyle ? { ...headerStyle } : { width: '10rem' }
              }
              body={(data) => buildContent(field, { template }, data)}
              filter={filter}
              filterMatchMode="custom"
              filterFunction={filterFunction}
              sortable={sortable}
              sortField={sortField}
              filterPlaceholder={placeholder}
              sortableDisabled={disabled}
              sortFunction={sortFunction}
            />
          )
        )}
      </PDataTable>
    </div>
  );
};

export default DataTable;
