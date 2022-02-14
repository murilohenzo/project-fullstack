build:
	docker-compose up -d

down:
	docker-compose down --rmi all

pull:
	gco main && git pull origin main