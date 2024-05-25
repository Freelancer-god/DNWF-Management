import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import vi from './locales/vi/translations.json'
import en from './locales/en/translations.json'

i18n.use(initReactI18next).init({
    fallbackLng: 'vi',
    lng: 'vi',
    resources: {
        vi: vi,
        en: en
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

i18n.languages = ['vi', 'en'];

export default i18n;
