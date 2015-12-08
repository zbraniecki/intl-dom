export function findAffectedElements(cache, root, evt) {
  const affectedTypes = cache.getAffectedTypes(evt);

  const selector = Array.from(affectedTypes).map(
    type => `[data-i18n-type="${type}"]`).join(',');

  if (!selector) {
    return [];
  }
  return root.querySelectorAll(selector);
}

export function formatElements(cache, elements) {
  for (let elem of elements) {
    if (!elem.hasAttribute('data-i18n-value')) {
      continue;
    }
    const value = elem.getAttribute('data-i18n-value');
    const type = elem.getAttribute('data-i18n-type');
    const options = elem.hasAttribute('data-i18n-options') ?
      JSON.parse(elem.getAttribute('data-i18n-options')) : undefined;

    const formatter = cache.get({type, options});
    let resolvedValue;
    switch (type) {
      case 'datetime':
        resolvedValue = new Date(parseInt(value));
        elem.textContent = formatter.format(resolvedValue);
        break;
      case 'number':
        resolvedValue = new Date(parseInt(value));
        elem.textContent = formatter.format(resolvedValue);
        break;
    }
  }
}

export function bindEvents(view) {
  window.addEventListener('languagechange', view);
  window.addEventListener('moztimechange', view);
  window.addEventListener('timeformatchange', view);
}
