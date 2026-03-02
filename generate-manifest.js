import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const productsDir = './data/products';
const files = readdirSync(productsDir).filter(f => f.endsWith('.json'));

writeFileSync(
  './data/products-manifest.json',
  JSON.stringify({ files }, null, 2)
);

console.log(`✅ Generated manifest with ${files.length} products`);
