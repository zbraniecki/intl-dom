import { NodeWatcher } from './nodewatcher';
import { documentReady } from './shims';
import { Cache } from '../lib/cache';
import { formatElements, findAffectedElements } from './dom';
import { findInMap } from '../lib/utils';
import { knownObjects } from '../lib/objects';

const cache = new Cache();
const listeners = new Map();

export class View {
  constructor(doc) {
    this._cache = new Cache();
    this._doc = doc;

    this.ready = documentReady();

    this._i18nWatcher = new NodeWatcher(doc.documentElement, {
      type: ['added', 'modified'],
      selector: '[data-i18n-value]',
      attributes: ['data-i18n-value', 'data-i18n-type', 'data-i18n-options'],
      onAdded: formatElements.bind(this, this._cache),
      onModified: formatElements.bind(this, this._cache),
    });

    if (doc.readyState !== 'loading') {
      this._i18nWatcher.prescan();
    }

    this._i18nWatcher.start();
  }

  define(name, type, options) {
    return cache.define(name, {type, options});
  }

  get(key) {
    return cache.get(key);
  }

  handleEvent(evt) {
    const affectedElements =
      findAffectedElements(this._cache, this._doc.documentElement, evt);

    cache.resetObjects(evt);

    formatElements(cache, affectedElements);
    fireObservers(evt);
  }

  observe(names, cb) {
    if (typeof names === 'string') {
      names = [names];
    }
    
    for (let name of names) {
      let key = cache.getName(name);
      let listenerSet = findInMap(listeners, key);
      if (!listenerSet) {
        listenerSet = new Set();
        listeners.set(key, listenerSet);
      }
      listenerSet.add(cb);
    }
  }

  unobserve(name, cb) {
    let key = cache.getName(name);
    let listenerSet = findInMap(listeners, key);
    listenerSet.delete(cb);
  }
}

function fireObservers(evt, ...args) {
  const affectedCallbacks = new Set();

  for (let [key, listenerSet] of listeners) {
    if (knownObjects[key.type].isAffected(evt.type, key.options)) {
      listenerSet.forEach(cb => {
        affectedCallbacks.add(cb);
      });
    }
  }

  affectedCallbacks.forEach(cb => {
    try {
      cb(...args);
    } catch(e) {
      console.error(`Error in callback: ${ e.toString() }`);
      console.error(e.stack);
    }
  });
}
