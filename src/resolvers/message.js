import _ from 'lodash';
import uuid from 'uuid/v4';

export default {
  Mutation: {
    createMessage: (parent, { text }, { me, data }, info) => {
      const id = uuid();
      const message = { id, text, userId: me.id };
      data.messages[id] = message;
      data.users[me.id].messageIds.push(id);
      return message;
    },
    deleteMessage: (parent, { id }, { data }) => {
      const { [id]: message, ...otherMessages } = data.messages;
      if (!message) {
        return false;
      }
      data.messages = otherMessages;

      return true;
    }
  },
  Query: {
    messages: (parent, args, { data }) => {
      return _.values(data.messages);
    },
    message: (parent, { id }, { data }) => {
      return data.messages[id];
    }
  },
  Message: {
    user: ({ userId }, args, { me, data }, info) => {
      return data.users[userId];
    }
  }
};
