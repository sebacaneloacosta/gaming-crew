import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not set in environment variables.');
    return new Response('Internal Server Error', { status: 500 });
  }

  // Resolver promesa de headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing svix headers in webhook request.');
    return new Response('Bad Request: Missing headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Unauthorized: Invalid signature', { status: 401 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, username, image_url } = payload.data;

    if (!id || !username || !image_url) {
      console.error('Missing data in user.created event payload:', payload.data);
      return new Response('Bad Request: Missing user data', { status: 400 });
    }

    try {
      await db.user.create({
        data: {
          externalUserId: id,
          username,
          imageUrl: image_url,
        },
      });
    } catch (error) {
      console.error('Error creating user in database:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  return new Response('Webhook handled successfully', { status: 200 });
}
