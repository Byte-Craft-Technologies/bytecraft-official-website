import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { validateContactForm } from '@/domain/usecases/validateContactForm';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Server-side validation (CRITICAL: never trust client-side validation alone)
    const validation = validateContactForm(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    const { name, email, phone, company, projectType, budget, currency, message } = body;

    // Map project types to readable names
    const projectTypeLabels: Record<string, string> = {
      web: 'Site Web',
      mobile: 'Application Mobile',
      webapp: 'Application Web',
      api: 'Backend / API',
      consulting: 'Conseil',
      other: 'Autre',
    };

    // Map budget values to readable labels
    const budgetLabels: Record<string, Record<string, string>> = {
      FCFA: {
        small: '< 500 000 FCFA',
        medium: '500 000 - 2 000 000 FCFA',
        large: '2 000 000 - 5 000 000 FCFA',
        enterprise: '> 5 000 000 FCFA',
      },
      EUR: {
        small: '< 800 €',
        medium: '800 - 3 000 €',
        large: '3 000 - 8 000 €',
        enterprise: '> 8 000 €',
      },
      USD: {
        small: '< $850',
        medium: '$850 - $3,200',
        large: '$3,200 - $8,500',
        enterprise: '> $8,500',
      },
    };

    const projectTypeLabel = projectTypeLabels[projectType] || projectType;
    const budgetLabel = budget ? budgetLabels[currency]?.[budget] || budget : 'Non spécifié';

    // Send email to ByteCraft
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: 'ByteCraft Contact <onboarding@resend.dev>',
      to: ['bytecraft.technologies@gmail.com'],
      replyTo: email,
      subject: `Nouvelle demande de contact - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a1a;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #22d3ee 0%, #5EA1D6 100%); border-radius: 16px 16px 0 0; padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Nouvelle Demande de Contact</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Via bytecraft-technologies.com</p>
            </div>

            <!-- Content -->
            <div style="background-color: #1a1a2e; border-radius: 0 0 16px 16px; padding: 30px;">
              <!-- Client Info -->
              <div style="margin-bottom: 25px;">
                <h2 style="color: #22d3ee; font-size: 16px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">Informations Client</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #888; width: 140px;">Nom</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: white; font-weight: 500;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #888;">Email</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);"><a href="mailto:${email}" style="color: #22d3ee; text-decoration: none;">${email}</a></td>
                  </tr>
                  ${phone ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #888;">Téléphone</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: white;">${phone}</td>
                  </tr>
                  ` : ''}
                  ${company ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #888;">Entreprise</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: white;">${company}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <!-- Project Info -->
              <div style="margin-bottom: 25px;">
                <h2 style="color: #22d3ee; font-size: 16px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">Détails du Projet</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #888; width: 140px;">Type de projet</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: white;">
                      <span style="background: linear-gradient(135deg, #22d3ee 0%, #5EA1D6 100%); padding: 4px 12px; border-radius: 20px; font-size: 13px;">${projectTypeLabel}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #888;">Budget estimé</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: white; font-weight: 500;">${budgetLabel}</td>
                  </tr>
                </table>
              </div>

              <!-- Message -->
              <div>
                <h2 style="color: #22d3ee; font-size: 16px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">Message</h2>
                <div style="background-color: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; border-left: 4px solid #22d3ee;">
                  <p style="color: #e0e0e0; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

              <!-- CTA -->
              <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${email}?subject=Re: Votre demande de projet - ByteCraft Technologies"
                   style="display: inline-block; background: linear-gradient(135deg, #22d3ee 0%, #5EA1D6 100%); color: white; text-decoration: none; padding: 14px 30px; border-radius: 30px; font-weight: 600; font-size: 14px;">
                  Répondre à ${name}
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
              <p style="margin: 0;">© ${new Date().getFullYear()} ByteCraft Technologies</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Resend error:', error);
      }
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}