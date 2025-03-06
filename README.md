# Surviving Maps 3D

A visualization tool for the [Surviving Mars](https://www.paradoxinteractive.com/games/surviving-mars/about) game.

![Screenshot](https://i.imgur.com/MIy6tBh.png)

It displays Mars' surface in 3D, with the ability to zoom in and out, and rotate the planet. Clicking the surface will place a marker at the clicked location and display the information for the selected coordinates. Coordinates can be also manually entered, or chosen from a filtered list of locations. 3D map is disabled on mobile devices by default, but can be enabled in the settings. Settings also include a language selector.

## Deployment

The project is deployed on [survivingmaps.space](https://survivingmaps.space/) and hosted on [Vercel](https://vercel.com/). If anything happens to it, you can always deploy it yourself by following the steps below.

### Prerequisites

- Node.js 18.x
- Git
- pnpm (optional, preferred)

### Setup

1. Clone the repository
2. Install dependencies

```bash
pnpm install
```

3. Create a `.env` file in the root directory and add the following variables:

```js
// Authorisation is needed to log into the admin panel
// Create a Discord Oauth and grab both from there
// Edit env.js and /server/auth/config.ts to change the auth methods
// I used Discord and an email server, but you do you
AUTH_SECRET = ""; // any string
NEXTAUTH_URL = ""; // your domain
AUTH_DISCORD_ID = "";
AUTH_DISCORD_SECRET = "";
EMAIL_SERVER = "";
EMAIL_SERVER_USER = "";
EMAIL_SERVER_PASSWORD = "";
EMAIL_SERVER_HOST = "";
EMAIL_SERVER_PORT = "";
EMAIL_FROM = "";

// your Postgres database credentials
POSTGRES_URL = "";
```

4. Run the project

```bash
pnpm dev
```

5. Seed the database.
   Run this command to create the structure in your database:

```bash
pnpm db:push
```

Make sure that the required CSVs are in the /public/mapdata directory:

```
Evans_GP.csv
Picard_BB.csv
Picard_GP.csv
Picard_GP_BB.csv
Picard.csv
Tito_GP.csv
```

And following CSVs in the /public/strings directory:

```
bt.csv
bt_desc.csv
locations.csv
```

- A. Log into the admin panel, navigate to Breakthroughs tab and click "Seed Breakthroughs". Watch your console for any errors.
- B. If everything goes well, you can now navigate to Named Locations tab and click "Seed Named Locations". Watch your console for any errors.
- C. If everything goes well, you can now navigate to Locations tab and click "Seed Locations".

The process can take a long time. Watch your console for any errors.
If something goes wrong, you're on your own pal, get good.

If there are new versions of the game, add new CSVs to the directory and follow the steps above.

Once you're done seeding the database, you can proceed to deploying the project.

## Vercel Deployment

There's nothing special in the process, just fork this repo, create a project on Vercel and add your environment variables. You can also host your database there.

## Deployment on a VPS

You can also deploy the project on a server. The only thing you need to do is to install Node.js and NPM, and then install the project dependencies. I would also recommend using Nginx and PM2. Here's the gist of how to do it.

1. Install Node.js
2. Install nginx

```bash
sudo apt install nginx -y
cd /etc/nginx
sudo chmod -R 777 .
```

3. Edit Nginx config

```js
server {
    server_name *your IP* *your domain*;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. Create a link and reload Nginx

```bash
sudo ln -s /etc/nginx/sites-available/nextjs.conf /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
sudo service nginx restart
```

5. Install the web app

```bash
sudo mkdir /var/www/nextjs
cd /var/www/nextjs
sudo chmod -R 777 .
sudo apt install gh
sudo gh auth login
sudo gh repo clone Ocelloid/surviving-maps-3d
cd surviving-maps-3d
sudo npm install -g pnpm
pnpm install
```

7. Install the database

```bash
sudo apt install postgresql
sudo -u postgres createuser --superuser $USER
sudo -u postgres createdb $USER
sudo -u postgres createdb next-js
sudo -i -u postgres
psql
```

```sql
ALTER USER user WITH PASSWORD 'password';
GRANT ALL ON DATABASE “next-js” TO user;
ALTER DATABASE “next-js” OWNER TO user;
```

6. Add the database URL to the .env file

```js
POSTGRES_URL =
  "postgres://username:password@127.0.0.1:5432/next-js?sslmode=require";
```

7. Generate and seed the database

```bash
pnpm db:push
```

See step 5 from "Setup" section if you didn't seed the database yet. 8. Build the project and set up pm2

```bash
sudo pnpm build
sudo npm install -g pm2
sudo pm2 start pnpm --name “nextjs” -- start
sudo pm2 startup
sudo pm2 save
```

9. Install the SSL certificate

```bash
sudo snap install core; sudo snap refresh core
sudo apt-get remove certbot
sudo snap install -classic certbot
sudo ln -s /snap/bin/certbot /user/bin/certbot
sudo certbot --nginx
sudo service nginx restart
```
