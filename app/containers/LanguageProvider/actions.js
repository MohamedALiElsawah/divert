/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE } from './constants';

export default function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
export const changeLocale2 = languageLocale => ({
  type: CHANGE_LOCALE,
  locale: languageLocale,
});
