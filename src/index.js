import fs from 'fs';
import postcss from 'postcss';
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const config = {
    source: '',
    destination: '',
};

const css = fs.readFileSync(config.source, 'utf8');

postcss()
  .use(atImport())
  .use(autoprefixer())
  .use(cssnano())
  .process(css, {
    from: config.source,
  })
  .then((result) => {
    const fileStream = fs.createWriteStream(config.destination);
    fileStream.write(result.css);
    fileStream.end();
  })
  .catch((err) => {
      console.log(err);
  });
