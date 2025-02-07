#!/bin/bash
set -e

echo "Deleting CloudFormation stack: musa-yuksel-cloudfront-test-stack-2 in eu-west-1"

aws cloudformation delete-stack --stack-name musa-yuksel-cloudfront-test-stack-2 --region eu-west-1

echo "Stack deletion initiated. Waiting for deletion to complete....."

aws cloudformation wait stack-delete-complete --stack-name musa-yuksel-cloudfront-test-stack-2 --region eu-west-1

echo "Stack deletion complete."