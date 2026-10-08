---
title: 'MySQL Server'
description: 'MySQL Server has different types of distribution starting from the Original MySQL from Oracle who are the current owners of MySQL.In 2010 Oracle had merged'
date: 2019-07-05
tags: []
featured: false
topic: 'MySQL'
order: 999
---

MySQL Server has different types of distribution starting from the Original MySQL from Oracle who are the current owners of MySQL.In 2010 Oracle had merged their dev team for MySQL with innoDB team and have many mirror sites for downloading the official core product.  
  
Besides Oracle , we have other distributors which provide MySQL "forks" for example maria db , percona server etc.  
  
MySQL Forks are based on original source code , developed independently or in parallel.  
There were also internal forks "drizzle" within MySQL.Some of the forks are  
aira SE- improved crash safe MyISAM alternative, intended to eventually provide features of InnoDB while retaining MyISAM  
  
Percona Server fork- significant community contributor, XtraDB Storage Engine, replacement for InnoDB, superior performance,efficiency,scalability,ease of use  
  
**Distribution Methods**   

The distribution method are broadly of types:

\* **Source Code**

\***Binary Packages -** tarball or zip archives

archive package includes components + scripts

we determine where to install

set appropriate permissions

manual work involved

chances to make mistakes

  

\***Scripted Installers -** for windows installation/config wizards ( msi ) or for unix as distro packages (rpm,deb,pkg,dmg).

preferred installation method

performs most installation steps automatically

prompts for options

packages includes components and a script to follow for installation

script is automatically performed

installed components can still be moved

  

**Versions**

mysql 5.1 GA , 5.5 , 5.6

maria db 5.1(aria SE-crash safe) ,5.2

percona server(follows MySQL + extraDB SE )

  

**MySQL on Windows**

\*Scripted installation -

  wizard installers in one .msi(installation & configuration wizard)

executables in program files directory tree

Data directory in documents & settings -> all users -> applicaton data

Registry , env variables,windows service setup all performed

\*Unscripted installation -

zip archive containing all components

unzip and add the bin directory to PATH variable,handle registry setting as well as server as service.Must create and populate an options file(.ini or cnf).

Remove any unnecessary default accounts

  

**MySQL on Linux**

\*Scripted - native package manager, or use generic rpm on system that support glibc 2.3 standard C library.Separate packages for server and client

\*Unscripted - tarball installed using terminal pgm.lengthy and complex manual process

\*MySQL Optimized Configuration Architecture (MOCA )- setting up a host machine specifically as a dedicated MySQL server host.Optimizing for performance and ease of backup and maintenance

  

**Upgrading MySQL**

Keep in mind the below points while performing an upgrade:

\*read manual for details

\*perform each major upgrade until desired version is installed

\*Stop MySQL before upgrade

\*Always backup data before upgrading

\*Run mysql\_upgrade after installation

  

Windows: using msi package for dot release, old version will be replaced by new version

recommended for manual upgrade also except for data directory, all components should be replaced

  

Linux:upgrade all components to same version.If using rpms use same ones for new versions.

**Using Multiple MySQL Server**

A multiple MySQL Server might be required to be installed on a single host for testing new version while using existing, provide different servers on same host for different users(ISPs do this for hosting customers or companies having department service), main server and filtering server for replication(tables use black hole engine to filter).

  

**Setting up multiple server on one host**

\*each server is a seperate installation

\*each must have all its own resources ( data dr,logs etc)

\*important configuration variables ( --port,--basedir,--innodb\_data\_file\_path,--bind-adress,--datadir,server name,--socket,--tempdir,--defaults-file,--pid-file,log files)

\*config file in each basedir or shared config file with mysqld name to each.