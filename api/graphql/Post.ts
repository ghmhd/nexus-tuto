import { schema } from "nexus";

schema.objectType({
  name: "Post",
  definition(t) {
    t.int("id");
    t.string("title");
    t.string("body");
    t.boolean("published");
  },
});

schema.extendType({
  type: "Query",
  definition(t) {
    t.field("drafts", {
      nullable: false,
      type: "Post",
      list: true,
      resolve(_root, _args, ctx, _info) {
        return ctx.db.post.findMany({
          where: {
            published: false,
          },
        });
      },
    });
    t.list.field("posts", {
      type: "Post",
      nullable: false,
      resolve(_root, _args, ctx) {
        return ctx.db.post.findMany({
          where: {
            published: true,
          },
        });
      },
    });
  },
});

schema.extendType({
  type: "Mutation",
  definition(t) {
    t.field("createDraft", {
      type: "Post",
      args: {
        body: schema.stringArg({ required: true }),
        title: schema.stringArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        return ctx.db.post.create({
          data: {
            ...args,
            published: false,
          },
        });
      },
    });

    t.field("publish", {
      type: "Post",
      args: {
        id: schema.intArg({ required: true }),
      },
      async resolve(_root, args, ctx) {
        let draft = await ctx.db.post.findOne({
          where: {
            id: args.id,
          },
        });
        if (!draft) {
          throw `the draft with id ${args.id}, does not exist`;
        }
        draft.published = true;
        return draft;
      },
    });
  },
});
