import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/data';
import { auth } from '@/lib/auth';
import { nanoid } from 'nanoid';

interface Material {
  id: string;
  nom: string;
  prixUnitaire: number;
  unite: string;
  actif: boolean;
}

interface Category {
  id: string;
  nom: string;
  materiaux: Material[];
}

interface MaterialsData {
  categories: Category[];
}

export async function GET() {
  const materials = readJSON<MaterialsData>('materials.json');
  return NextResponse.json(materials);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { categorieId, materiau } = await request.json();
    const data = readJSON<MaterialsData>('materials.json');
    
    const cat = data.categories.find((c) => c.id === categorieId);
    if (!cat) return NextResponse.json({ error: 'Catégorie introuvable' }, { status: 404 });
    
    const newMat: Material = {
      id: nanoid(6),
      ...materiau,
      actif: true,
    };
    cat.materiaux.push(newMat);
    writeJSON('materials.json', data);
    return NextResponse.json({ success: true, materiau: newMat });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { categorieId, materiauId, updates } = await request.json();
    const data = readJSON<MaterialsData>('materials.json');
    
    const cat = data.categories.find((c) => c.id === categorieId);
    if (!cat) return NextResponse.json({ error: 'Catégorie introuvable' }, { status: 404 });
    
    const matIdx = cat.materiaux.findIndex((m) => m.id === materiauId);
    if (matIdx === -1) return NextResponse.json({ error: 'Matériau introuvable' }, { status: 404 });
    
    cat.materiaux[matIdx] = { ...cat.materiaux[matIdx], ...updates };
    writeJSON('materials.json', data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { categorieId, materiauId } = await request.json();
    const data = readJSON<MaterialsData>('materials.json');
    
    const cat = data.categories.find((c) => c.id === categorieId);
    if (!cat) return NextResponse.json({ error: 'Catégorie introuvable' }, { status: 404 });
    
    cat.materiaux = cat.materiaux.filter((m) => m.id !== materiauId);
    writeJSON('materials.json', data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
