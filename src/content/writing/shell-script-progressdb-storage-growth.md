---
title: 'Shell Script - ProgressDB Storage Growth'
description: 'Script : Progress database Storage area size growth Script Name: progressgrowthrpt.sh Script Function:Calculate report of time remaining for extents to grow'
date: 2020-03-24
tags: ['extents', 'progress', 'shell-scripting', 'script', 'storage-area']
featured: false
topic: 'Progress/OpenEdge'
order: 999
---

  
**Script :** Progress database Storage area size growth  
  
**Script Name:** progress\_growth\_rpt.sh  
  
**Script Function:**Calculate report of time remaining for extents to grow into variable for each storage area of Progress database  
  
**Script Usage:** ./progress\_growth\_rpt.sh < dbanalys\_rptold > < dbanalys\_rptnew >  
  
**Code:**  
#!/usr/bin/bash  
RPT\_PTH=/emc/reale/archive/dban  
STRT\_FL="area${1}.txt"  
END\_FL="area${2}.txt"  
STORAGE\_OP\_FL="/tmp/area\_rpt\_${2}.csv"  
MAIL\_GRP=xxxxx@xxx.com  
echo ",,,,,${1},,${2},,,,,">$STORAGE\_OP\_FL  
echo "DB Nm,AreaName,MaxBlocks,Size(in MB),Old- HiWater Used,Old - HiWater Used (in MB),Current HiWater Used,Current HiWater Used(MB),Free Blks,Free(MB),Monthly Blocks,M.Grw(MB),Mths Avail">>$STORAGE\_OP\_FL  
  
