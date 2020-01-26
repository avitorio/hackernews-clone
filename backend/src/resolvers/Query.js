function info() {
  return `This is the API of a Hackernews Clone`;
}
function feed(root, args, context, info) {
  return context.prisma.links();
}
function link(parent, { id }, context) {
  return context.prisma.link({ id });
}

module.exports = {
  feed
};
