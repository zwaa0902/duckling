function formatPercent(value: number) {
  if (value == null) return '';
  if (value == 0) return '0%';
  return value.toFixed(2) + '%';
}

function formatNumber(value: number, fixed?: number) {
  if (value == null) return '';
  if (value == 0) return '0';
  return Number(value.toFixed(fixed || 0)).toLocaleString('en-US');
}

function formatNumberFraction(value: number, fractionDigits: number) {
  if (value == null) return '';
  if (value == 0) return '0';
  return Number(value.toFixed(fractionDigits)).toLocaleString('en-US', { minimumFractionDigits: fractionDigits });
}

function formatToShort(value: number) {
  if (value == null) return '';

  if (value >= 1000000000000) return formatNumberFraction(value / 1000000000000, 1) + ' K tỷ';
  if (value >= 1000000000) return formatNumberFraction(value / 1000000000, 1) + ' Tỷ';
  if (value >= 1000000) return formatNumberFraction(value / 1000000, 1) + ' Tr';
  if (value == 0) return '0';

  return formatNumberFraction(value / 1000, 1) + ' K';
}

function formatToShortEng(value: number) {
  if (value == null) return '';

  if (value >= 1000000000000) return formatNumberFraction(value / 1000000000000, 1) + ' T';
  if (value >= 1000000000) return formatNumberFraction(value / 1000000000, 1) + ' B';
  if (value >= 1000000) return formatNumberFraction(value / 1000000, 1) + ' M';
  if (value == 0) return '0';

  return formatNumberFraction(value / 1000, 1) + ' K';
}

export default {
  formatNumber,
  formatPercent,
  formatToShort,
  formatToShortEng,
  formatNumberFraction,
};
