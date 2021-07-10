exports.feed = async (parent, args, context) => {
	const where = args.filter ? {
		OR: [
			{
				description: {
					contains: args.filter,
				},
			},
			{
				url: {
					contains: args.filter,
				},
			},
		],
	} : {};
	const links = await context.prisma.link.findMany({
		where,
		skip: args.skip,
		take: args.take,
		orderBy: args.orderBy
	});
	const count = await context.prisma.link.count({ where })

	return {
		links,
		count,
	};
};

exports.link = (parent, args, context) => {
	const id = Number(args.id);
	return context.prisma.link.findUnique({
		where: {
			id
		}
	})
};
