---
title: 'AWS Introduction'
description: 'Essential Characteristics: • On Demand Self-Service • Broad network access • Resource Pooling • Rapid Elasticity • Measured Service Deployment Model • Private'
date: 2019-10-04
tags: []
featured: false
topic: 'AWS'
order: 1
---

**Essential Characteristics:**  
 • On Demand Self-Service  
• Broad network access  
• Resource Pooling  
 • Rapid Elasticity  
 • Measured Service Deployment Model  
 • Private Cloud  
• Community Cloud  
 • Public Cloud  
 • Hybrid Cloud  
  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgP_bIhLZE1UYDjpV3pdvK7K7KeC4xJ6krB-27u1EMf2h0fY8I0wgu-zQgMHcYCv1ahrbZsNSbB7MfBoXfwuQ7aNj74Ilus7rDgPR36hU_ie6RIvlxJUzuTZ3dB0DhwQH3dHTffXhjaTGo/s640/c1.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgP_bIhLZE1UYDjpV3pdvK7K7KeC4xJ6krB-27u1EMf2h0fY8I0wgu-zQgMHcYCv1ahrbZsNSbB7MfBoXfwuQ7aNj74Ilus7rDgPR36hU_ie6RIvlxJUzuTZ3dB0DhwQH3dHTffXhjaTGo/s1600/c1.png)

  
  
  
**Simple Storage Service(S3)**   
  
Use case:  
 • Backups  
• Media files  
• Log files  
 • Web hosting  
  
  Unlimited number of objects , objects from zero bytes to 5TB.  
 Containers are called buckets  
  Access via API/HTTP  
  
_aws s3api create-bucket - -bucket csrepo-testbucket - -region ap-south-1_  
_aws s3api list-buckets_  
  
  
 **S3 web hosting**  
   put files in the bucket  
  setup bucket policy from permission tab as:  
{ "Version": "2012-10-17", "Statement": \[ { "Effect": "Allow", "Principal": "\*", "Action": "s3:GetObject", "Resource": "arn:aws:s3:::\[bucket-name\]/\*" } \] }  
  set up web hosting tab from properties tab and put index.html and error.html file names  
 Get the url by selecting web hosting menu and access through web browser  
  
 **Lambda**  
 Function as a service  
Use cases:  
• Simple tasks  
 • Batch tasks  
 • Chained tasks  
 • Serverless architectures  
  
For tasks less than 5 mins execution  
  ‘single’ functions of code  
  Triggered by : API/HTTP Call or an AWS event  
  
 For processing an image uploaded in s3 bucket 1 and putting it in bucket 2 by using a lambda function,follow the below steps :  
  Create bucket1 and bucket2, upload the frame image to bucket1 which will be used for processing  Go to lambda and click on create function  
 Select author from scratch give function name, select runtime for function.  
  Create a new execution role from IAM console link  
  Choose lambda as service for the role  
  Create policy and add the below policy json after providing input and output bucket names  
  
{ "Version": "2012-10-17", "Statement": \[ { "Effect": "Allow", "Action": \[ "logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents" \], "Resource": "arn:aws:logs:\*:\*:\*" }, { "Effect": "Allow", "Action": \[ "s3:GetObject" \], "Resource": "arn:aws:s3:::\[input-bucket-name\]/\*" }, { "Effect": "Allow", "Action": \[ "s3:PutObject" \], "Resource": "arn:aws:s3:::\[output-bucket-name\]/\*" } \] }  
  
  Create the function and add s3 bucket as trigger and provide the input bucket name and select event type as “all object create events”  
  Add the below code as function code import boto3 import os def lambda\_handler(event, context): key = event\['Records'\]\[0\]\['s3'\]\['object'\]\['key'\] bucket\_name = event\['Records'\]\[0\]\['s3'\]\['bucket'\]\['name'\] s3\_client = boto3.client('s3')  
 #open object from s3 with open('/tmp/overlay.png', 'wb') as data: s3\_client.download\_fileobj(bucket\_name, 'overlay.png', data)  
 #open object from s3 with open('/tmp/filein', 'wb') as data: s3\_client.download\_fileobj(bucket\_name, key, data) os.system("convert -brightness-contrast -1x50 -scale 32x32 /tmp/filein /tmp/fileout") os.system("convert -composite /tmp/fileout /tmp/overlay.png -scale 500x500 /tmp/out")  
 #save object to S3 with open('/tmp/out', 'rb') as data: s3\_client.upload\_fileobj(data, os.environ\['processed\_bucket'\], key) return  
  Add environment variable as output bucket name for key 'processed\_bucket'.  
 Save the function Now each time a new image is uploaded to s3 bucket the function will be executed which will process the image and add the frame to the image and save in bucket2 Elastic Compute Cloud Virtual servers (IAAS)  
  
 **Use cases**   
• Web servers  
• Backend servers  
• (Database servers)  
 • General purpose server  
  
 **How it works:**  
 Pick your type and size  
  Pick your OS  
  Select storage  
 Launch an instance  
  EBS storage,EFS storage,load balancing,auto scaling  
  
 All the Services:  
**Compute**:  
EC2 – secure and resizable compute capacity  
LightSail- Virtual private servers made easy  
 Elastic Container Service – service to run,stop,and manage docker containers on a cluster  
Lambda-serverless compute service,event driven Batch-fully managed batch processing at any scale Elastic BeanStalk-service for deploying and scaling web applications and services.  
  
 **Storage:**   
