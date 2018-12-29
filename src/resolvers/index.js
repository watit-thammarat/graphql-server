import { GraphQLDateTime } from 'graphql-iso-date';

import user from './user';
import message from './message';

const customScalarResolver = {
  Date: GraphQLDateTime
};

export default [customScalarResolver, user, message];
