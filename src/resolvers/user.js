import _ from 'lodash';

export default {
  Query: {
    user: (parent, { id }, { data }) => {
      return data.users[id];
    },
    me: (parent, args, { me }) => {
      return me;
    },
    users: (parent, args, { data }) => {
      return _.values(data.users);
    },
    messages: (parent, args, { data }) => {
      return _.values(data.messages);
    },
    message: (parent, { id }, { data }) => {
      return data.messages[id];
    }
  },
  User: {
    messages: ({ id }, args, { data }) => {
      return _.chain(data.messages)
        .values()
        .filter(m => m.userId === id)
        .value();
    }
  }
};
