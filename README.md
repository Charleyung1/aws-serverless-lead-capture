# 🚀 Serverless Lead Capture Platform on AWS

> Production-style serverless web application built with Amazon S3, Amazon CloudFront, GoDaddy DNS, AWS Certificate Manager (ACM), Amazon   > API Gateway, AWS Lambda, Amazon DynamoDB, Amazon SES, and Amazon CloudWatch.

## Overview

This project demonstrates the design and implementation of a production-style serverless lead capture platform on AWS. Visitors access a responsive landing page hosted on Amazon S3 and delivered globally through Amazon CloudFront using a custom domain managed with GoDaddy.

When a user submits the Get Free Ebook form, the request is securely routed through Amazon API Gateway to an AWS Lambda function. Lambda validates the submission, stores the data in Amazon DynamoDB, sends an email notification through Amazon Simple Email Service (SES), and records execution logs in Amazon CloudWatch.

The solution eliminates the need to manage backend servers while providing a scalable, secure, and cost-effective cloud-native architecture.

------------------------------------------------------------------------

# 🏗️ Solution Architecture


![<img width="1690" height="931" alt="serverless project " src="https://github.com/user-attachments/assets/7d2fced7-8a09-4f15-b0d5-2d344a660722" />
)

The solution follows an event-driven architecture where each AWS service performs a dedicated responsibility to deliver a scalable and highly available serverless application.

------------------------------------------------------------------------

# 🎯 Project Objectives

- Build a fully serverless web application on AWS.
- Host a responsive landing page using Amazon S3.
- Deliver website content globally through Amazon CloudFront.
- Configure a custom domain using GoDaddy.
- Secure the application with HTTPS using AWS Certificate Manager.
- Expose a REST API through Amazon API Gateway.
- Process contact form submissions using AWS Lambda.
- Store customer enquiries in Amazon DynamoDB.
- Send automated email notifications using Amazon SES.
- Monitor application activity using Amazon CloudWatch.


------------------------------------------------------------------------

# ☁️ AWS Services Used

| **Service** | **Purpose** |
|-------------|-------------|
| **GoDaddy** | Custom domain registration and DNS management |
| **Amazon S3** | Hosts the static website frontend |
| **Amazon CloudFront** | Delivers website content globally with low latency and HTTPS support |
| **AWS Certificate Manager (ACM)** | Provides the SSL/TLS certificate used by CloudFront |
| **Amazon API Gateway** | Exposes a secure REST API endpoint for contact form submissions |
| **AWS Lambda** | Processes incoming requests, validates data, stores records, and triggers email notifications |
| **Amazon DynamoDB** | Stores contact form submissions as persistent NoSQL records for future retrieval and analysis |
| **Amazon Simple Email Service (SES)** | Sends automated email notifications when new enquiries are received |
| **Amazon CloudWatch** | Collects logs and monitors Lambda execution for troubleshooting and operational visibility |
------------------------------------------------------------------------

# 🔄 End-to-End Request Flow

``` text
User
 │
 ▼
GoDaddy (DNS)
 │
 ▼
CloudFront
 │
 ▼
Amazon S3
 │
 ▼
Submit Form
 │
 ▼
API Gateway
 │
 ▼
AWS Lambda
 ├──────────────► Amazon DynamoDB
 │                    │
 │                    ▼
 │             Store Contact Record
 │
 └──────────────► Amazon SES
                      │
                      ▼
              Email Notification
                      │
                      ▼
              CloudWatch Logs
```

------------------------------------------------------------------------

# 🔐 Security Considerations

- HTTPS enabled using AWS Certificate Manager (ACM).
- Custom DNS managed through GoDaddy.
- IAM least-privilege permissions applied to AWS Lambda.
- Verified sender identity configured in Amazon SES.
- CORS enabled on Amazon API Gateway.
- Communication between frontend and backend secured over HTTPS.

------------------------------------------------------------------------

# 🚀 Implementation Walkthrough

## Amazon S3

### Overview

Amazon S3 hosts the static frontend of the application, providing a
durable and highly available platform for HTML, CSS, JavaScript and
image assets.

### Implementation

A static website bucket was created and configured as the CloudFront
origin. Frontend updates were uploaded directly to the bucket whenever
application changes were made.

