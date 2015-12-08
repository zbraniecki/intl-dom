import { Cache } from '../lib/cache';
import { findInMap } from '../lib/utils';
import { knownObjects } from '../lib/objects';

const cache = new Cache();

const listeners = new Map();

export const IntlHelper = {
  define(name, type, options) {
    return cache.define(name, {type, options});
  },
  get(key) {
    return cache.get(key);
  },
  handleEvent(evt) {
    cache.resetObjects(evt);
    fireObservers(evt);
  },
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
  },

  unobserve(name, cb) {
    let key = cache.getName(name);
    let listenerSet = findInMap(listeners, key);
    listenerSet.delete(cb);
  },
};


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
      console.error('Error in callback: ' + e.toString());
      console.error(e.stack);
    }
  });
}

export function bindEvents() {
  window.addEventListener('languagechange', IntlHelper);
  window.addEventListener('moztimechange', IntlHelper);
  window.addEventListener('timeformatchange', IntlHelper);
}
