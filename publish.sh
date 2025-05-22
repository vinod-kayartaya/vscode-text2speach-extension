git add .
git commit -m "$1"
git push origin master

vsce package
vsce publish