---
title: 'Shell Script - Database Stop'
description: 'Script : Progress Database Stop Script Name: stoppro.sh Script Function: To stop the database instance and optionally truncate bi (-t) Script Usage:'
date: 2020-03-26
tags: ['stop-database', 'progress', 'shell-scripting']
featured: false
---

  
**Script :** Progress Database Stop  
  
**Script Name:** stoppro.sh  
  
**Script Function:** To stop the database instance and optionally truncate bi (-t)  
  
**Script Usage:** ./stoppro.sh < db path > \[-t\]  
  
**Code:**  

  

  

#!/bin/sh

JOB\_ID=stoppro

set +x

. /pro/admin/ctl/setenv.pro

MinT=$2

  

  

#-----------------------------------------------------------------------------#

\# Is database running?                                                        #

#-----------------------------------------------------------------------------#

type proutil

echo '>>' "proutil ${1} -C busy"

proutil ${1} -C busy &&

      { echo "INFO: ${1} not stopped. (already down)"

        exit 0 ;}

  

#-----------------------------------------------------------------------------#

\# Stop database                                                               #

#-----------------------------------------------------------------------------#

echo

echo "Attention!! This will shutdown the database " ${1}

echo " Do you want to continue with shutdown? Y/N"

read ip

  

if \[ $ip == "Y" \]

then

        type proshut

        echo '>>' "proshut ${1} -by"

        proshut ${1} -by ||

                { echo "ERROR: during proshut, see ${1}.lg for details"

                exit 1 ;}

  

#-----------------------------------------------------------------------------#

\# if -t on command line first truncate BI file.                               #

#-----------------------------------------------------------------------------#

        if \[\[ "${MinT}" = "-t" \]\]

        then

                echo

                echo "truncate BI start"

                proutil ${1} -C truncate BI     || exit 1

                echo "truncate BI ready"

        fi

fi

exit 0

#=============================================================================#

\# EOF                                                                         #

#=============================================================================#