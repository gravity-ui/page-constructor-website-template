# Next.js + page-constructor template

Template for multi-page SSR website with dynamic content

Links:

[Next.js](https://nextjs.org/)

[page-constructor](https://github.com/gravity-ui/page-constructor)

## Create project from template

```bash
npx create-next-app@latest <my-app> --example https://github.com/gravity-ui/page-constructor-website-template

cd my-app

rm -rf .git
```

## Build modes

Template supports two build modes:

1. [Server side rendering (SSR)](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering)

This mode is set by default.

### Development

```bash
npm ci

npm run dev
```

### Production

```bash
npm ci

npm run build

npm run start
```

2. [Static site generation (SSG)](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)

SSG mode supports now only one locale, to set it use `EXPORT_LOCALE` env variable.

### Development

```bash
npm ci

npm run dev:export
```

### Production

```bash
npm ci

# generate static production build and puts it to `out` folder.
npm run build:export

# run this locally to check everyting works in production mode
npm run start:export
```

## Environment variables

You can define environment variables for dev-mode in `.env.local` file within project root.

`ALLOW_ROBOTS` - allow search engine robots to index your app;

`APP_ENV` - environment `prod`, `preprod` or `dev`;

`DISABLE_LOGGING` (optional) - turn logging off;

`LOGGING_LEVEL` (optional) - set logging level (default `debug`). [More about logging level](https://getpino.io/#/docs/api?id=level-string);

`PAGES_CACHE_TIME` (optional) - page data cache living time in production;

`NAVIGATION_CACHE_TIME` (optional) - navigation data cache living time in production;

`EXPORT_MODE` (optional) - boolean, sets export mode on

`EXPORT_LOCALE`(optional) - sets locale for export mode

`DEV_MODE` - enables dev mode;

`SITE_URL` - site url, it will be used for creating sitemap

## Content

By default website template keeps it's content inside `content` folder in `.yaml` files, splitted by locales, e.g `content/en`, `content/fr`

There are two types of content files:

- `pages` - each file in the directory represents website page. Page url is defined by file name and path (`pages` folder equals to the site root). Page file data format is compatible with page-constructor [content](https://github.com/gravity-ui/page-constructor?tab=readme-ov-file#parameters)

- `data` files keep whole site related data (navigation, meta, analytics configuration, etc). Navigtion file format is compatible with page-constructor [navigation](https://github.com/gravity-ui/page-constructor?tab=readme-ov-file#parameters)

### Custom api

To use custom api for getting page data implement method returning value of type `ContentResponseType` in `src/server/api/pages-data/implementations/` folder and export it from `src/server/api/pages-data/impl.js`.

```typescript
interface ContentResponseType {
  statusCode: 200 | 404 | 500;
  error?: string;
  data?: ConstructorPageContent;
}
```

## Sitemap and Robots.txt

### Default mode

1. Set the SITE_URL for sitemap
2. You can find sitemap in src/pages/server-sitemap.xml

### For SSG mode (EXPORT_MODE)

1. Set the SITE_URL for sitemap
2. Every build we use next-sitemap to auto-generate sitemap and robots

### If sitemap is not necessary

1. For SSG mode (EXPORT_MODE) - fix command `build:export` in package.json and remove src/pages/server-sitemap.xml
2. For Default mode - remove src/pages/server-sitemap.xml
