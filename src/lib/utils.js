export const deepEqual = function(obj1, obj2) {
  if (!obj1) obj1 = {};
  if (!obj2) obj2 = {};

  const keys1 = Object.getOwnPropertyNames(obj1);
  const keys2 = Object.getOwnPropertyNames(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];

    if (obj1[key] !== obj2[key]) {
      return false
    }
  }

  return true;
}

export function findInMap(map, { type, options }) {
  for (let [key, value] of map) {
    if (key.type === type && deepEqual(key.options, options)) {
      return value;
    }
  }
}
