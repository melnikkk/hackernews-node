const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');

let links = [
	{
		id: 'link-0',
		description: 'My GitHub profile',
		url: 'https://github.com/melnikkk',
	}
]

let idCount = links.length;

const resolvers = {
	Query: {
		info: () => 'This is the API of a HackerNews Clone',
		feed: () => links,
		link: (parent, args) => links.find(({ id }) => id === args.id),
	},

	Mutation: {
		post: (parent, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url,
			}

			links.push(link);

			return link;
		},
		updateLink: (parent, args) => {
			const updatableLink = links.find(({ id }) => id === args.id);

			if (updatableLink) {
				return {
					...updatableLink,
					description: args.description ? args.description : updatableLink.description,
					url: args.url ? args.url : updatableLink.url,
				}
			}
		},
		deleteLink: (parent, args) => {
			return links.filter(({ id }) => args.id === id)[0];
		}
	}
}

const server = new ApolloServer({
	typeDefs: fs.readFileSync(
		path.join(__dirname, 'schema.graphql'),
		'utf8'
	),
	resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));