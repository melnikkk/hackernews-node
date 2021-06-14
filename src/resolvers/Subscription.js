const newLinkSubscription = (parent, args, context) =>
	context.pubSub.asyncIterator('NEW_LINK');

const newLink = {
	subscribe: newLinkSubscription,
	resolve: (payload) => payload,
};

const newVoteSubscribe= (parent, args, context) =>
	context.pubSub.asyncIterator('NEW_VOTE');

const newVote = {
	subscribe: newVoteSubscribe,
	resolve: (payload) => payload,
}

module.exports = {
	newLink,
	newVote,
}

