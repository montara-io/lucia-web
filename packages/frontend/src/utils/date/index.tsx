import moment from 'moment';

export function formatDate(date: string) {
  return moment(date).format('MM/DD/YY, h:mm A');
}