### Screenshot

![<img width="1136" height="630" alt="s3 bucket" src="https://github.com/user-attachments/assets/f9b01445-2a16-407f-8f1e-f855ed2ccf3a" />
)

*Figure 1. Amazon S3 bucket configured to host the static website.*

------------------------------------------------------------------------

## Amazon CloudFront

### Overview

CloudFront improves application performance by serving cached content
from AWS edge locations while providing HTTPS connectivity.

### Implementation

The distribution was configured with the S3 bucket as the origin and
linked to a custom domain secured with AWS Certificate Manager.

### Screenshot

![CloudFront (<img width="1433" height="521" alt="cloudfront1" src="https://github.com/user-attachments/assets/25ac1dd5-cff3-4c33-944c-bd155a73ea87" />
)

*Figure 2. CloudFront distribution delivering the website over HTTPS.*

------------------------------------------------------------------------

## Domain & DNS Management (GoDaddy)

### Overview

The application uses a custom domain purchased through GoDaddy. Rather than managing DNS with Amazon Route 53, the domain's DNS records were configured within GoDaddy to point traffic to the Amazon CloudFront distribution.

### Implementation

The custom domain (ebook.charless.xyz) was configured in GoDaddy by creating the required DNS records that route user requests to the CloudFront distribution. Once DNS propagation completed, the website became accessible through the custom domain over HTTPS.

### Screenshot

![<img width="1438" height="71" alt="go daddy" src="https://github.com/user-attachments/assets/26f95682-4388-4957-bcc9-b0b6c3dd8f06" />
)

*Figure 3. Godaddy DNS configuration.*

------------------------------------------------------------------------

## AWS Certificate Manager

### Overview

AWS Certificate Manager provides the SSL/TLS certificate used to secure
the website.

### Implementation

A public certificate was requested, validated and attached to the
CloudFront distribution.

### Screenshot

![ACM] <img width="1125" height="374" alt="certificate manager" src="https://github.com/user-attachments/assets/2e47fe2a-29fb-4089-9c1b-032b7177c2ee" />
)

*Figure 4. SSL certificate issued through AWS Certificate Manager.*

------------------------------------------------------------------------

## Amazon API Gateway

### Overview

API Gateway receives contact form submissions and securely invokes AWS
Lambda.

### Implementation

A REST API with a POST endpoint was created. Lambda Proxy Integration
and CORS were configured to allow requests from the frontend.

### Screenshot

![<img width="1440" height="900" alt="API" src="https://github.com/user-attachments/assets/c38cf43a-67c4-42c5-a3a3-d87e37aeea7c" />
)

*Figure 5. REST API integrated with AWS Lambda.*

### API Testing

The REST API was tested using a cURL POST request with a JSON payload. The API successfully returned an HTTP 200 response, confirming that API Gateway correctly invoked the Lambda function.

**Screenshot**
<img width="818" height="257" alt="THIS" src="https://github.com/user-attachments/assets/2ce5b09c-6580-4ee6-92de-fd333441858b" />


**Figure 6. Successful API Gateway POST request tested using cURL (HTTP 200).**

------------------------------------------------------------------------

## AWS Lambda

### Overview

Lambda contains the backend business logic responsible for processing
customer enquiries.

### Implementation

The function receives the request from API Gateway, extracts the
submitted details and sends an email using Amazon SES before returning a
successful response.

### Screenshot

![Lambda] <img width="1435" height="715" alt="lamb" src="https://github.com/user-attachments/assets/4e6cb776-1d3a-494c-af9c-aa21a603aa33" />
)

*Figure 7. Lambda function successfully processing contact form requests and returning a successful HTTP 200 response.*

------------------------------------------------------------------------


## Live Application & Successful Form Submission

### Overview

The application is deployed as a fully serverless web application on Amazon S3 and delivered globally through Amazon CloudFront using a custom HTTPS domain. After a user submits the contact form, the request is processed by Amazon API Gateway, AWS Lambda stores the submission in Amazon DynamoDB, and Amazon SES sends an email notification. A success message is then displayed to the user, confirming that the complete workflow executed successfully.

### Screenshot

