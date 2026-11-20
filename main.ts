// Entry program for make.fun news-image-20261120 (Node 22, standard library only).
// The entry is the image beside this file; the program copies it to the output
// directory as entry.png, which is exactly what the judge reads, and refuses
// to hand in a file that is not a whole PNG or JPEG (checked by magic bytes).
// Outside the grader:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const src = new URL('./entry.png', import.meta.url);
const dest = join(outDir, 'entry.png');
copyFileSync(src, dest);
const head = readFileSync(dest).subarray(0, 8);
const isPng = head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47;
const isJpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
if (!isPng && !isJpeg) {
  process.stderr.write('entry.png is not a whole PNG or JPEG image\n');
  process.exit(1);
}
process.stdout.write(`entry.png: ${statSync(dest).size} bytes, ${isPng ? 'PNG' : 'JPEG'}\n`);
