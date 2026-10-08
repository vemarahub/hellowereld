---
title: 'Openedge Database Reports'
description: 'OpenEdge provides us a variety of utilities to pull out reports related to the database and which we can use to analyse and plan how the database'
date: 2017-12-14
tags: ['dbanalys', 'idxanalys', 'reporting', 'tabanalys']
featured: false
topic: 'Progress/OpenEdge'
order: 999
---

  
  
OpenEdge provides us a variety of utilities to pull out reports related to the database and which we can use to analyse and plan how the database structure/data should be maintained in the database.  
  
  
Following are some key utilities used for database reporting at various object level:  
**DB Analysis:**  
  
 **proutil dbname -C dbanalys**  
This will result in output being directed to the screen.  To direct output to a file for review use > output filename.  
  
The results from the utility is segmented into 3 categories:  
  
1\. Free Chain Analysis  
\======================  
"<n> block(s) found in the free chain"  
  
This is the number of completely empty blocks that are available for use. They are listed in the free chain and are available for any usage.  
  
2\. RM Chain Analysis  
\====================  
"LIST OF RM CHAIN BLOCKS"  
  
  
These are the blocks that may (not guaranteed) have free space that are available to be used to add new records.The listing gives first the dbkey that is available, second the amount of free space in bytes, third the number of record slots in the block that are free, followed by the number of slots being used.  

  

At the end of the chain list is the total amount of blocks in the RM free chain. The chain should be checked to be sure that the chain is not "clogged" with small size entries at the beginning. This can cause inefficient use of space, as a free (empty) block would be used rather than existing blocks from the RM chain list. Should this be the case, there are two of options:

  

1\. Dump and reload the database to reformat the space and reallocate free space. This may not always be the best choice.  Before doing a dump and load determine how well the database is allocated by checking the RM block space utilization percentage.(see the next section).

  

2\. Try adding a number of smaller dummy records to remove the entries from the beginning of the chain. This sometimes works but in no way guarantees that the chain will not clog again later.

  

3\. BLOCK ANALYSIS

\=================

  

"<n> RM block(s) found in the database"

"<n>% of the RM block space is used"

\-----------------------------------------

  

This is the total number of blocks in the Record Manager portion (data) of the database.  The block size times the number of blocks will give the actual data size. The percentage should be between 70% and 90%.  If it is below 70% then the database is a candidate for a dump and reload. If the size is over 90% then the database space is being allocated very well.

  

"<n> index block(s) found in the database"

"<n>% of the index block space is used"

\------------------------------------------

This is the total number of Index Blocks (Indexes) of the database. The block size times the number of blocks will give the actual index size. On average, the index blocks are 60% to 75% full.

  

Index Block Summary

\-------------------

Index name - The index name

Index - This is \_Index.\_index-num

Blocks - The number of blocks for that index

Bytes - The number of bytes used by that index

%Utiliz - .The percentage of space used within the blocks allocated to that index. Should this percentage be less than 70% and the index is large, it would be an indication that the index should

be rebuilt.

% of all Indexes - This is the size of the index (%) as related to all the indexes. The larger the percentage, the greater impact of an index rebuild on space.

  

4\. Summary

\==========

  

1\. Rebuild any large indexes under 70% utilization.

  

2\. If RM block space is less than 70% utilization or exceeds 90%, then the database may be a candidate for a dump and reload to re-allocate space. Again, these numbers are a guideline only. Whether it should be dumped or left alone depends on how the data are used.

  

3\. Check the RM chain list to make sure that the chain is not being clogged with small byte size records at the top of chain. A sign of a clogged chain is when the database appears to be growing when there have been numerous deletes.  With each version of Progress improvements are made in the usage of RM chains, weighing performance against database space utilization.

  

4\. Every Database is different. This has to be taken into account when evaluating any numbers that the Dbanalys should return. Be sure to understand the database being analyzed before making any decisions to dump and reload. Evaluate whether it is static or dynamic. Also note that in some cases where a database is spread across multiple disks, it may be best leaving it as is with regards to performance, because of the randomness in the physical distribution of the data..

  

  

### Table Analysis:

  

 **proutil dbname -C tabanalys**  
Displays information about the degree of fragmentation for each table in a database. Also displays summary information about record and LOB (if present) sizes for each table.

  
The following output is a sample display of PROUTIL TABANALYS:  
  
  
RECORD BLOCK SUMMARY FOR AREA "DataArea": 17  
\-------------------------------------------------------  
  
RECORD BLOCK SUMMARY FOR SHARED TABLES  
\--------------------------------------  
  
                                       -Record Size (B)- ---Fragments--- Scatter  
