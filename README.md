## Steps to Push to docker hub
- docker login:

```sh
docker login
```

- Build Production image:

```sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

- push to dockerhub:

```sh
docker push livipst2/app:latest
```

test image build, pls work