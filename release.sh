#!/bin/bash
# 使用方法：npm run release $1(本次上线的关键信息，若不填写，默认为执行该脚本时的日期) $2(第二个参数为所需发布版本选项)

CDATE=`date +'%Y%m%d%H%M%S'`

# 更新项目版本，默认patch版本
if [ -n "`git status --porcelain`" ]; then
 echo "repo is not clean or not sync with remote yet, please commit&push first"
 exit 1
fi

if [ -z "$2" ]
then
  type='patch'
else
  type=$2
fi

npm version $type -m '[release] npm: @%s'-$CDATE
echo "publish version finished"

git push
echo "push version info finished"

#支持
if [ "$1" ]
then
  tag_name="$CDATE-$1"
else
  tag_name="$CDATE"
fi

git tag $tag_name
echo "git tag $tag_name finished"

git push origin $tag_name
echo "git push origin $tag_name finished"