# hilton-reserve

## setup
new file ``.env``
```
MONGO_HOST=********
MONGO_PORT=********
MONGO_USER=********
MONGO_PASSWORD=********
MONGO_DB_NAME=********
JWT_SECRET=********
```

## start
``` shell
cd server
npm i
npm run start
```
add admin
``` shell
curl --location --request POST 'http://localhost:3000/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "account": "admin",
    "password": "123456",
    "role": 0
}'
```
add guest
``` shell
curl --location --request POST 'http://localhost:3000/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "account": "guest",
    "password": "123456",
    "role": 1
}'
```

## documentation
``http://localhost:3000/api/#/``