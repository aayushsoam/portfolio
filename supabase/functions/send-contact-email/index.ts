
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  organization: string;
  services: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, organization, services, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, organization, services });

    // Send email using your custom domain
    const emailResponse = await resend.emails.send({
      from: "Contact Form <noreply@aayushsoam.tech>",
      to: ["thakurrajeevsoam@gmail.com"],
      reply_to: email, // This allows you to reply directly to the sender
      subject: `🔥 New Contact Form Message from ${name} - ${organization}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 24px;">🎉 New Contact Form Submission!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone is interested in your services</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #495057; margin-top: 0; border-bottom: 2px solid #dee2e6; padding-bottom: 10px;">Contact Details</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #6c757d; display: block; margin-bottom: 5px;">👤 Full Name:</strong>
              <span style="font-size: 16px; color: #212529;">${name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #6c757d; display: block; margin-bottom: 5px;">📧 Email Address:</strong>
              <a href="mailto:${email}" style="color: #007bff; text-decoration: none; font-size: 16px;">${email}</a>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #6c757d; display: block; margin-bottom: 5px;">🏢 Organization:</strong>
              <span style="font-size: 16px; color: #212529;">${organization}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #6c757d; display: block; margin-bottom: 5px;">🔧 Services Needed:</strong>
              <span style="font-size: 16px; color: #212529;">${services}</span>
            </div>
          </div>
          
          <div style="background: #fff; border: 1px solid #dee2e6; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #495057; margin-top: 0; border-bottom: 2px solid #dee2e6; padding-bottom: 10px;">💬 Message:</h3>
            <div style="font-size: 16px; line-height: 1.6; color: #212529; white-space: pre-wrap;">${message}</div>
          </div>
          
          <div style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <strong>💡 Quick Actions:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Reply directly to this email to respond to ${name}</li>
              <li>Save their contact: ${email}</li>
              <li>Follow up within 24 hours for best results</li>
            </ul>
          </div>
          
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #dee2e6; margin-top: 30px;">
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              📅 Received on: ${new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'short'
              })} IST
            </p>
            <p style="color: #6c757d; font-size: 12px; margin: 10px 0 0 0; font-style: italic;">
              This email was sent from aayushsoam.tech contact form
            </p>
          </div>
        </body>
        </html>
      `,
      // Also send a plain text version for better deliverability
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Organization: ${organization}
Services: ${services}

Message:
${message}

---
Received on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
This email was sent from your aayushsoam.tech contact form.
      `
    });

    console.log("Email sent successfully:", emailResponse);

    // Log detailed response for debugging
    if (emailResponse.error) {
      console.error("Resend API Error:", emailResponse.error);
      return new Response(
        JSON.stringify({ 
          error: "Failed to send email", 
          details: emailResponse.error 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      message: "Email sent successfully from aayushsoam.tech"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Server error occurred", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
