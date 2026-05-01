import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export function writeJSON(filename: string, data: unknown): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function getContent() {
  return readJSON<Record<string, unknown>>('content.json');
}

export function getCalculatorConfig() {
  return readJSON<Record<string, unknown>>('calculator.json');
}

export function getMaterials() {
  return readJSON<Record<string, unknown>>('materials.json');
}

export function getSoumissions() {
  return readJSON<unknown[]>('soumissions.json');
}
