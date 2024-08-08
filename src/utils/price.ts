export function formatUnitWithFixed(
  s: number,
  fixed: number = 2,
  char: string = '.',
  unit: number = 1000,
  prefix: boolean = false,
) {
  if (s == null) return '';
  if (s == 0) return s;
  const val = s / unit;
  const toText = val.toFixed(fixed).replaceAll('.', char);
  if (val > 0 && prefix) return `+${toText}`;
  return toText;
}

export function formatWithDefaultvalue(
  input: any,
  fallback: string,
  fn?: 'commify' | 'commifyWithCut' | 'formatUnit' | 'formatVol',
  suffix?: any,
) {
  if (input === null || input === undefined || input === '') return fallback;
  let response;
  switch (fn) {
    case 'commify':
      response = commify(input, 0, 1);
      break;
    case 'commifyWithCut':
      response = commify(input, 0, 1, -1);
      break;
    case 'formatUnit':
      response = formatUnitWithFixed(input);
      break;
    case 'formatVol':
      response = formatPriceOrVolume(input);
      break;
    default:
      response = input;
      break;
  }
  if (!!suffix) return `${response} ${suffix}`;
  return response;
}

const tierPrice = ['', ' K', ' Tr', ' Tỷ', 'K Tỷ'];

export function formatPrice(value: number) {
  return (value / 1000).toFixed(2);
}

export function formatPriceOrVolume(num: number) {
  if (num == null) return '';
  if (num == 0) return num;
  const tier = (Math.log10(Math.abs(num)) / 3) | 0;
  if (tier === 0) return num;
  return (num / Math.pow(10, tier * 3)).toFixed(1).replace(/\.0+$/, '') + tierPrice[tier];
}

export function classColorByPrice(p: any, f: any, c: any, r: any, fallback?: any) {
  const price = Number(p);
  const floor = Number(f);
  const ceiling = Number(c);
  const reference = Number(r);
  switch (price) {
    case ceiling:
      return 'ceiling';
    case reference:
      return 'reference';
    case floor:
      return 'floor';
    default:
      break;
  }
  if (price > reference && price < ceiling) {
    return 'high';
  } else if (price < reference && price > floor) {
    return 'low';
  }
  return fallback ?? 'white-1';
}

export function classColorVolatility(volatility: number = 0): string {
  return `abs-volatility__${volatility == 0 ? 'no-change' : volatility > 0 ? 'up' : 'down'}`;
}

export function classColorVolatilityDetail(volatility: number = 0): string {
  return `abs-volatility__${volatility == 0 ? 'no-change' : volatility > 0 ? 'up' : 'down'}__detail`;
}

export function commify(v: any | undefined, fixed: number = 0, unit: number = 1, cut?: number): string {
  if (v === 0) return v;
  if (!v) return '';
  const value = Number(v) / unit;
  const parts = value.toFixed(fixed).toString().split('.');

  const numberPart = parts[0];
  const decimalPart = parts[1];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;

  const result = numberPart.replace(thousands, ',') + (decimalPart ? '.' + decimalPart : '');
  if (!!cut && result.length > 1) {
    return result.slice(0, cut);
  }

  return result;
}

export function validPercent(record: any) {
  const priceModel: { basicPrice: number; change: number } = { ...record };
  if (priceModel.change === null || priceModel.change === undefined) return undefined;
  return (+priceModel.change / +priceModel.basicPrice) * 100;
}

export function validPercentToString(record: any) {
  const val = validPercent(record);
  if (val === undefined) return val;
  if (val === 0) return `${val}%`;
  if (val > 0) return `+${commify(val, 2)}%`;
  return `${commify(val, 2)}%`;
}

export function fixedPercent(value: any, fixed: number = 2) {
  return (Number(value) * 100).toFixed(fixed);
}
