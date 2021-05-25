const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	const newLink = await prisma.link.create({
		data: {
			description: 'link created from prisma',
			url: 'www.prismalink.com',
		},
	});

	const allLinks = await prisma.link.findMany();
	console.log(allLinks)

	const onlyLink = await prisma.link.findUnique({
		where: {
			id: 0
		}
	});
	console.log(onlyLink)

	const updateLink = await prisma.link.update({
		where: {
			id: 0
		},
		data: {
			description: 'link created from prisma',
			url: 'www.prismalink.com',
		}
	});
	console.log(updateLink)

	const deleteLink = await prisma.link.delete({
		where: {
			id: 0
		}
	});
};

main()
	.catch((error) => {
		throw error
	})
	.finally(async () => {
		await prisma.$disconnect()
	});