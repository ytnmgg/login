#!/bin/bash

set -e

pem=/Users/rick.wl/Desktop/rick01.pem
remote_path=/data/app/front/static

echo "start to build project..."
npm run build

echo "start to deploy files to app..."

echo "deploy others..."
scp -i $pem -r ./build/static/* root@47.99.61.11:$remote_path

echo "done!"