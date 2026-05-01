import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/data';
import { nanoid } from 'nanoid';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { envoyerEmailSoumission } = require('@/lib/email');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const soumission = {
      id: nanoid(8).toUpperCase(),
      ...body,
      statut: 'nouveau',
      dateCreation: new Date().toLocaleDateString('fr-CA', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      }),
      dateISO: new Date().toISOString(),
    };

    // Sauvegarder dans JSON
    const soumissions = readJSON<typeof soumission[]>('soumissions.json');
    soumissions.unshift(soumission);
    writeJSON('soumissions.json', soumissions);

    // Envoyer email (non-bloquant)
    try {
      await envoyerEmailSoumission(soumission);
    } catch (emailError) {
      console.error('Erreur email:', emailError);
      // Ne pas faire échouer la soumission si l'email échoue
    }

    return NextResponse.json({ success: true, id: soumission.id });
  } catch (error) {
    console.error('Erreur soumission:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const soumissions = readJSON<unknown[]>('soumissions.json');
    return NextResponse.json(soumissions);
  } catch {
    return NextResponse.json([]);
  }
}
