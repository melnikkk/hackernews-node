exports.link = (parent, args, context) => context.prisma.vote.findUnique({
	where: {
		id: parent.id,
	}
}).link();

exports.user = (parent, args, context) => context.prisma.vote.findUnique({
	where: {
		id: parent.id,
	}
}).user();