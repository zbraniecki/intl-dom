function foo(evt){
  console.log('observed called!');
  var f = document.i18n.get('longDate');
}


//document.i18n.define('longDate', 'datetime', {month: 'long'});
//var f = document.i18n.get('longDate');

//document.i18n.observe('longDate', foo);

//document.i18n.handleEvent(new CustomEvent('moztimechange'));

//document.i18n.unobserve('longDate', foo);
//window.dispatchEvent(new CustomEvent('moztimechange'));
