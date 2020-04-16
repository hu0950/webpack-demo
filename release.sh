#!/bin/bash

CDATE=`date +'%Y%m%d%H%M%S'`

if [ -n "`git status --porcelain`" ]; then
 echo "repo is not clean or not sync with remote yet, please commit&push first"
 exit 1
fi

if [ -z "$2" ]
then
  type='patch'
else
  type=$1
fi

npm version $type -m '[release] npm: @%s-$CDATE'

git push

if [ "$2" ]
then
  tag_name="v$1-$CDATE"
else
  tag_name="v$CDATE"
fi

echo "git tag $tag_name"
git tag $tag_name

echo "git push origin $tag_name"
git push origin $tag_name

