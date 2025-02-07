#!/bin/bash
set -e

echo "Creating/Updating CloudFormation stack: musa-yuksel-cloudfront-test-stack-2 in eu-west-1"

aws cloudformation deploy \
  --template-file ../simple-s3-test-stack.yml \
  --stack-name musa-yuksel-cloudfront-test-stack-2 \
  --capabilities CAPABILITY_IAM \
  --region eu-west-1

