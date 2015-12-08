import { findInMap } from './utils';
import { knownObjects } from './objects';

export class Cache {
  constructor() {
    this._store = new Map();
    this._names = new Map();
  }
  _find({ type, options }) {
    return findInMap(this._store, { type, options });
  }

  define(name, key) {
    this._names.set(name, key);
  }

  _set(key) {
    console.log('setting a new cache object');
    const { type, options } = typeof key === 'string' ?
      this._names.get(key) : key;

    const intlObject = knownObjects[type].create(options || {});
    this._store.set({type, options}, intlObject);
    return intlObject;
  }

  get(key) {
    if (typeof key === 'string') {
      if (!this._names.has(key)) {
        throw new Error(`Undefined intl object: ${key}`);
      }
      key = this._names.get(key);
    }

    return this._find(key) || this._set(key);
  }

  getName(name) {
    return this._names.get(name);
  }

  getAffectedTypes(evt) {
    const affectedKeys = new Set();
    this._store.forEach((obj, key) => {
      if (knownObjects[key.type].isTypeAffected(evt.type)) {
        affectedKeys.add(key.type);
      }
    });
    return affectedKeys;
  }

  resetObjects(evt) {
    const affectedKeys = new Set();
    this._store.forEach((obj, key) => {
      if (knownObjects[key.type].isAffected(evt.type, key.options || {})) {
        this._store.delete(key);
        affectedKeys.add(key);
      }
    });
    return affectedKeys;
  }
}