<img width="1438" height="860" alt="live app" src="https://github.com/user-attachments/assets/ae490442-53de-4e4b-a0f8-02fac734f6f5" />


*Figure 8. Live serverless contact form successfully processing a user submission and displaying a confirmation message, demonstrating the end-to-end integration of Amazon S3, CloudFront, API Gateway, AWS Lambda, DynamoDB, and Amazon SES.*

------------------------------------------------------------------------

## Amazon SES

Amazon SES is used to send email notifications whenever a visitor submits the contact form. The Lambda function formats the submission details and delivers them to the configured email address in real time.

### Implementation

After a successful form submission, Lambda invokes Amazon SES to send an email containing the user's contact information and message. This provides immediate notification without requiring users to log into the application.

![Email   <img width="1129" height="287" alt="Email" src="https://github.com/user-attachments/assets/078f65b1-ee5c-48df-9b28-316db35fba92" />
)

*Figure 9. Email notification successfully delivered by Amazon SES after a contact form submission.*

------------------------------------------------------------------------

## Amazon DynamoDB

Amazon DynamoDB serves as the application's NoSQL database, storing every contact form submission received through the serverless backend. Each submission is saved as a separate record, providing a persistent and scalable data store without requiring server management.

### Implementation

After API Gateway invokes the Lambda function, the submitted form data is validated and written to a DynamoDB table. Each record contains a unique submission ID, the user's name, email address, phone number, message, and timestamp. This enables reliable storage of contact requests while supporting fast retrieval and future analytics.

### Screenshot

!<img width="818" height="367" alt="dyna" src="https://github.com/user-attachments/assets/38afcf17-33bf-4bf0-8e4b-8f846b04d990" />


*Figure 10. Amazon DynamoDB table showing contact form submissions successfully stored after processing requests through the serverless application.*

------------------------------------------------------------------------



# ⚠️ Challenges Encountered & Resolution

### CORS Errors

Browser requests were initially blocked because API Gateway was not
configured for cross-origin requests.

**Resolution:** Enabled CORS on the API resource, updated Lambda
response headers and redeployed the API.

### API Endpoint Mismatch

The frontend was still calling the previous endpoint instead of the
deployed API Gateway URL.

**Resolution:** Updated the JavaScript application to use the correct
Invoke URL and resource path.

### Lambda Event Parsing

The Lambda function initially expected a different request structure.

**Resolution:** Enabled Lambda Proxy Integration and updated the
function to process the incoming event correctly.

### CloudFront Cache

Frontend updates were not immediately visible.

**Resolution:** Uploaded the latest files to S3 and refreshed CloudFront
content.

------------------------------------------------------------------------

# 💡 Lessons Learned

This project strengthened my understanding of designing and deploying serverless applications on AWS. I gained hands-on experience integrating Amazon API Gateway, AWS Lambda, Amazon DynamoDB, and Amazon SES while configuring secure HTTPS access through Amazon CloudFront and AWS Certificate Manager.

The project also reinforced the importance of IAM permissions, CORS configuration, DNS management, CloudWatch logging, and end-to-end troubleshooting when building cloud-native applications.

------------------------------------------------------------------------

# 🚀 Future Improvements

- Implement Google reCAPTCHA to reduce spam submissions.
- Add Amazon SNS notifications for SMS and multi-channel alerts.
- Develop an administrative dashboard for viewing stored enquiries.
- Configure CloudWatch Alarms for proactive monitoring.
- Introduce request validation and rate limiting for additional API security.

------------------------------------------------------------------------

# 🙏 Acknowledgements

## Template Attribution

- The frontend is based on the **TemplateMo eBook Landing** template.
- The original template has been customised and extended for this project.
- Please refer to the **TemplateMo License** for the original licensing terms:
  https://templatemo.com/license

## Project Contributions

The AWS serverless architecture, backend implementation, Amazon API Gateway integration, AWS Lambda functions, Amazon DynamoDB integration, Amazon SES email notifications, deployment, documentation, and project-specific enhancements were designed and implemented by **Charles Ekairia**.

---

# 👨‍💻 Author

**Charles Ekairia**  
Cloud & DevOps Engineer

- **GitHub:** https://github.com/charleyung1
- **LinkedIn:** https://www.linkedin.com/in/charles-ekairia-44797821b
