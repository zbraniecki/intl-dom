export const knownObjects = {
  datetime: {
    create: function (options) {
      const resolvedOptions = Object.assign({}, options);

      if (resolvedOptions.hour) {
        resolvedOptions.hour12 = navigator.mozHour12;
      }

      return Intl.DateTimeFormat(navigator.languages, resolvedOptions);
    },
    isTypeAffected: function (reason) {
      return [
        'timeformatchange',
        'languagechange',
        'moztimechange'].includes(reason);
    },
    isAffected: function (reason, options) {
      if (reason === 'languagechange' || reason === 'moztimechange') {
        return true;
      }

      if (reason === 'timeformatchange') {
        return 'hour' in options;
      }

      return false;
    }
  },
  number: {
    create: function (options) {
      const resolvedOptions = Object.assign({}, options);

      return Intl.NumberFormat(navigator.languages, resolvedOptions);
    },
    isTypeAffected: function (reason) {
      return ['languagechange'].includes(reason);
    },
    isAffected: function (reason, options) {
      return reason === 'languagechange';
    }
  },
  collator: {
    create: function(options) {
      return Intl.Collator(navigator.languages, options);
    },
    isTypeAffected: function (reason) {
      return ['languagechange'].includes(reason);
    },
    isAffected: function(obj, reason) {
      return reason === 'languagechange';
    }
  },
  mozdatetime: {
    create: function(options) {
      const resolvedOptions = Object.assign({}, options);

      if (resolvedOptions.hour) {
        resolvedOptions.hour12 = navigator.mozHour12;
      }

      return mozIntl.DateTimeFormat(navigator.languages, resolvedOptions);
    },
    isTypeAffected: function (reason) {
      return [
        'timeformatchange',
        'languagechange',
        'moztimechange'].includes(reason);
    },
    isAffected: function(obj, reason) {
      if (reason === 'languagechange' || reason === 'moztimechange') {
        return true;
      }

      if (reason === 'timeformatchange') {
        return 'hour' in options;
      }

      return false;
    }
  },
  mozduration: {
    create: function(options) {
      return mozIntl.DurationFormat(navigator.languages, options);
    },
    isAffected: function(obj, reason) {
      return reason === 'languagechange';
    }
  },
};
