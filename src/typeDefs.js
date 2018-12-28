import { gql } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';

const getSchema = file => {
  const content = fs.readFileSync(__dirname.concat(`/schema/${file}`), 'utf8');
  return gql`
    ${content}
  `;
};

const files = fs.readdirSync(path.join(__dirname, 'schema'));
const schemas = files.map(getSchema);

export default schemas;
