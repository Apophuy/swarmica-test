import { Status } from '../types';

export const STATUS_OPTIONS: Status[] = [
  'APPROVED',
  'ARCHIVED',
  'DRAFT',
  'PUBLISHED',
  'UNAPPROVED',
];

export const STATUS_COLORS: Record<Status, string> = {
  APPROVED: 'green',
  ARCHIVED: 'gray',
  DRAFT: 'gold',
  PUBLISHED: 'blue',
  UNAPPROVED: 'red',
};
