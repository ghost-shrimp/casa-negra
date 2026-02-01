import { getRequestConfig } from "next-intl/server";

const locales = ['en', 'es']

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale

    if (!locale || !locales.includes(locale)) {
        locale = "en";
    }

    const messages = {
        common: (await import(`../messages/${locale}/common.json`)).default,
        home: (await import(`../messages/${locale}/home.json`)).default,
        about: (await import(`../messages/${locale}/about.json`)).default,
        post: (await import(`../messages/${locale}/post.json`)).default,
        art: (await import(`../messages/${locale}/art.json`)).default,
        events: (await import(`../messages/${locale}/events.json`)).default,
        store: (await import(`../messages/${locale}/store.json`)).default,
    }

    return {
        locale,
        messages,
    };
});