#!/usr/bin/env bash

yarn build &&
cd build &&
git init  &&
git add . &&
git commit -m 'deploy-update' &&
git remote add origin git@github.com:wuwenbang/lemon-money-react-website.git &&
git remote add gitee git@gitee.com:wuwenbang/lemon-money-react-website.git &&
git push -u origin master -f
git push gitee -f
cd -