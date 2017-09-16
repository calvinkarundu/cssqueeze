import fs from 'fs';
import postcss from 'postcss';
import atImport from 'postcss-import';
import cssnano from 'cssnano';

const cssqueeze = async ({ config }) => {
  try {
    const cssSource = fs.readFileSync(config.source, 'utf8');

    const result = await postcss()
      .use(atImport())
      .use(cssnano({ preset: 'advanced' }))
      .process(cssSource, { from: config.source });

    const destinationFileStream = fs.createWriteStream(config.destination);

    destinationFileStream.write(result.css);
    destinationFileStream.end();

    return `\nsqueeeeeeeeezed into -> ${config.destination}\n`;
  } catch (err) {
    throw err;
  }
};

export { cssqueeze as default };
