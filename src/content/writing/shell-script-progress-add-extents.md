---
title: 'Shell Script - Progress Add Extents'
description: 'Script : Progress add new extents Script Name: addextent.sh Script Function: Add new extent to the database provided in the add.st file in database path after'
date: 2020-03-26
tags: ['database', 'extents', 'progress', 'shell-scripting']
featured: false
topic: 'Progress/OpenEdge'
order: 999
---

  
**Script :** Progress add  new extents  
  
**Script Name:** addextent.sh  
  
**Script Function:** Add new extent to the database provided in the add.st file in database path after shutting down the database and restarting after extents are added.  
  
**Required Files:**  stoppro.sh, startpro.sh, add.st  
  
**Script Usage:** ./addextent.sh < path to db > < db name >  
  
**Code:**  
#!/bin/bash  
JOB\_ID=autoextent  
set +x  
  
. /pro/admin/ctl/setenv.pro  
dbpath=$1  
dbname=$2  
db=$1"/"$2  
  
echo "You are going to shutdown the database and add follow extents to the database"  
echo ""  
cat $dbpath/add.st  
echo ""  
echo "Do you want to Continue? Y/N"  
read ip  
  
if \[ ${ip} = "Y" \]  
then  
#-----------------------------------------------------------------------------#  
#  update structure description file                                          #  
#-----------------------------------------------------------------------------#  
prostrct list $db $db.st  
  
#-----------------------------------------------------------------------------#  
#  stop db                                                                    #  
#-----------------------------------------------------------------------------#  
  
stoppro.sh $db -t  
  
#-----------------------------------------------------------------------------#  
#  add extent                                                                 #  
#-----------------------------------------------------------------------------#  
prostrct add $db $dbpath/add.st  
  
#-----------------------------------------------------------------------------#  
#  start db                                                                   #  
#-----------------------------------------------------------------------------#  
startpro.sh $db $db.pf  
  
#-----------------------------------------------------------------------------#  
#  update structure description file                                          #  
#-----------------------------------------------------------------------------#  
prostrct list $db $db.st  
  
#-----------------------------------------------------------------------------#  
\# Perform backup                                                              #  
#-----------------------------------------------------------------------------#  
#/pro/admin/bin/backup.sh /pro/admin/gall/prd/multistore/pmultistore cold -s -fok  
echo "Extent addition completed Succesfully!!"  
  
fi  
#=============================================================================#  
\# EOF                                                                         #  
  
#=============================================================================#