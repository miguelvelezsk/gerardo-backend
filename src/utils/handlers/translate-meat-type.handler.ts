import { MeatType } from "@prisma/client";

export function translateMeatType(type: MeatType): string {
  switch (type) {
    case 'DESAYUNO': return 'Desayuno';
    case 'ALMUERZO': return 'Almuerzo';
    case 'CENA': return 'Cena';
    case 'MERIENDA': return 'Merienda';
    case 'MEDIAMANANA': return 'Media Mañana';
    case 'MEDIATARDE': return 'Media Tarde';
    default: return type;
  }
}