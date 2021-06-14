const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const { PubSub } = require('apollo-server');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Vote = require('./resolvers/Vote');
const { getUserId } = require('./utils');

const resolvers = {
	Query,
	Mutation,
	Subscription,
	Link,
	User,
	Vote,
}

const prisma = new PrismaClient();
const pubSub = new PubSub();

const server = new ApolloServer({
	typeDefs: fs.readFileSync(
		path.join(__dirname, 'schema.graphql'),
		'utf8'
	),
	resolvers,
	context: ({ req }) => ({
		...req,
		prisma,
		pubSub,
		userId: req && req.headers.authorization ? getUserId(req) : null,
	}),
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));