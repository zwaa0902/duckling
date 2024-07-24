import { removeVietnameseAccents } from './accents';

export function normalize(str: string) {
  return str ? removeVietnameseAccents(str).toLowerCase().trim() : '';
}
