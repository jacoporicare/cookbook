import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs-extra';
import * as jimp from 'jimp';

export function getTmpImgPath(slug: string): string {
  return path.join(os.tmpdir(), `cookbook/tmp/${slug}.jpg`);
}

export function getThumbPath(slug: string): string {
  return path.join(os.tmpdir(), `cookbook/thumbs/${slug}.jpg`);
}

process.on('message', async slug => {
  const tmpPath = getTmpImgPath(slug);
  const thumbPath = getThumbPath(slug);

  const fullImage = await fs.readFile(tmpPath);
  const jimpImage = await jimp.read(fullImage);
  const image = await jimpImage.cover(800, 800).getBufferAsync(jimpImage.getMIME());
  await fs.mkdirs(path.dirname(thumbPath));
  await fs.writeFile(thumbPath, image);
  await fs.remove(tmpPath);

  process.send!(slug);
});
