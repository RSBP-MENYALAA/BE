# **How to run program**

**Install Dependencies**

```
npm install
```

**Run dev mode with autoreload**

```
npm run dev
```

**Build App**

```
npm run build
```

**Run Machine Learning Container (Docker Desktop)**

```
npm run up:ml:windows
```

**Run Machine Learning Container (Docker Linux)**

```
npm run up:ml:linux
```

**Run builded app with dev env**

```
npm run start:dev
```

This will load the `.env.development` file.

**Run builded app with prod env**

```
npm run start:prod
```

This will load the `.env.production` file.

**Run builded app with dev env and pm2**

```
npm run deploy:dev
```

This will load the `.env.development` file and execute the program using `pm2`.

**Run builded app with prod env and pm2**

```
npm run deploy:dev
```

This will load the `.env.production` file and execute the program using `pm2`.

