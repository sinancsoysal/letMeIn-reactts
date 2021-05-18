#!/bin/sh
npm run build
#serve -s --ssl-cert src/server.cert --ssl-key src/server.key build
serve -s build
