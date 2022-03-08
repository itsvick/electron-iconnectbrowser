export function formatCurrency(value: string | number) {
  value = value.toString();

  if (value.split('.').length > 1) {
    if (value.split('.')[1].length === 1) {
      value = value + '0';
    }
  } else {
    value = value + '.00';
  }

  return value;
}

export function hmsToSecondsOnly(str) {
  const p = str.split(':');
  let s = 0;
  let m = 1;

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }

  return s;
}
