#!/bin/bash
shellRoot=$(cd "$(dirname "$0")";pwd)

_gitProjectRoot="../numas.ltd/solitaire_ios/"
echo "1 >> 拷贝 remote-assets 到 ${_gitProjectRoot}"

cp -R ./remote-assets ${_gitProjectRoot}
cd ${_gitProjectRoot}


# get the argument message
commit_message=""

# If no commit message is passed, use current date time in the commit message
if [[ -z "${commit_message// }" ]]
    then
        commit_message=$(date '+%Y-%m-%d %H:%M:%S')
fi

# stage all changes
git add -A
echo "====staged all git files"

# add commit
git commit -m "$commit_message"
echo "====added the commit with message: '$commit_message'"

# get current branch and push
current_branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
git push origin "$current_branch"
echo "====pushed changes to '$current_branch' branch"


cd ${shellRoot}
