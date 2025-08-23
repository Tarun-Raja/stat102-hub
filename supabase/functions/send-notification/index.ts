import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'announcement' | 'material';
  title: string;
  content?: string;
  materialType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, title, content, materialType }: NotificationRequest = await req.json();
    
    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get all subscribed email addresses
    const { data: subscribers, error: subscribersError } = await supabase
      .from('email_subscribers')
      .select('email')
      .eq('subscribed', true);

    if (subscribersError) {
      console.error('Error fetching subscribers:', subscribersError);
      throw subscribersError;
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ message: 'No subscribers found' }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const emailList = subscribers.map(sub => sub.email);
    
    // Prepare email content based on notification type
    let subject: string;
    let htmlContent: string;
    
    if (type === 'announcement') {
      subject = `New Announcement: ${title}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">📢 New Announcement</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">STAT102 - Applied Statistics</p>
          </div>
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
            <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px;">${title}</h2>
            ${content ? `<div style="color: #475569; line-height: 1.6; margin: 15px 0;">${content.replace(/\n/g, '<br>')}</div>` : ''}
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <a href="${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '') || 'https://your-site'}.lovable.app" 
                 style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500;">
                View Full Announcement
              </a>
            </div>
          </div>
        </div>
      `;
    } else {
      subject = `New Course Material: ${title}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">📚 New Course Material</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">STAT102 - Applied Statistics</p>
          </div>
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
            <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px;">${title}</h2>
            ${materialType ? `<div style="background: #e0f2fe; color: #0369a1; padding: 8px 12px; border-radius: 6px; font-size: 14px; font-weight: 500; display: inline-block; margin: 10px 0;">Type: ${materialType}</div>` : ''}
            <p style="color: #475569; line-height: 1.6; margin: 15px 0;">A new course material has been uploaded and is now available for download.</p>
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <a href="${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '') || 'https://your-site'}.lovable.app" 
                 style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500;">
                Access Course Materials
              </a>
            </div>
          </div>
        </div>
      `;
    }

    // Send email to all subscribers
    const emailResponse = await resend.emails.send({
      from: "STAT102 Course <noreply@resend.dev>",
      to: emailList,
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Notification sent to ${emailList.length} subscribers`,
      emailResponse 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);