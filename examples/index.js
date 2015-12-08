function foo(evt){
  console.log('observed called!');
  //var f = IntlHelper.get('longDate');
}


IntlHelper.define('longDate', 'datetime', {month: 'long'});
var f = IntlHelper.get('longDate');

IntlHelper.observe('longDate', foo);

window.IntlHelper.handleEvent(new CustomEvent('moztimechange'));

IntlHelper.unobserve('longDate', foo);
window.dispatchEvent(new CustomEvent('moztimechange'));
