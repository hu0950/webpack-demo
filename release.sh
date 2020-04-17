#!/bin/bash
# 使用方法：npm run release $1(本次上线的关键信息，若不填写，默认为执行该脚本时的日期) $2(第二个参数为所需发布版本选项)

DATE=`date +'%Y%m%d%H%M%S'`

# 更新项目版本，默认patch版本
if [[ -n "`git status --porcelain`" ||  -n "`git diff master origin/master --name-only`" ]]; then
  echo "Tip: repo is not clean or not sync with remote yet, please commit&push first"
  exit 1
fi

set -e
echo "Which type of release will you publish? Suggestion：patch-fix bugs;\n minor-publish new functions;\n major-break change,eg: reconstruction or large version requirements iteration and so on"
select release_type in "patch" "minor" "major" ; do
    npm version $release_type -m '[release] npm: %s'-$DATE
    echo "publish version finished"
    break
done

git push
echo "push version info finished"

#标记tag
if [ "$1" ]
then
  tag_name="$DATE-$1"
else
  echo "Tip: please add online information, eg: npm run release [online information]"
  exit 1
fi

git tag $tag_name
echo "git tag $tag_name finished"

git push origin $tag_name
echo "git push origin $tag_name finished"