function compareJson(first, second, path = '') {
  const changes = [];

  const allKeys = new Set([
    ...Object.keys(first),
    ...Object.keys(second),
  ]);

  for (const key of allKeys) {
    const currentPath = path ? `${path}.${key}` : key;

    const existsInFirst = Object.prototype.hasOwnProperty.call(first, key);
    const existsInSecond = Object.prototype.hasOwnProperty.call(second, key);

    if (!existsInFirst) {
      changes.push({
        path: currentPath,
        type: 'added',
        oldValue: undefined,
        newValue: second[key],
      });
      continue;
    }

    if (!existsInSecond) {
      changes.push({
        path: currentPath,
        type: 'removed',
        oldValue: first[key],
        newValue: undefined,
      });
      continue;
    }

    const firstValue = first[key];
    const secondValue = second[key];

    const bothAreObjects =
      typeof firstValue === 'object' &&
      firstValue !== null &&
      typeof secondValue === 'object' &&
      secondValue !== null;

    if (bothAreObjects) {
      changes.push(
        ...compareJson(firstValue, secondValue, currentPath)
      );
    } else if (firstValue !== secondValue) {
      changes.push({
        path: currentPath,
        type: 'modified',
        oldValue: firstValue,
        newValue: secondValue,
      });
    } else {
      changes.push({
        path: currentPath,
        type: 'unchanged',
        oldValue: firstValue,
        newValue: secondValue,
      });
    }
  }

  return changes;
}

export default compareJson;