import _ from 'lodash';

export const mapArrayToObject = (data: any[], key: string = 'code') => {
  const initialValue = {};
  return data.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: {
        ...item,
        code: _.get(item, 'code', _.get(item, 'symbol', '')),
        totalTradingQtty: _.get(item, 'totalTradingQtty', _.get(item, 'totalTradingQtt', '')),
        currentRoom: _.get(item, 'currentRoom', ''),
        isBookmark: false,
      },
    };
  }, initialValue);
};

export const removeDiacritics = (data: string) => data.normalize('NFD').replace(/\p{Diacritic}/gu, '');

export function removeAccents(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export const handleKeySearch = (input: string) => {
  const patternWordOnly = /[^a-z]/g;
  return removeDiacritics(input.toLowerCase()).replace(patternWordOnly, '');
};
