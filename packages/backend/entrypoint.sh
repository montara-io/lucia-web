#!/bin/bash
#ssm entrypoint version:1.5 (any service)
app=$1
env=$2
# put all vars from yaml into a list
cp templates/$app-appconfig.yaml config/$env-$app-appconfig.yaml
varlist=`cat config/$env-$app-appconfig.yaml | grep -ho '${.[a-z].*' | sed 's/[^a-zA-Z0-9^_]//g'`
# in MNTSECRET the csi drv will mount all the keys
echo find in appconfig  : $varlist

for item in ${varlist}
do
#check if value exists
   ls /mnt/secrets-store/*$item*
   if [ $? -eq 0 ]; then
      secretitem=$(cat /mnt/secrets-store/$env_*_$item | sed -e 's/^[[:space:]]*//g' -e 's/[[:space:]]*\$//g' | sed 's/[\*\.&]/\\&/g')
      sed -i -e s%'${'$item'}'%"$secretitem"%g config/$env-$app-appconfig.yaml
   else
      missingvalues+=("$item")
   fi
done   
# check if app can start 
   if [ -z "$missingvalues" ]; then
      echo look safe $app is starting in $env
      npm run start:prod
   else
      echo ERROR missing configuration properties in $app, will not start app
      echo the missingvalues are :  ${missingvalues[@]}
   fi