Table                 Records    Size   Min   Max  Mean  Count Factor Factor  
PUB.cust                   26    1.7K    55    76    68 26    1.0     1.0  
PUB.cust-list.Initial       0    0.0B     0     0     0      0    0.0     0.0  
PUB.cust-list.list1         3  202.0B    66    68    67      3    1.0    20.3  
PUB.cust-list.list2        10  645.0B    56    77    64     10    1.0    20.3  
PUB.cust-list.list3         4  291.0B    71    74    72      4    1.0    20.3  
PUB.cust-list-range.Initial 0    0.0B     0     0     0      0    0.0     0.0  
PUB.cust-range.Initial      0    0.0B     0     0     0      0    0.0     0.0  
PUB.cust-rvalue.Initial     0    0.0B     0     0     0      0    0.0     0.0  
PUB.state                  51    1.7K    29    40    34     51    1.0     1.0  
PUB.stock.Initial(Composite)              
                        50000   18.5M   368   406   387  50000    1.0     1.0  
.  
.  
.  
LOB SUMMARY FOR AREA dbArea3: 9  
  
  
LOB SUMMARY FOR SHARED TABLES:                                    
\----------------------------------------------  
  
  
                                                         ---    LOB Size   ---  
Table                                 LOBs     Size      Min      Max     Mean  
PUB.Invoice:1  
    InvBlob1:5                         400    55.1M     1.0B   976.6K   141.0K  
    InvBlob2:6                         400    54.9M     1.0B   976.6K   140.4K  
    InvClob1:7                         400    39.3M     1.0B   976.6K   100.5K  
                                 ---------------------------------------------  
Subtotals:                            1200   149.2M     1.0B   976.6K   127.3K  
  
Summary for AREA "dbArea3": 9  
                                 ----------------------------------------------  
Subtotals:                            1200   149.2M     1.0B   976.6K   127.3K  
  
  
Generally, if the Scatter Index field / Factor value  value in the tab analys report  for the larger tables is above 2.0 then you should dump/load the table. Remember to perform a tabanalys after the dump/load to get baseline figures.  
  
  
  
  

### Index Analysis:

  

  

 **proutil dbname -C idxanalys**  
  
It Displays information on index blocks.  
  
The following output is a sample display of PROUTIL IDXANALYS:  
  
  
INDEX BLOCK SUMMARY FOR AREA "Employee": 7  
\-------------------------------------------------------  
  
  
INDEX BLOCK SUMMARY FOR SHARED OBJECTS:  
\--------------------------------------------  
Table                      Index  Fields Levels         Blocks    Size  % Util  Factor  
PUB.Benefits  
  EmpNo                        8       1      1              1  197.0B     4.8     1.0  
PUB.Department  
  DeptCode                    18       1      1              1   84.0B     2.1     1.0  
PUB.Employee  
  DeptCode                    20       1      1              1  132.0B     3.2     1.0  
  EmpNo                       19       1      1              1  503.0B    12.4     1.0  
  Name                        21       2      1              1    1.0K    25.5     1.0  
PUB.Family  
  EmpNoRelativeName           22       2      1              1    1.4K    36.4     1.0  
PUB.TimeSheet  
  EmpNoDayRecorded            59       2      1              1  293.0B     7.2     1.0  
PUB.Vacation  
  EmpNoStartDate              60       2      1              1  152.0B     3.7     1.0  
  
                    ------------------------------------------------------------------  
Subtotals:                                                   8    3.8K    11.9     0.0  
  
  
  
  
INDEX BLOCK SUMMARY FOR AREA "Inventory": 8  
\-------------------------------------------------------  
  
  
INDEX BLOCK SUMMARY FOR SHARED OBJECTS:  
\--------------------------------------------  
Table                      Index  Fields Levels         Blocks    Size  % Util  Factor  
PUB.Bin  
  BinNum:0                    10       1      2              3    6.8K    57.1     1.9  
  ItemNum:0                   11       1      1              1    1.8K    46.2     1.0  
PUB.Item  
  CatDescription              34       1      2              3    4.1K    34.5     2.3  
  Category2ItemName           35       2      1              1  958.0B    23.5     1.0  
  CategoryItemName            36       2      1              1    1.0K    26.1     1.0  
  ItemName                    37       1      1              1  934.0B    23.0     1.0  
  ItemNum                     33       1      1              1  503.0B    12.4     1.0  
PUB.POLine  
  PONumLinenum                47       2      2             15   51.3K    86.1     1.3  
PUB.PurchaseOrder  
  PONum                       48       1      2              6   18.8K    78.9     1.4  
PUB.Supplier  
  SupplierID                  56       1      1              1   97.0B     2.4     1.0  
PUB.SupplierItemXref  
  ItemNumSupplierID           58       2      1              1  624.0B    15.3     1.0  
  SupplieridItemNum           57       2      1              1  542.0B    13.3     1.0  
PUB.Warehouse  
  warehousename               62       1      1              1  307.0B     7.5     1.0  
  warehousenum                61       1      1              1  133.0B     3.3     1.0  
  
                    ------------------------------------------------------------------  
Subtotals:                                                  37   87.9K    59.8     0.2  
  
  
  
The IDXANALYS qualifier provides:  
  
\*The number of fields and levels in each index  
\*The size of each index, in blocks and in bytes  
\*The percent utilization within the index (that is, the degree of disk space efficiency)  
\*A factor value that indicates whether to rebuild each index  
\*A summary of indexes for the current database and the percentage of total index space used by each index