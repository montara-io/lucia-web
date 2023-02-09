import ExploreButton from '../../components/common/ExploreButton';
import {
  ColumnName,
  ColumnType,
  TABLE_COLUMNS,
  UnitType,
} from '../../constants/table-columns';
import { HeaderRow } from '../../stories/DataTable/DataTable';
import { formatDate } from '../../utils/date';

export function getCommonTableHeaders({
  fields,
  ctaText,
  onCtaClick,
}: {
  fields: ColumnName[];
  ctaText: string;
  onCtaClick: (data) => void;
}): HeaderRow[] {
  const headerData: HeaderRow[] = fields.map((c) => ({
    field: c,
    title: getTableColumnDefinition(c).title,
    sortable: getTableColumnDefinition(c).sortable || false,
    sortType: getTableColumnDefinition(c).sortType as any,
    sortField: c,
    helpIconText: getTableColumnDefinition(c).helpIconText,
  }));

  return headerData.concat([
    {
      field: 'explore',
      title: '',
      headerStyle: {
        cellWidth: '12rem',
      },
      template: (rowData) => (
        <ExploreButton onClick={() => onCtaClick(rowData)} text={ctaText} />
      ),
    },
  ]);
}

type formatColumnParams = {
  columnName: ColumnName;
  dataObject?: any;
  columnValue?: any;
  excludeUnit?: boolean;
};

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatDuration(duration: number, excludeUnit = false) {
  if (duration < 1) {
    return `${Math.round(duration * 60)}${excludeUnit ? '' : ' Mins.'}`;
  } else {
    return `${Math.round(duration)}${excludeUnit ? '' : ' Hrs.'}`;
  }
}

export function formatStorage(storage: number | string, excludeUnit = false) {
  let storageNumeric = Number(storage);
  let unit;
  if (storageNumeric < 1024) {
    unit = 'Bytes';
  } else if (storageNumeric / 1024 < 1024) {
    unit = 'KB';
    storageNumeric = storageNumeric / 1024;
  } else if (storageNumeric / 1024 / 1024 < 1024) {
    storageNumeric = storageNumeric / 1024 / 1024;
    unit = 'MB';
  } else {
    storageNumeric = storageNumeric / 1024 / 1024 / 1024;

    unit = 'GB';
  }
  const toFixed = unit === 'Bytes' ? 0 : 2;
  const numberFormatted = numberWithCommas(storageNumeric.toFixed(toFixed));
  return excludeUnit ? numberFormatted : `${numberFormatted} ${unit}`;
}

export function formatColumn({
  columnName,
  dataObject,
  columnValue,
  excludeUnit = false,
}: formatColumnParams) {
  const columnDefinition = getTableColumnDefinition(columnName);

  let fieldValue = columnValue ?? dataObject[columnName];
  if (columnDefinition.columnType === ColumnType.Number) {
    fieldValue = Number(fieldValue);
  }

  if (!columnDefinition?.unit) return columnValue ?? dataObject?.[columnName];

  switch (columnDefinition?.unit) {
    case UnitType.Duration:
      return formatDuration(fieldValue as number, excludeUnit);
    case UnitType.Date:
      return formatDate(fieldValue);
    case UnitType.Storage:
      return formatStorage(fieldValue, excludeUnit);
    case UnitType.Percentage:
      return `${fieldValue.toFixed(2)}${excludeUnit ? '' : '%'}`;
    default:
      return fieldValue;
  }
}

type TableColumnDefinition = {
  title: string;
  sortable?: boolean;
  sortType?: string | number;
  unit?: UnitType;
  helpIconText?: string;
  columnType?: ColumnType;
};

export function getTableColumnDefinition(
  columnId: ColumnName,
): TableColumnDefinition {
  if (!TABLE_COLUMNS[columnId]) {
    throw new Error(`Column not found: ${columnId}`);
  }
  return TABLE_COLUMNS[columnId];
}
