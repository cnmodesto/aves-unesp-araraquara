// Hierarquia taxonômica das aves baseada no CBRO (Comitê Brasileiro de Registros Ornitológicos)
// e IOC World Bird List

// Ordem filogenética das Ordens de aves presentes no projeto
export const ORDEM_TAXONOMICA: Record<string, number> = {
  'Columbiformes': 1,
  'Cuculiformes': 2,
  'Caprimulgiformes': 3,
  'Nyctibiiformes': 4,
  'Apodiformes': 5,
  'Charadriiformes': 6,
  'Pelecaniformes': 7,
  'Cathartiformes': 8,
  'Accipitriformes': 9,
  'Strigiformes': 10,
  'Coraciiformes': 11,
  'Piciformes': 12,
  'Cariamiformes': 13,
  'Falconiformes': 14,
  'Psittaciformes': 15,
  'Passeriformes': 16,
};

// Ordem filogenética das Famílias dentro de cada Ordem
// O número representa a posição global considerando ordem + família
export const FAMILIA_TAXONOMICA: Record<string, number> = {
  // Columbiformes (1)
  'Columbidae': 101,
  
  // Cuculiformes (2)
  'Cuculidae': 201,
  
  // Caprimulgiformes (3)
  'Caprimulgidae': 301,
  
  // Nyctibiiformes (4)
  'Nyctibiidae': 401,
  
  // Apodiformes (5)
  'Apodidae': 501,
  'Trochilidae': 502,
  
  // Charadriiformes (6)
  'Charadriidae': 601,
  
  // Pelecaniformes (7)
  'Ardeidae': 701,
  'Threskiornithidae': 702,
  
  // Cathartiformes (8)
  'Cathartidae': 801,
  
  // Accipitriformes (9)
  'Accipitridae': 901,
  
  // Strigiformes (10)
  'Tytonidae': 1001,
  'Strigidae': 1002,
  
  // Coraciiformes (11)
  'Alcedinidae': 1101,
  
  // Piciformes (12)
  'Ramphastidae': 1201,
  'Picidae': 1202,
  
  // Cariamiformes (13)
  'Cariamidae': 1301,
  
  // Falconiformes (14)
  'Falconidae': 1401,
  
  // Psittaciformes (15)
  'Psittacidae': 1501,
  
  // Passeriformes (16) - maior ordem, com mais famílias
  'Thamnophilidae': 1601,
  'Dendrocolaptidae': 1602,
  'Furnariidae': 1603,
  'Rhynchocyclidae': 1604,
  'Tyrannidae': 1605,
  'Vireonidae': 1606,
  'Corvidae': 1607,
  'Hirundinidae': 1608,
  'Troglodytidae': 1609,
  'Polioptilidae': 1610,
  'Turdidae': 1611,
  'Mimidae': 1612,
  'Passeridae': 1613,
  'Estrildidae': 1614,
  'Fringillidae': 1615,
  'Passerellidae': 1616,
  'Icteridae': 1617,
  'Thraupidae': 1618,
};

// Função auxiliar para obter a prioridade taxonômica de uma ave
export function getPrioridadeTaxonomica(ordem: string, familia: string): number {
  const prioridadeOrdem = ORDEM_TAXONOMICA[ordem] ?? 999;
  const prioridadeFamilia = FAMILIA_TAXONOMICA[familia] ?? (prioridadeOrdem * 100 + 99);
  return prioridadeFamilia;
}

// Função de comparação para ordenação taxonômica
export function compararTaxonomia(
  a: { ordem: string; familia: string; nomeCientifico: string },
  b: { ordem: string; familia: string; nomeCientifico: string }
): number {
  const prioridadeA = getPrioridadeTaxonomica(a.ordem, a.familia);
  const prioridadeB = getPrioridadeTaxonomica(b.ordem, b.familia);
  
  if (prioridadeA !== prioridadeB) {
    return prioridadeA - prioridadeB;
  }
  
  // Se mesma família, ordena por nome científico
  return a.nomeCientifico.localeCompare(b.nomeCientifico);
}
