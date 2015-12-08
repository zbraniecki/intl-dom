import { bindEvents } from '../bindings/dom';
import { View } from '../bindings/view';

document.i18n = new View(document);

bindEvents(document.i18n);
