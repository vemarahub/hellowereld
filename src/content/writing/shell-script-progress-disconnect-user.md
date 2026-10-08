---
title: '  Shell Script - Progress Disconnect User'
description: 'Script : Disconnect user from database Script Name: disconnect.sh Script Function: Disconnect users from databases using "proshut" Required Files: 1.'
date: 2020-03-25
tags: ['database-user-disconnect', 'progress', 'shell-scripting']
featured: false
topic: 'Progress/OpenEdge'
order: 999
---

  
**Script :** Disconnect user from database  
  
**Script Name:** disconnect.sh  
  
**Script Function:**  Disconnect users from databases using "proshut"  
  
**Required Files:**  1. usr.registry - in the $HOME/bin path containing database details uder the below headers  
DB  DBPATH  PF-File  
2\. disconnect.p  
  
  
**Script Usage:** ./disconnect.sh \[ -h help\] \[ -d devicename \] \[ -p pid \] \[ -n username \] \[ -u usernumber \]  
**Code:**  
**disconnect.sh**  
  
#!/bin/bash  

STARTDIR=$HOME/bin

DBREG=$STARTDIR/usr.registry

DLC=/usr/dlc;export DLC

DLCPATH=$DLC/bin

PROMSGS=$DLC/promsgs;export PROMSGS

PROTERMCAP=$DLC/protermcap;export PROTERMCAP

TERM=vt100

PATH=$PATH:$DLCPATH;export PATH

display\_banner=no

  

usage() {

echo "Syntax is: $0"

echo "           \[ -h \] (Shows this help page)"

echo "           \[ -d devicename \]"

echo "           \[ -p pid \]"

echo "           \[ -n username \]"

echo "           \[ -u usernumber \]"

exit

}

  

cleanfiles() {

rm -f $tmpfile 2>/dev/null

rm -f $tmpfile2 2>/dev/null

}

  

if \[ $# -eq 0 \]

then

  usage

fi

  

devicename=

pid=

username=

userid=

  

while getopts ":d:p:n:u:h:" option

do

case $option in

   d)

   devicename="$OPTARG"

   ;;

   p)

   pid="$OPTARG"

   expr $pid + 0 > /dev/null 2>&1

   if \[ $? -ne 0 \]

   then

     echo "PID should be numeric only..."

     exit

   fi

   ;;

   n)

   username="$OPTARG"

   ;;

   u)

   userid="$OPTARG"

   expr $userid + 0 > /dev/null 2>&1

   if \[ $? -ne 0 \]

   then

     echo "User ID should be numeric only..."

     exit

   fi

   ;;

   h)

   usage

   ;;

   \*)

   usage

   ;;

esac

done

  

PARMS="$devicename,$pid,$username,$userid"

  

if \[ "$PARMS" = ",,," \]

then

  usage

fi

  

cd $STARTDIR

  

if \[ ! -f $DBREG \]

then

  echo "$DBREG is missing. It should have the entry like below format. Under the same header"

  echo "DB  DBPATH  PF-File"

  echo "Script exiting"

  exit

fi

  

tmpfile=/tmp/disconnect.$$.txt

export tmpfile2=/tmp/disconnect2.$$.txt

  

cat $DBREG |grep -v DB|

while read line

do

  DBNAME=\`echo $line|awk -F" " '{print $1}'\`

  DBPATH=\`echo $line|awk -F" " '{print $2}'\`

  

  if \[ ! -f $DBPATH/$DBNAME.db \]

  then

    echo "DB name is not valid $DBPATH/$DBNAME"

    cleanfiles

    exit

  fi

  

  echo "Connections from $DBPATH/$DBNAME:" >> $tmpfile

  $DLCPATH/\_progres -b $DBPATH/$DBNAME -p disconnect.p -param "$PARMS" >> $tmpfile

  echo >> $tmpfile

  

done

  

cat $tmpfile

  

fromtime=$SECONDS

ans=n

echo "Do you want to disconnect the users above? y/n (Default is 'n')"

echo "You have 4 seconds to respond..."

read ans

if \[ "$ans" = "y" -o "$ans" = "Y" \]

then

  totime=$SECONDS

  if \[ \`expr $totime - $fromtime\` -gt 4 \]

  then

    echo "Timeout expired, exiting..."

    cleanfiles

    exit

  fi

  cat $tmpfile2 |

  while read db usrno

  do

    echo $db $usrno

    $DLCPATH/proshut $db -C disconnect $usrno

  done

fi

  

cleanfiles

  

**disconnect.p**

define variable l\_connect-name   like \_connect-name no-undo.

define variable l\_connect-usr    like \_connect-usr no-undo.

define variable l\_connect-pid    like \_connect-pid no-undo.

define variable l\_connect-device like \_connect-device no-undo.

define variable l\_answer         as logical no-undo.

  

assign l\_connect-device = entry(1,session:parameter)

       l\_connect-pid    = integer(entry(2,session:parameter))

       l\_connect-name   = entry(3,session:parameter)

       l\_connect-usr    = integer(entry(4,session:parameter)).

  

define stream a.

output stream a to value(os-getenv("tmpfile2")) append.

  

for each \_connect where \_connect-usr <> ?

                    and \_connect-name <> "progress"

                    and \_connect-name = (if l\_connect-name = "" then

                                            \_connect-name

                                         else

                                            l\_connect-name)

                    and \_connect-usr  = (if l\_connect-usr = 0 then

                                            \_connect-usr

                                         else

                                            l\_connect-usr)

                    and \_connect-pid = (if l\_connect-pid = 0 then

                                           \_connect-pid

                                        else

                                           l\_connect-pid)

                    and \_connect-device = (if l\_connect-device = "" then

                                           \_connect-device

                                        else

                                           l\_connect-device)

                    no-lock:

    display \_connect-usr \_connect-name format "x(12)" \_connect-pid 

            \_connect-device.

    put stream a unformatted pdbname(1) " " \_connect-usr skip.

end.

  

output stream a close.

quit.