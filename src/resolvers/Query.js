exports.feed = (parent, args, context) => context.prisma.link.findMany();

exports.link = (parent, args, context) => {
	const id = Number(args.id);
	return context.prisma.link.findUnique({
		where: {
			id
		}
	})
};
