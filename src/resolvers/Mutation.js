const bcrypt = require('bcryptjs');;
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../utils');

exports.post = async (parent, args, context) => {
	const { userId } = context;

	return context.prisma.link.create({
		data: {
			url: args.url,
			description: args.description,
			postedBy: {
				connect: {
					id: userId,
				},
			},
		},
	});
};

exports.updateLink = async (parent, args, context) => {
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
};

exports.deleteLink = async (parent, args, context) => {
	const id = Number(args.id);
	return context.prisma.link.delete({
		where: {
			id,
		}
	});
};

exports.signUp = async (parent, args, context) => {
	const password = await bcrypt.hash(args.password, 10);
	const user = await context.prisma.user.create({
		data: {
			...args,
			password
		}
	});
	const token = jwt.sign({
		userId: user.id,
	}, APP_SECRET);

	return {
		token,
		user,
	}
}

exports.logIn = async (parent, args, context) => {
	const user = await context.prisma.user.findUnique({
		where: {
			email: args.email,
		}
	});

	if (!user) {
		throw new Error('No such user found :(');
	}

	const valid = await bcrypt.compare(args.password, user.password);

	if (!valid) {
		throw new Error('Invalid password :(');
	}

	const token = jwt.sign({
		userId: user.id,
	}, APP_SECRET);

	return {
		token,
		user,
	}
}