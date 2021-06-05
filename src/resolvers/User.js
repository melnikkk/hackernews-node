exports.links = (parent, args, context) => {
	const id = Number(parent.id);
	return context.prisma.user.findUnique({
		where: {
			id,
		},
	}).links();
}