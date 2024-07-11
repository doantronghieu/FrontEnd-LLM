# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

``` bash
npx nuxi@latest init FrontEnd-LLM
cd FrontEnd-LLM/

npm install

npm install pm2@latest -g
npx nuxi@latest module add content
npx nuxi@latest module add ui
npx nuxi@latest module add image
npm i @pinia/nuxt
npm i pinia -f
npm i -D @iconify-json/material-symbols
npm i @nuxtjs/axios
npm i marked
npm i openai
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

```bash
npm run build # Build the application for production
npm run preview # Locally preview production build
node ./server/index.mjs # production deployment

pm2 start .output/server/index.mjs
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Docker

```bash
docker build -t doantronghieu/llm-nuxtjs:latest -f Dockerfile.nuxtjs

docker push doantronghieu/llm-nuxtjs:latest

docker run -d -p 3000:3000 --name nuxtjs-app nuxtjs-app
```

### For VTC

```bash
docker build -t doantronghieu/vtc-llm-nuxtjs:latest -f Dockerfile.nuxtjs

docker push doantronghieu/vtc-llm-nuxtjs:latest
```
