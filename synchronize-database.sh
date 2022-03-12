#!/bin/bash

docker exec -it enterprises-api node ./src/models/sequelize.sync.js
