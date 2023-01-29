import ExploreButton from '../components/common/ExploreButton';
import { TABLE_COLUMNS } from '../constants/table-columns';
import { HeaderRow } from '../stories/DataTable/DataTable';

export function getCommonTableHeaders({
  fields,
  ctaText,
  onCtaClick,
}: {
  fields: string[];
  ctaText: string;
  onCtaClick: (data) => void;
}): HeaderRow[] {
  const headerData: HeaderRow[] = fields.map((c) => ({
    field: c,
    title: getTableColumnDefinition(c).title,
    sortable: getTableColumnDefinition(c).sortable || false,
    sortType: getTableColumnDefinition(c).sortType,
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

export function formatField({ fieldName, fieldValue }) {
  const configuredUnit = getTableColumnDefinition(fieldName).unit;
  if (!configuredUnit) return fieldValue;
  const unit =
    getTableColumnDefinition(fieldName).unit === 'Hrs.' && fieldValue === 1
      ? 'Hr.'
      : getTableColumnDefinition(fieldName).unit;

  return `${fieldValue}${unit !== '%' ? ' ' : ''}${unit}`;
}

export function getTableColumnDefinition(columnId) {
  try {
    if (!TABLE_COLUMNS[columnId]) {
      throw new Error(`Column not found: ${columnId}`);
    }
    return TABLE_COLUMNS[columnId];
  } catch (error) {
    console.error(error);
    return null;
  }
}
