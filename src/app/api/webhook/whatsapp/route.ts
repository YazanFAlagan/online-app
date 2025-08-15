import { NextRequest, NextResponse } from 'next/server';

// WhatsApp Cloud API configuration
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ADMIN_PHONE_NUMBER = process.env.ADMIN_PHONE_NUMBER; // Store owner's phone number

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify this is a Supabase webhook for new orders
    if (body.type === 'INSERT' && body.table === 'orders') {
      const order = body.record;
      
      // Fetch product details
      const productResponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products?id=eq.${order.product_id}`, {
        headers: {
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      });
      
      const products = await productResponse.json();
      const product = products[0];
      
      if (product && WHATSAPP_TOKEN && WHATSAPP_PHONE_NUMBER_ID && ADMIN_PHONE_NUMBER) {
        // Send WhatsApp notification
        await sendWhatsAppNotification(order, product);
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function sendWhatsAppNotification(order: any, product: any) {
  const message = `📦 New Zayana Order!

Name: ${order.name}
Product: ${product.name_en}
Quantity: ${order.quantity}
Phone: ${order.phone}
Address: ${order.address}

Order ID: ${order.id}
Total: $${(product.price * order.quantity).toFixed(2)}

🕐 ${new Date().toLocaleString()}`;

  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: ADMIN_PHONE_NUMBER,
        type: 'text',
        text: { body: message },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WhatsApp API error:', errorData);
    }
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error);
  }
}

export async function GET() {
  // WhatsApp webhook verification
  const searchParams = new URLSearchParams();
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return new Response('Forbidden', { status: 403 });
}
