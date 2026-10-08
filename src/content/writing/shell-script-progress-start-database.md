---
title: 'Shell Script - Progress Start Database'
description: 'Script : Progress start a database instance Script Name: startpro.sh Script Function: Start a database instance of progress with a pf file. Script Usage:'
date: 2020-03-26
tags: ['database-start', 'progress', 'shell-scripting']
featured: false
---

  
**Script :** Progress start a database instance  
  
**Script Name:** startpro.sh  
  
**Script Function:** Start a database instance of progress with a pf file.  
  
**Script Usage:** ./startpro.sh < db path >  
  
**Code:**  

  

#!/bin/sh

JOB\_ID=startpro

set +x

. /pro/admin/ctl/setenv.pro

MinI=""

MinS=""

MinT=""

bForce="0"

  

  

#-----------------------------------------------------------------------------#

\# database down ?                                                             #

#-----------------------------------------------------------------------------#

echo

type proutil

echo '>>' "proutil ${1} -C busy"

proutil ${1} -C busy ||

      {

       if \[\[ "${bForce}" = "1" \]\]

       then

          ${proAdmin}bin/stoppro.sh  ${1} || exit 1

       else

          echo "WARNING: ${1} not started. (already running?)"

          exit 0

       fi ;}

  

#-----------------------------------------------------------------------------#

\# OK, just a notice                                                           #

#-----------------------------------------------------------------------------#

#(( "$\_isDefaultPf" == 1 )) && echo "INFO: default .pf file used (${\_lpfnam})"

if \[ $# == 1 \]  
then  
 pf=${1}.pf  
fi

  

#-----------------------------------------------------------------------------#

\# if -t on command line first truncate BI file.                               #

#-----------------------------------------------------------------------------#

if \[\[ "${MinT}" = "-t" \]\]

then

   echo "truncate BI start"

   proutil ${1} -C truncate BI     || exit 1

   echo "truncate BI ready"

fi

  

#-----------------------------------------------------------------------------#

\# if -s on command line first switch logfiles.                                #

#-----------------------------------------------------------------------------#

if \[\[ "${MinS}" = "-s" \]\]

then

   echo "Switching logfiles start"

   \[\[ -r "${1}.lg\[-6\]" \]\] && mv ${1}.lg\[-6\] ${1}.lg\[-7\]

   \[\[ -r "${1}.lg\[-5\]" \]\] && mv ${1}.lg\[-5\] ${1}.lg\[-6\]

   \[\[ -r "${1}.lg\[-4\]" \]\] && mv ${1}.lg\[-4\] ${1}.lg\[-5\]

   \[\[ -r "${1}.lg\[-3\]" \]\] && mv ${1}.lg\[-3\] ${1}.lg\[-4\]

   \[\[ -r "${1}.lg\[-2\]" \]\] && mv ${1}.lg\[-2\] ${1}.lg\[-3\]

   \[\[ -r "${1}.lg\[-1\]" \]\] && mv ${1}.lg\[-1\] ${1}.lg\[-2\]

   \[\[ -r "${1}.lg" \]\]     && mv ${1}.lg     ${1}.lg\[-1\]

   >  ${1}.lg

   echo "Switching logfiles ready"

fi

  

#-----------------------------------------------------------------------------#

\# start the server for this database                                          #

#-----------------------------------------------------------------------------#

type proserve

echo '>>' "proserve ${1} -pf $pf ${MinI}"

proserve ${1} -pf $pf ${MinI} ||

       { echo "ERROR: during proserve, see ${1}.lg for details."

         exit 1 ;}

  

echo "${1} started."

  

#-----------------------------------------------------------------------------#

\# optional writers to do ?                                                    #

#-----------------------------------------------------------------------------#

\[\[ -z "${\_dbwriters}" \]\] && exit 0

  

typeset -u writer

typeset -i aaStarted

typeset -i abStarted

#-----------------------------------------------------------------------------#

#  V1.2.0  APW added..                                                        #

\# For both the AIW and BIW, progress will exit 0, even if not started         #

\# we have to examine the .lg file.                                            #

#     aaStarted == #Starts before                                             #

#     abStarted == #Starts after we started the writer.                       #

#  so: abStarted minus aaStarted MUST be 1.                                   #

#                                                                             #

\# The sleeps are only there to avoid the writer and server logging getting    #

\# mixed up.                                                                   #

#-----------------------------------------------------------------------------#

for writer in $(echo ${\_dbwriters} | sed 's/,/ /g')

 do

    case "${writer}" in

       AI|AIW)

         sleep 3

  

         aaStarted=$(grep AIW ${1}.lg | grep -i Started | wc -l)

  

         echo

         type proaiw

         echo '>>' "proaiw ${1}"

         proaiw ${1} ||

              { echo "ERROR: during proaiw ${1}, AI writer not stared."

                continue ;}

  

         abStarted=$(grep AIW ${1}.lg | grep -i Started | wc -l)

  

         if (( $(($abStarted - $aaStarted)) != 1 ))

         then

            echo "ERROR: during proaiw ${1}, AI writer not stared."

         else

            echo "AI writer started."

         fi

         continue

       ;;

  

       BI|BIW)

         sleep 3

  

         aaStarted=$(grep BIW ${1}.lg | grep -i Started | wc -l)

  

         echo

         type probiw

         echo '>>' "probiw ${1}"

         probiw ${1} ||

              { echo "ERROR: during probiw ${1}, BI writer not stared."

                continue ;}

  

         abStarted=$(grep BIW ${1}.lg | grep -i Started | wc -l)

  

         if (( $(($abStarted - $aaStarted)) != 1 ))

         then

            echo "ERROR: during probiw ${1}, BI writer not stared."

         else

            echo "BI writer started."

         fi

  

         continue

       ;;

  

       AP|APW)

         sleep 3

         aaStarted=$(grep APW ${1}.lg | grep -i Started | wc -l)

  

         echo

         type proapw

         echo '>>' "proapw ${1}"

  

         proapw ${1} ||

              { echo "ERROR: during proapw ${1}, AP writer not stared."

                continue ;}

  

         abStarted=$(grep APW ${1}.lg | grep -i Started | wc -l)

      if (( $(($abStarted - $aaStarted)) != 1 ))

         then

            echo "ERROR: during proapw ${1}, AP writer not stared."

         else

            echo "AP writer started."

         fi

  

         continue

       ;;

  

       \*)

         echo

         echo "WARNING: Invalid writer specified (${writer}), ignored."

         continue

       ;;

    esac

done

#-----------------------------------------------------------------------------#

\# EOF ------------------------------------------------------------------------#

#-----------------------------------------------------------------------------#