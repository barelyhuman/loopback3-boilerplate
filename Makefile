APP_NAME=culture-nut
# Figure out a way to put all of this in package.json

run:
	npm start

install:
	npm install

push:
	git add --all
	git commit
	git push -u origin stable
	
pull:
	git pull -v origin stable

update:
	make pull
	make restart

pm2-start:
	pm2 start server/server.js --name $(APP_NAME)

stop:
	pm2 stop $(APP_NAME)

restart:
	pm2 restart $(APP_NAME)

logs:
	pm2 logs $(APP_NAME)

# Database.
db:
	npm run db

# Builds
docker-build:
	npm run build:docker

# Deployments
deploy:
	npm run deploy

deploy-appengine:
	npm run deploy:appengine
