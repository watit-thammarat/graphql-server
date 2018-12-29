import { gql } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';

const SCHEMA_FOLDER = 'schema';

const getSchema = file => {
  const content = fs.readFileSync(
    __dirname.concat(`/${SCHEMA_FOLDER}/${file}`),
    'utf8'
  );
  return gql`
    ${content}
  `;
};

const files = fs.readdirSync(path.join(__dirname, SCHEMA_FOLDER));
const schemas = files.map(getSchema);

export default schemas;
