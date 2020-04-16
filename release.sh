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

npm version $type -m `[release] npm: @%s-$CDATE`
