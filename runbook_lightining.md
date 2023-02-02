## overview of weeks study plan/log

## demo of aws cli installed
``
aws s3 ls
``
## quick "whoami"
``
aws sts get-caller-identity
``

## clone repo
``
git clone {}{}{{}}
``

## install deps
``
npm i
``
## deploy our lambda
``
npm run create
``

## super fast?
## review the lambda in the console, including deployed role and permissions

## create dynamo db table

``
aws dynamodb create-table --table-name pizzas --attribute-definitions AttributeName=url,AttributeType=S --key-schema AttributeName=url,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --region eu-west-2 --query TableDescription.TableArn --output text
``

## create iam role permitting access to dynamo db and allow our lambda to assume that role
``
aws iam put-role-policy --role-name pizza-api-executor --policy-name PizzaApiDynamoDB --policy-document file://./roles/dynamodb.json
``
### As this role definiton came from a tutorial, it is a little bit "looser" than we would like as it efectively gives this role access to ALL dynamo db tables, we'd want to restrict that further and apply least privilege at the lowest granularity level possible.

## manually change our role to limimt access to only this dynamo table, in the console....

## review api gateway entry that claudia created for us...

## what's cooking?
![image](https://media.makeameme.org/created/wheres-the-code-c3a717b6d5.jpg)

## code review
#### 1. typescript definitions for claudia in the @types folder
[Typescript types reference](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html)
#### 2. package.json - scripts
#### 3. api
#### 4. repo

## READY?

### invoke it - create a pizza
``
curl -X POST -i -H "Accept-Type: application/json" -H "Content-Type: application/json" -d "{\"name\":\"Pepperoni Pizza\",\"ingredients\":[\"tomato sauce\",\"cheese\",\"pepperoni\"]}" https://<GATEWAY>.execute-api.eu-west-2.amazonaws.com/latest/pizzas
``

### return a pizza
``
curl -X GET -i -H "Accept-Type: application/json" -H "Content-Type: application/json" https://<GATEWAY>.execute-api.eu-west-2.amazonaws.com/latest/pizzas/Pepperoni-Pizza
``

## review cloudwatch logs
### look at duration and memory usage - this together with no. of requests is what we're charged for. The first x requests and x gbps are free.

[aws lambda costs optimzation](https://aws.amazon.com/blogs/compute/optimizing-your-aws-lambda-costs-part-1/)

## clean up
### delete IAM role
### delete lambda
## delete cloudwatch log group
### delete dynamo table
### delete api gateway entry

