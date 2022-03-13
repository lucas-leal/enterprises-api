#!/bin/bash

docker exec -it enterprises-api node ./src/db/refresh.db.js
