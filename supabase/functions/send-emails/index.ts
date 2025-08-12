
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: 'book-call' | 'contact';
  formData: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    date?: string;
    service?: string;
    message: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, formData }: EmailRequest = await req.json();

    // Send confirmation email to user
    const userConfirmationEmail = await resend.emails.send({
      from: "The Machine Monk <noreply@oscardhamala.com.np>",
      to: [formData.email],
      subject: type === 'book-call' 
        ? "Thank you for booking a call with The Machine Monk!"
        : "Thank you for contacting The Machine Monk!",
      html: generateUserConfirmationEmail(type, formData),
    });

    console.log("User confirmation email sent:", userConfirmationEmail);

    // Send notification email to themachinemonk.ai@gmail.com
    const notificationEmail = await resend.emails.send({
      from: "The Machine Monk <noreply@oscardhamala.com.np>",
      to: ["themachinemonk.ai@gmail.com"],
      subject: type === 'book-call' 
        ? `New Call Booking from ${formData.name}`
        : `New Contact Form Submission from ${formData.name}`,
      html: generateNotificationEmail(type, formData),
    });

    console.log("Notification email sent:", notificationEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        userEmail: userConfirmationEmail,
        notificationEmail: notificationEmail 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-emails function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function generateUserConfirmationEmail(type: string, formData: any): string {
  const isBookCall = type === 'book-call';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - The Machine Monk</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8B4513 0%, #D4AF37 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">The Machine Monk</h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">AI Solutions for Your Business</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background-color: #22c55e; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <svg width="30" height="30" fill="#ffffff" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <h2 style="color: #1f2937; margin: 0; font-size: 24px;">Thank You, ${formData.name}!</h2>
          </div>

          ${isBookCall ? `
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #8B4513; margin: 0 0 15px 0; font-size: 18px;">Your Call Booking Details</h3>
            <div style="color: #4b5563; line-height: 1.6;">
              <p style="margin: 8px 0;"><strong>Date:</strong> ${formData.date ? new Date(formData.date).toLocaleDateString() : 'To be confirmed'}</p>
              <p style="margin: 8px 0;"><strong>Service:</strong> ${formData.service || 'General Inquiry'}</p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${formData.phone}</p>
              ${formData.address ? `<p style="margin: 8px 0;"><strong>Address:</strong> ${formData.address}</p>` : ''}
            </div>
          </div>
          ` : `
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #8B4513; margin: 0 0 15px 0; font-size: 18px;">Your Message</h3>
            <p style="color: #4b5563; line-height: 1.6; margin: 0;">"${formData.message}"</p>
          </div>
          `}

          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">
              ${isBookCall 
                ? 'We have received your call booking request and will contact you within 24 hours to confirm your appointment.'
                : 'We have received your message and will get back to you as soon as possible.'
              }
            </p>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://themachinemonk.com" 
               style="display: inline-block; background: linear-gradient(135deg, #8B4513 0%, #D4AF37 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Visit Our Website
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #1f2937; padding: 30px; text-align: center;">
          <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 14px;">
            Best regards,<br>
            <strong style="color: #D4AF37;">The Machine Monk Team</strong>
          </p>
          <div style="margin: 20px 0;">
            <p style="color: #6b7280; font-size: 12px; margin: 5px 0;">
              📧 info@themachinemonk.com | 📞 +1 (555) 123-4567
            </p>
            <p style="color: #6b7280; font-size: 12px; margin: 5px 0;">
              📍 123 AI Avenue, Tech City, TC 12345
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateNotificationEmail(type: string, formData: any): string {
  const isBookCall = type === 'book-call';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New ${isBookCall ? 'Call Booking' : 'Contact Form'} - The Machine Monk</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #dc2626 0%, #f59e0b 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">New ${isBookCall ? 'Call Booking' : 'Contact Form'}</h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">The Machine Monk</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 18px;">
              🔔 New ${isBookCall ? 'Call Booking' : 'Contact'} Submission
            </h3>
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              Received at: ${new Date().toLocaleString()}
            </p>
          </div>

          <!-- Customer Details -->
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Customer Information</h3>
            <div style="color: #4b5563; line-height: 1.8;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${formData.name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${formData.email}" style="color: #2563eb;">${formData.email}</a></p>
              ${formData.phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${formData.phone}" style="color: #2563eb;">${formData.phone}</a></p>` : ''}
              ${formData.address ? `<p style="margin: 10px 0;"><strong>Address:</strong> ${formData.address}</p>` : ''}
              ${isBookCall && formData.date ? `<p style="margin: 10px 0;"><strong>Preferred Date:</strong> ${new Date(formData.date).toLocaleDateString()}</p>` : ''}
              ${isBookCall && formData.service ? `<p style="margin: 10px 0;"><strong>Service:</strong> ${formData.service}</p>` : ''}
            </div>
          </div>

          <!-- Message -->
          <div style="background-color: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #0c4a6e; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
            <p style="color: #0c4a6e; line-height: 1.6; margin: 0; font-style: italic;">
              "${formData.message}"
            </p>
          </div>

          <!-- Action Required -->
          <div style="background-color: #fee2e2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
            <h4 style="color: #dc2626; margin: 0 0 10px 0; font-size: 16px;">⚡ Action Required</h4>
            <p style="color: #7f1d1d; margin: 0; font-size: 14px;">
              Please respond to this ${isBookCall ? 'call booking request' : 'inquiry'} within 24 hours.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            This notification was sent from The Machine Monk website contact form.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

serve(handler);
