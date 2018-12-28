export default {
  Query: {
    user: async (parent, { id }, { models: { User } }) => {
      return await User.findAll();
    },
    me: async (parent, args, { me: { id }, models: { User } }) => {
      return await User.findById(id);
    },
    users: async (parent, args, { models: { User } }) => {
      return await User.findAll();
    }
  },
  User: {
    messages: async ({ id }, args, { models: { Message } }) => {
      return await Message.findAll({
        where: { userId: id }
      });
    }
  }
};
