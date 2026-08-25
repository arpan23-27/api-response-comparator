function collectNestedChanges(value, path, type) {
  const changes = [];

  if (typeof value === "object" && value !== null) {
    for (const key of Object.keys(value)) {
      const currentPath = Array.isArray(value)
        ? `${path}[${key}]`
        : `${path}.${key}`;

      changes.push(
        ...collectNestedChanges(value[key], currentPath, type)
      );
    }
  } else {
    changes.push({
      path,
      type,
      oldValue: type === "removed" ? value : undefined,
      newValue: type === "added" ? value : undefined,
    });
  }

  return changes;
}


function compareJson(first, second, path = '') {
  const changes = [];


  const allKeys = new Set([
    ...Object.keys(first),
    ...Object.keys(second),
  ]);


  
  for (const key of allKeys) {
    const currentPath = Array.isArray(first)
  ? `${path}[${key}]`
  : path
    ? `${path}.${key}`
    : key;



    const existsInFirst = Object.prototype.hasOwnProperty.call(first, key);
    const existsInSecond = Object.prototype.hasOwnProperty.call(second, key);

    if (!existsInFirst) {
      changes.push(
        ...collectNestedChanges(second[key], currentPath, "added")
      );
      continue;
    }

    if (!existsInSecond) {
      changes.push(
       ...collectNestedChanges(first[key], currentPath, "removed")
      );
      continue;
    }

    const firstValue = first[key];
    const secondValue = second[key];


    const bothAreArrays =
  Array.isArray(firstValue) &&
  Array.isArray(secondValue);



    const bothAreObjects =
  typeof firstValue === "object" &&
  firstValue !== null &&
  !Array.isArray(firstValue) &&
  typeof secondValue === "object" &&
  secondValue !== null &&
  !Array.isArray(secondValue);

    if (bothAreArrays || bothAreObjects) {
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