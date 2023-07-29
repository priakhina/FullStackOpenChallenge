const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
	const allLikes = blogs.map((blog) => blog.likes);
	const indexOfMostLikes = allLikes.indexOf(Math.max(...allLikes));

	if (indexOfMostLikes === -1) return null;

	const { title, author, likes } = blogs[indexOfMostLikes];
	return { title, author, likes };
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
