#!/bin/bash
yarn db:migration:generate "Generate tables and migrations"
yarn db:migration:run
yarn db:migration:to-js

#DEV
yarn start:dev

#Prod
#yarn start:prod
