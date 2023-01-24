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
    title: TABLE_COLUMNS[c].title,
    sortable: TABLE_COLUMNS[c].sortable || false,
    sortType: TABLE_COLUMNS[c].sortType,
    sortField: c,
    helpIconText: TABLE_COLUMNS[c].helpIconText,
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
  const unit =
    TABLE_COLUMNS[fieldName].unit === 'Hrs.' && fieldValue === 1
      ? 'Hr.'
      : TABLE_COLUMNS[fieldName].unit;

  return `${fieldValue}${unit !== '%' ? ' ' : ''}${unit}`;
}
