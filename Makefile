build:
	docker-compose up -d

down:
	docker-compose down --rmi all

pull:
	git checkout $(chk) && git pull origin $(chk)
