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

	console.log(allLinks);
};

main()
	.catch((error) => {
		throw error
	})
	.finally(async () => {
		await prisma.$disconnect()
	});