S3-Cloud object storage.5Gb for first year in free tier.  
EFS-Elastic File System-Cloud file storage Glacier-Cloud archive service.Wait some hours for retrieval from archive  
Storage Gateway-Integrate On premise storage infra  
  
 **AWS cloud Database:**  
RDS-Relational Database Service-setup ,operate and scale a relational database in cloud.Includes Aurora Dynamo DB - cloud NoSQL database.  
Mongo Elastic Cache – in memory data store and cache in the cloud  
.Redis or Memcached Redshift- cloud data warehouse  
  
 **Migration:**   
Migration Hub-Simplify and accelerate migration to AWS cloud.  
Application Discovery Service- Plan app cloud migration projects Database Migration Service-migrate db to AWS cloud Server Migration Service-on premise workload transmitted to AWS Snowball – petabyte scale data transport to glacier.  
 Snowmobile-hexabyte of data Networking  
  
 **Content Delivery:**   
VPC-Virtual Private Cloud-Private network in cloud(own subnets,routings & security with EC2 instances)  
CloudFront-content distribution network(images,js etc from local content distributor)  
Route53-DNS web service API Gateway-create,publilsh,maintain,monitor and secure APIs at any scale.Maps requests to APIs  
 Direct Connect-Dedicated network connection from your premise  
  
**AWS Developer Tools:**  
CodeStar-develop ,build and deploy.Like jenkin CodeCommit- like github CodeBuild CodeDeploy- Automates software deployments  
CodePipeline- Continuous delivery service Cloud9-IDE like eclipse XRay-debug and analyze your microservice apps.  
  
 **Management Tools :**  
CloudWatch-Monitoring Metric Service  
CloudFormation-Model and provision all cloud infrastructure resource  
CloudTrail-Track user activity and API usage Config-record and evaluate configs of AWS resources OpsWorks-Automate operations with chef and puppet ServiceCatalog-Create and manage catalogs of IT services SystemsManager-Gain operational insights and take action on AWS resources TrustedAdvisor-Optimizing usage of AWS ManagedService-Infra operations management for AWS Media Services Elastic Transcoder-media transcoder to churn media files to certain format Elemental->MediaConvert,MediaLive,MediaPackage,MediaStore,MediaTailor  
  
 **Machine Learning:**  
SageMaker-build,train and deploy machine learning models at scale Comprehend-discover insights and relationships in text  
DeepLens-deep learning enabled video camera Lex-conversational interface for your app Machine Learning-managed service for ML models and generating prediction Polly-turn text into speech using deep learning Rekognition-deep learning-based image and video analysis Transcribe-Speech recognition Translate-natural and fluent language translation  
 Analytics Athena-analyze data in S3 using standard SQL EMR-elastic map reduce-run and scale apache,Hadoop,spark,hbase,presto,hive etc  
 CloudSearch-Set up ,manage and scale a search solution  
 ElasticSearchService-fully managed reliable and scalable elastic search  
Kinesis-easily collect,process,and analyze video and data stream in real time  
 Kinesis Video Streams-for processing video streams for analytics and machine learning  
 QuickSite-Business analytics service Data Pipeline-easily automate the movement and transformation of data  
AWS Glue-simple , flexible and cost effective extract transform load  
  
 **Security Identity & Compliance:**  
IAM-Identity and Access Management-securely controlling access to AWS services  
Congnito-simple & secure user sign up /sign in Guard Duty-Intelligent threat detection and continuous monitoring to protect  
AWS account Inspector-automated security assessment service to help improve security and compliance.  
Macie-machine learning powered security service.  
 Single Sign on – access to multiple AWS account and business apps.  
 Certificate Manager-Provision,manage and deploy SSL/TLS cert  
CloudHSM- Hardware Security Module-Physical device used to store crypto material WAF &Shield-monitor web request for amazon cloudfront distribution and restrict access to your content Artifact-On demand access to AWS compliance reports  
  
**Mobile Services:**  
Mobile Hub- PinPoint- AppSync-syncing data in backend  
 Device Farm Mobile Analytics- measures app usage and revenue  
  
 **AR &VR(Augmented Reality/Virtual Reality):**  
Sumerian Application Integration  
 Step Function- coordinate the components of distributed apps and microservice using visual workflow  
Simple Notification Service-Pub/Sub message  
Simple Queue Service-fully managed message queue  
 Simple workflow service-build,run and scale background jobs that have parallel or sequential steps Business Productivity  
Alexa for Business Amazon Chime – service for online meeting  
WorkDocs-file collabrations and managements  
WorkMail Customer Engagement Simple Email Service Amazon Connect Desktop and app streaming Workspace AppStream 2.0 Stream desktop apps  
  
 **Internet of Things** :  
AWS IoT IoT Device management Amazon  
 FreeRTOS  
AWS Greengrass  
  
 **Game development:** Gamelift  
  
  
 **Creating Windows EC2:**  
1\. Go to EC2 option  
2\. Click on Launch instance  
 3. Select AMI  
 4. Choose instance type  
5\. Configure instance  
 6. Select storage  
7\. Add tags for associating EC2 instance  
 8. Create security rules  
 9. Click on launch and create a new key value pair and download pem file  
10\. Launch instance Default user : administrators Terminating: Running Instances - Actions-instance state- terminate  
  
**Creating Linux EC2:** Use putty gen to generate ppk file from pem and use in auth of putty Default user : ec2-user  
  
 **Creating WordPress:** Go to EC2 and select launch instance Click on AWS marketplace  
  
 **Why Use the Cloud:** Undifferentiated heavy lifting Cattle not pets, Fail Fast ,OpEx vs CapEx  
   
**Certificate Cloud:** Associate Professional Specialty