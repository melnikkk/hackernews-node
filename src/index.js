const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const resolvers = {
	Query: {
		info: () => 'This is the API of a HackerNews Clone',
		feed: async (parent, args, context) => context.prisma.link.findMany(),
		link: async (parent, args, context) => {
			const id = Number(args.id);
			return context.prisma.link.findUnique({
				where: {
					id
				}
			})
		},
	},

	Mutation: {
		post: async (parent, args, context) => {
			return context.prisma.link.create({
				data: {
					url: args.url,
					description: args.description,
				},
			});
		},
		updateLink: async (parent, args, context) => {
			const id = Number(args.id);
			return context.prisma.link.update({
				where: {
					id,
				},
				data: {
					url: args.url,
					description: args.description,
				},
			});
		},
		deleteLink: async (parent, args, context) => {
			const id = Number(args.id);
			return context.prisma.link.delete({
				where: {
					id,
				}
			});
		},
	}
}

const prisma = new PrismaClient();

const server = new ApolloServer({
	typeDefs: fs.readFileSync(
		path.join(__dirname, 'schema.graphql'),
		'utf8'
	),
	resolvers,
	context: {
		prisma,
	},
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));