build:
	docker-compose up -d

down:
	docker-compose down --rmi all

clear_containers:
	docker rm -f $(docker ps -a -q)

clear_images:
	docker rmi -f $(docker images -q)


clear_volume:
	docker volume rm $(docker volume ls -q)

pull:
	git checkout $(chk) && git pull origin $(chk)
