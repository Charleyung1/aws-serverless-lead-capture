import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const REGION = process.env.AWS_REGION || "us-east-1";
const TABLE_NAME = process.env.TABLE_NAME || "ContactMessages";

const RECEIVER = "charlesekairia@gmail.com";
const SENDER = "charleyung5516@gmail.com";

const ses = new SESClient({ region: REGION });
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event));

  try {
    const body =
      typeof event?.body === "string"
        ? JSON.parse(event.body)
        : (event?.body ?? event ?? {});

    // Sanitize and limit input lengths
    const name = (body.name || "").trim().slice(0, 100);
    const phone = (body.phone || "").trim().slice(0, 25);
    const email = (body.email || "").trim().slice(0, 254);
    const message = (body.message || "").trim().slice(0, 2000);

    if (!name || !email) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({
          error: "Name and email are required."
        })
      };
    }

    if (!EMAIL_RE.test(email)) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({
          error: "Please enter a valid email address."
        })
      };
    }

    const id = randomUUID();
    const ts = new Date().toISOString();

    // Save submission to DynamoDB
    await ddb.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          id,
          name,
          phone,
          email,
          message,
          createdAt: ts
        }
      })
    );

    // Send notification email
    const params = {
      Destination: {
        ToAddresses: [RECEIVER]
      },
      Message: {
        Subject: {
          Data: `Website Query Form: ${name}`,
          Charset: "UTF-8"
        },
        Body: {
          Text: {
            Data: `Full Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}
ID: ${id}
Time: ${ts}`,
            Charset: "UTF-8"
          }
        }
      },
      Source: SENDER,
      ReplyToAddresses: [email]
    };

    await ses.send(new SendEmailCommand(params));

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        ok: true,
        id
      })
    };
  } catch (err) {
    console.error("Error type:", err.name);
    console.error("Error message:", err.message);
    console.error("Stack trace:", err.stack);

    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({
        error: "Internal server error."
      })
    };
  }
};

function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://ebook.charless.xyz",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
    "Access-Control-Allow-Headers":
      "Content-Type,Authorization,X-Api-Key,X-Amz-Date,X-Amz-Security-Token"
  };
}
