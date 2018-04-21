import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import pt from 'javascript-time-ago/locale/pt';

const locales = { en, pt };

export const setLocale = locale => TimeAgo.locale(locales[locale]);
