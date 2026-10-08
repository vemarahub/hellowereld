---
title: 'Shell Script - Check Area Utilization'
description: 'Script : Progress database area utilization Script Name: progressarearpt.sh Script Function: Get the Actual DB Size,get Max area size & current utilization per'
date: 2020-03-24
tags: ['progress', 'shell-scripting', 'storage-area']
featured: false
topic: 'Progress/OpenEdge'
order: 999
---

  
**Script :** Progress database area utilization  
  
**Script Name:** progress\_area\_rpt.sh  
  
**Script Function:** Get the Actual DB Size,get Max area size & current utilization per area.Get the current utilization of all the file system where the database files resides. Sent mail to specified group as per the configuration.  
  
**Script Usage:** ./progress\_area\_rpt.sh  
  
**Code:**  
DB\_NAME="${1%%\\.db}"  
MAIL\_ID="xxxxxxx@xxx.com"  
CNT=0  
  
if \[ $# != 1 \]  
then  
  echo "Shuld run in format $0 "  
  exit  
fi  
  
if \[ ! -f ${DB\_NAME}.db \]; then  
   if \[ "${DB\_NAME}" = "ALL" \]; then  
      echo "Running for all the DBs"  
   else  
      echo "Database ${DB\_NAME} doesn't exist. Pass parameter as ALL or please enter the correct DB. Exiting..."  
      exit  
   fi  
fi  
  
DATE=\`date +%Y-%m-%d:%H:%M:%S\`  
  
echo "Report Time:$DATE">/tmp/area\_rpt.txt  
echo "============================">>/tmp/area\_rpt.txt  
  
#Below Function for statistics calculation  
#below for the area utilization check  
area\_util()  
{  
   DB\_NM="${1%%\\.db}"  
   echo "Database Name: ${DB\_NM}">>/tmp/area\_rpt.txt  
   prostrct statistics ${DB\_NM}>/tmp/stat\_rpt.txt  
   DB\_BLK\_SIZE=\`cat /tmp/stat\_rpt.txt|grep "Primary data block size:"|awk -F":" '{print $2}'| sed 's,^ \*,,; s, \*$,,'\`  
   TOT\_BLK\_USD=\`cat /tmp/stat\_rpt.txt|egrep "Database Block Usage for Area|Data blocks"|tail -1|awk -F":" '{print $2}'| sed 's,^ \*,,; s, \*$,,'\`  
   TOT\_DB\_SIZE=\`echo "scale=4;(${TOT\_BLK\_USD}\*${DB\_BLK\_SIZE})/(1024\*1024\*1024)"|bc\`  
   if \[ ${TOT\_DB\_SIZE} -lt 1 \]; then  
      TOT\_DB\_SIZE="0${TOT\_DB\_SIZE}"  
   fi  
   cat /tmp/stat\_rpt.txt|egrep "Database Block Usage for Area|Data blocks"|awk 'NR>2'|sed '$ d'>/tmp/area\_rpt  
   echo "Total DB Size:${TOT\_DB\_SIZE} GB">>/tmp/area\_rpt.txt  
   echo "">>/tmp/area\_rpt.txt  
exec  
   while read LINE; do  
      if \[ "$CNT" = "0" \]; then  
         AREA\_NAM=\`echo $LINE|awk -F":" '{print $2}'| sed 's,^ \*,,; s, \*$,,'\`  
         CNT=1  
      else  
         CNT=0  
         USED\_BLK=\`echo $LINE|awk -F":" '{print $2}'| sed 's,^ \*,,; s, \*$,,'\`  
         USED\_SIZE=\`echo "scale=4;(${USED\_BLK}\*${DB\_BLK\_SIZE})/(1024\*1024\*1024)"|bc\`  
         if \[ ${USED\_SIZE} -lt 1 \]; then  
    USED\_SIZE="0${USED\_SIZE}"  
         fi  
         REC\_PER\_BLK=\`cat ${DB\_NM}.st|grep -w "${AREA\_NAM}"|tail -1|awk -F":" '{print $2}'|awk -F" " '{print $1}'|awk -F";" '{print $1}'|awk -F"," '{print $2}'\`  
         CLUST\_SIZE=\`cat ${DB\_NM}.st|grep -w "${AREA\_NAM}"|tail -1|awk -F":" '{print $2}'|awk -F" " '{print $1}'|awk -F";" '{print $2}'\`  
         if \[ "${CLUST\_SIZE}" = "1" -o "${CLUST\_SIZE}" = "" \]; then  
            MAX\_AREA\_SIZE=\`echo "((2147483648/${REC\_PER\_BLK})\*${DB\_BLK\_SIZE})/(1024\*1024\*1024)"|bc\`  
            MAX\_AREA\_SIZE="${MAX\_AREA\_SIZE} GB"  
  else  
    MAX\_AREA\_SIZE="1024 TB"  
      fi  
echo "${AREA\_NAM}">>/tmp/area\_rpt.txt  
         echo "-----------------">>/tmp/area\_rpt.txt  
echo "Max Area Size:${MAX\_AREA\_SIZE}">>/tmp/area\_rpt.txt  
        echo "Area Utilized:${USED\_SIZE} GB">>/tmp/area\_rpt.txt  
     fi  
  done  
  echo "">>/tmp/area\_rpt.txt  
  echo "Database Filesystem Utilization">>/tmp/area\_rpt.txt  
  echo "-----------------------------------">>/tmp/area\_rpt.txt  
  cat ${DB\_NM}.st|grep "^d"|awk -F":" '{print $2}'|awk -F" " '{print $2}'|awk -F"\_" '{print $1}'|awk -F"." '{print $1}'|sort -u>/tmp/db\_files.txt  
  for LINE in \`cat /tmp/db\_files.txt\`; do  
     df -k ${LINE}\*|sort -u|grep -v "Filesystem"|sed '$d'|awk -F" " '{print $5 "--" $4 " Used"}'>>/tmp/file\_util.txt  
  done  
  cat /tmp/file\_util.txt|sort -u>>/tmp/area\_rpt.txt  
  rm /tmp/file\_util.txt  
}  
if \[ "${DB\_NAME}" = "ALL" \]; then  
   for i in \`cat /pro/admin/ctl/protab|grep -v "#"|awk 'NF>0'|awk -F" " '{print $3"/"$1}'|awk -F"," '{print $1}'\`; do  
      area\_util $i  
      echo "\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*">>/tmp/area\_rpt.txt  
      echo "">>/tmp/area\_rpt.txt  
   done  
else  
   area\_util ${DB\_NAME}  
fi  
echo "">>/tmp/area\_rpt.txt  
echo "Regards,">>/tmp/area\_rpt.txt  
echo "Progress DBA">>/tmp/area\_rpt.txt  
  
cat /tmp/area\_rpt.txt|mailx -r xxxx@xxx.com -s "NOTIFY:: AREA UTILIZATION REPORT -- ${DB\_NAME} -- \`hostname\`" ${MAIL\_ID}