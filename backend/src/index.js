const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  },
  {
    id: "link-1",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, { id }) => {
      var result = links.filter(link => {
        return link.id === id;
      });

      return result[0];
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, { id, description, url }) => {
      for (var i in links) {
        if (links[i].id == id) {
          links[i].description = description;
          links[i].url = url;
          return links[i];
        }
      }
    },
    deleteLink: (parent, { id }) => {
      let link = null;

      for (var i in links) {
        if (links[i].id == id) {
          link = links[i];
          links.splice(i, 1);
        }
      }

      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
