import ExploreButton from '../../components/common/ExploreButton';
import {
  ColumnName,
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
};

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatDuration(duration: number) {
  if (duration < 1) {
    return `${Math.round(duration * 60)} Mins.`;
  } else {
    return `${Math.round(duration)} Hrs.`;
  }
}

export function formatStorage(storage: number) {
  if (storage < 1024 * 1024) {
    return `${numberWithCommas(Math.round(storage))} Bytes`;
  }
  const storageInMb = storage / 1024 / 1024;

  if (storageInMb < 1024) {
    return `${numberWithCommas(Math.round(storageInMb))} MB`;
  } else {
    return `${numberWithCommas((storageInMb / 1024).toFixed(2))} GB`;
  }
}

export function formatColumn({
  columnName,
  dataObject,
  columnValue,
}: formatColumnParams) {
  const columnDefinition = getTableColumnDefinition(columnName);

  const fieldValue = columnValue ?? dataObject[columnName];

  if (!columnDefinition?.unit) return columnValue ?? dataObject?.[columnName];

  switch (columnDefinition?.unit) {
    case UnitType.Duration:
      return formatDuration(fieldValue as number);
    case UnitType.Date:
      return formatDate(fieldValue);
    case UnitType.Storage:
      return formatStorage(fieldValue as number);
    case UnitType.Percentage:
      return `${fieldValue.toFixed(2)}%`;
    default:
      break;
  }
}

type TableColumnDefinition = {
  title: string;
  sortable?: boolean;
  sortType?: string | number;
  unit?: UnitType;
  helpIconText?: string;
};

export function getTableColumnDefinition(
  columnId: ColumnName,
): TableColumnDefinition {
  if (!TABLE_COLUMNS[columnId]) {
    throw new Error(`Column not found: ${columnId}`);
  }

  return TABLE_COLUMNS[columnId];
}