if \[ $# != 2 \]; then  
   echo "Wrong usage. Please run as below"  
   echo "$0 "  
   exit  
fi  
  
if \[ ! -f ${RPT\_PTH}/${STRT\_FL} \]; then  
   echo "Old date data file is missing"  
   exit  
elif \[ ! -f ${RPT\_PTH}/${END\_FL} \]; then  
   echo "new date data file is missing"  
   exit  
fi  
function ceil()  
{  
   VAL=$(echo $1 +.5 | bc)  
   RET\_VAL=\`echo "${VAL%.\*}"\`  
   if \[ "${RET\_VAL}" = "" \]; then  
      RET\_VAL=0  
   fi  
   echo "${RET\_VAL}"  
   #echo "${VAL%.\*}"  
  
}  
cd ${RPT\_PTH}  
echo -e "START FILE:${STRT\_FL}\\nEND FILE:${END\_FL}"  
  
cat ${STRT\_FL}|egrep -vi "Control Area|Primary Recovery Area|Schema Area|After Image Area|^UNIQUEID|^FIELDHSTSEQ"|awk 'NF>0'>${STRT\_FL}.tmp  
cat ${END\_FL}|egrep -vi "Control Area|Primary Recovery Area|Schema Area|After Image Area|^UNIQUEID|^FIELDHSTSEQ"|awk 'NF>0'>${END\_FL}.tmp  
#for i in \`cat ${STRT\_FL}.tmp\`; do  
exec<${STRT\_FL}.tmp  
while read i; do  
   OLD\_DB\_NM=\`echo $i|awk -F" " '{print $1}'\`  
   OLD\_AREA\_NM=\`echo $i|awk -F" " '{print $2}'\`  
   OLD\_WTR\_MRK=\`echo $i|awk -F" " '{print $4}'\`  
   if \[ \`cat ${RPT\_PTH}/${END\_FL}.tmp|grep -w ${OLD\_DB\_NM}|grep -w ${OLD\_AREA\_NM}|wc -l\` -gt 0 \]; then  
      NEW\_DB\_NM=\`cat ${END\_FL}.tmp|grep -w ${OLD\_DB\_NM}|grep -w ${OLD\_AREA\_NM}|awk -F" " '{print $1}'\`  
      NEW\_AREA\_NM=\`cat ${END\_FL}.tmp|grep -w ${OLD\_DB\_NM}|grep -w ${OLD\_AREA\_NM}|awk -F" " '{print $2}'\`  
      NEW\_MAX\_BLOK=\`cat ${END\_FL}.tmp|grep -w ${OLD\_DB\_NM}|grep -w ${OLD\_AREA\_NM}|awk -F" " '{print $3}'\`  
      NEW\_WTR\_MRK=\`cat ${END\_FL}.tmp|grep -w ${OLD\_DB\_NM}|grep -w ${OLD\_AREA\_NM}|awk -F" " '{print $4}'\`  
      SIZE\_IN\_MB\_TMP=\`echo "${NEW\_MAX\_BLOK}\*8192/(1024\*1024)"|bc -l\`  
      SIZE\_IN\_MB=\`ceil $SIZE\_IN\_MB\_TMP\`  
      OLD\_HI\_WTR\_IN\_MB\_TMP=\`echo "${OLD\_WTR\_MRK}\*8192/(1024\*1024)"|bc -l\`  
      OLD\_HI\_WTR\_IN\_MB=\`ceil $OLD\_HI\_WTR\_IN\_MB\_TMP\`  
      CURR\_HI\_WTR\_IN\_MB\_TMP=\`echo "${NEW\_WTR\_MRK}\*8192/(1024\*1024)"|bc -l\`  
      CURR\_HI\_WTR\_IN\_MB=\`ceil $CURR\_HI\_WTR\_IN\_MB\_TMP\`  
      FREE\_BLK\_TMP=\`echo "${NEW\_MAX\_BLOK}-${OLD\_WTR\_MRK}"|bc -l\`  
      FREE\_BLK=\`ceil $FREE\_BLK\_TMP\`  
      FREE\_BLK\_IN\_MB\_TMP=\`echo "${FREE\_BLK}\*8192/(1024\*1024)"|bc -l\`  
      FREE\_BLK\_IN\_MB=\`ceil $FREE\_BLK\_IN\_MB\_TMP\`  
      MNTHLY\_BLK\_TMP=\`echo "${NEW\_WTR\_MRK}-${OLD\_WTR\_MRK}"|bc -l\`  
      MNTHLY\_BLK=\`ceil $MNTHLY\_BLK\_TMP\`  
      MGROW\_IN\_MB\_TMP=\`echo "${MNTHLY\_BLK}\*8192/(1024\*1024)"|bc -l\`  
      MGROW\_IN\_MB=\`ceil $MGROW\_IN\_MB\_TMP\`  
      if \[ ${MNTHLY\_BLK} -ne 0 \]; then  
         MNTHS\_AVAIL\_TMP=\`echo "${FREE\_BLK}/${MNTHLY\_BLK}"|bc -l\`  
         MNTHS\_AVAIL=\`ceil $MNTHS\_AVAIL\_TMP\`  
      else  
         MNTHS\_AVAIL="###"  
      fi  
  fi  
  echo "$NEW\_DB\_NM,$NEW\_AREA\_NM,$NEW\_MAX\_BLOK,${SIZE\_IN\_MB}MB,$OLD\_WTR\_MRK,$OLD\_HI\_WTR\_IN\_MB,$NEW\_WTR\_MRK,$CURR\_HI\_WTR\_IN\_MB,$FREE\_BLK,${FREE\_BLK\_IN\_MB}MB,$MNTHLY\_BLK,${MGROW\_IN\_MB}MB,$MNTHS\_AVAIL">>$STORAGE\_OP\_FL  
  echo "$NEW\_DB\_NM,$NEW\_AREA\_NM,$NEW\_MAX\_BLOK,${SIZE\_IN\_MB}MB,$OLD\_WTR\_MRK,$OLD\_HI\_WTR\_IN\_MB,$NEW\_WTR\_MRK,$CURR\_HI\_WTR\_IN\_MB,$FREE\_BLK,${FREE\_BLK\_IN\_MB}MB,$MNTHLY\_BLK,${MGROW\_IN\_MB}MB,$MNTHS\_AVAIL"  
done  
exec<${END\_FL}.tmp  
while read i; do  
  NEW\_DB\_NM=\`echo $i|awk -F" " '{print $1}'\`  
  NEW\_AREA\_NM=\`echo $i|awk -F" " '{print $2}'\`  
  NEW\_MAX\_BLOK=\`echo $i|awk -F" " '{print $3}'\`  
  NEW\_WTR\_MRK=\`echo $i|awk -F" " '{print $4}'\`  
  if \[ \`cat ${RPT\_PTH}/${STRT\_FL}.tmp|grep -w ${NEW\_DB\_NM}|grep -w ${NEW\_AREA\_NM}|wc -l\` -eq 0 \]; then  
      SIZE\_IN\_MB\_TMP=\`echo "${NEW\_MAX\_BLOK}\*8192/(1024\*1024)"|bc -l\`  
      SIZE\_IN\_MB=\`ceil $SIZE\_IN\_MB\_TMP\`  
      CURR\_HI\_WTR\_IN\_MB\_TMP=\`echo "${NEW\_WTR\_MRK}\*8192/(1024\*1024)"|bc -l\`  
      CURR\_HI\_WTR\_IN\_MB=\`ceil $CURR\_HI\_WTR\_IN\_MB\_TMP\`  
      FREE\_BLK\_IN\_MB\_TMP=\`echo "${NEW\_MAX\_BLOK}\*8192/(1024\*1024)"|bc -l\`  
      FREE\_BLK\_IN\_MB=\`ceil $FREE\_BLK\_IN\_MB\_TMP\`  
      MGROW\_IN\_MB\_TMP=\`echo "${NEW\_WTR\_MRK}\*8192/(1024\*1024)"|bc -l\`  
      MGROW\_IN\_MB=\`ceil $MGROW\_IN\_MB\_TMP\`  
      if \[ ${MNTHLY\_BLK} -ne 0 \]; then  
         MNTHS\_AVAIL\_TMP=\`echo "${NEW\_MAX\_BLOK}/${NEW\_WTR\_MRK}"|bc -l\`  
         MNTHS\_AVAIL=\`ceil $MNTHS\_AVAIL\_TMP\`  
      else  
         MNTHS\_AVAIL="###"  
      fi  
      echo "$NEW\_DB\_NM,$NEW\_AREA\_NM,$NEW\_MAX\_BLOK,${SIZE\_IN\_MB}MB,0,0,$NEW\_WTR\_MRK,$CURR\_HI\_WTR\_IN\_MB,$NEW\_MAX\_BLOK,${FREE\_BLK\_IN\_MB}MB,$NEW\_WTR\_MRK,${MGROW\_IN\_MB}MB,$MNTHS\_AVAIL">>$STORAGE\_OP\_FL  
  fi  
done  
uuencode $STORAGE\_OP\_FL area\_rprt\_${2}.csv|mailx -s "STORAGE REPORT-AUTO" $MAIL\_GRP  
  
rm ${STRT\_FL}.tmp ${END\_FL}.tmp