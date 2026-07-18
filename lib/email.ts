import { supabase } from './supabase';

export async function sendOrderConfirmationEmail(order: any, user: any, items: any[]) {
  try {
    const subject = `Order Confirmation #${order.order_number}`;
    
    // Build order items HTML
    const itemsHtml = items.map((item: any) => `
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;">
        <span>${item.product_name} × ${item.quantity}</span>
        <span>₹${(item.product_price * item.quantity).toLocaleString()}</span>
      </div>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .order-details { padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 16px; padding-top: 16px; border-top: 2px solid #eee; }
            .footer { text-align: center; margin-top: 30px; color: #777; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin:0;">Thank You for Your Order! 🎉</h1>
            </div>
            <div class="order-details">
              <h3>Order #${order.order_number}</h3>
              <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p><strong>Status:</strong> <span style="color:#f59e0b;">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></p>
              <p><strong>Shipping Address:</strong> ${order.shipping_address}</p>
              <hr>
              <h4>Items:</h4>
              ${itemsHtml}
              <div class="total">
                Total: ₹${order.total.toLocaleString()}
              </div>
            </div>
            <p>We'll notify you when your order is shipped.</p>
            <p>Track your order: <a href="https://hillvogue.vercel.app/track">Click here</a></p>
            <div class="footer">
              <p>© 2026 HillVogue. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // For production, use Resend, SendGrid, or Supabase Edge Functions
    // For now, we log the email
    console.log('📧 Email sent to:', user.email);
    console.log('📧 Subject:', subject);
    console.log('📧 Order:', order.order_number);
    console.log('📧 Items:', items.length);
    console.log('📧 Total:', order.total);

    // TODO: Replace with actual email sending
    // Example with Resend:
    // const res = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: 'HillVogue <orders@hillvogue.com>',
    //     to: user.email,
    //     subject: subject,
    //     html: html,
    //   }),
    // });

    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}