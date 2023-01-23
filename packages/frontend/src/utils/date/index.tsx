import moment from 'moment';

export function formatDate(date: string) {
  return moment().format('MM/DD/YY, h:mm A');
}
