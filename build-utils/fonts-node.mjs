import fs from 'fs';
import { download, isValidURL } from 'google-fonts-helper';

export async function generateFontFiles(fontLinks = []) {
  const cssContent = [];
  for (const fontLink of fontLinks) {
    if (isValidURL(fontLink)) {
      const downloader = download(fontLink, {
        base64: false,
        overwriting: true,
        outputDir: './',
        fontsDir: 'assets/fonts',
        stylePath: 'styles/fonts.css',
        fontsPath: '../assets/fonts',
      });

      downloader.hook('write-css:done', (_, fontCss) => {
        cssContent.push(fontCss);
      });

      await downloader.execute();
    }
  }
  saveFontStyles(cssContent);
}

function saveFontStyles(css) {
  fs.writeFileSync('./styles/fonts.css', css.join(''));
}
