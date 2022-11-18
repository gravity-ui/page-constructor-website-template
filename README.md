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

## Development <a name="dev"></a>

```bash
npm ci

npm run dev
```

## Production <a name="prod"></a>

```bash
npm ci

npm run build

npm run start
```

## Environment variables

You can define environment variables for dev-mode in `.env.local` file within project root.

`ALLOW_ROBOTS` - allow search engine robots to index your app;

`APP_ENV` - environment `prod`, `preprod` or `dev`;

`DISABLE_LOGGING` (optional) - turn logging off;

`LOGGING_LEVEL` (optional) - set logging level (default `debug`). [More about logging level](https://getpino.io/#/docs/api?id=level-string);

`PAGES_CACHE_TIME` (optional) - page data cache living time in production;

`NAVIGATION_CACHE_TIME` (optional) - navigation data cache living time in production;

Environment variables used on your Development VM:

`DEV_MODE` - enables dev mode;

## Content

To use custom api for getting page data implement method returning value of type `ContentResponseType` and export it from `src/server/api/pages-data/impl.js`.

```typescript
interface ContentResponseType {
  statusCode: 200 | 404 | 500;
  error?: string;
  data?: ConstructorPageContent;
}
```
