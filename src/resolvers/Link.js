exports.postedBy = (parent, args, context) => context.prisma.link.findUnique({
	where: {
		id: parent.id,
	},
}).postedBy();

exports.votes = (parent, args, context) => context.prisma.link.findUnique({
	where: {
		id: parent.id,
	},
}).votes();