const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) return null;

	const allLikes = blogs.map((blog) => blog.likes);
	const indexOfMostLikes = allLikes.indexOf(Math.max(...allLikes));
	const { title, author, likes } = blogs[indexOfMostLikes];

	return { title, author, likes };
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return null;

	const numberOfBlogsByAuthor = new Map();

	for (const { author } of blogs) {
		const numberOfBlogs =
			numberOfBlogsByAuthor.get(author) === undefined
				? 1
				: numberOfBlogsByAuthor.get(author) + 1;

		numberOfBlogsByAuthor.set(author, numberOfBlogs);
	}

	const authorWithMostBlogs = [...numberOfBlogsByAuthor.entries()].reduce(
		(a, b) => (a[1] > b[1] ? a : b)
	); // this returns the author with most blogs and the number of blogs in an array (e.g., ["Robert C. Martin", 3])

	return {
		author: authorWithMostBlogs[0],
		blogs: authorWithMostBlogs[1],
	};
};

const mostLikes = (blogs) => {
	if (blogs.length === 0) return null;

	const numberOfLikesByAuthor = new Map();

	for (const { author, likes } of blogs) {
		const numberOfLikes =
			numberOfLikesByAuthor.get(author) === undefined
				? likes
				: numberOfLikesByAuthor.get(author) + likes;

		numberOfLikesByAuthor.set(author, numberOfLikes);
	}

	const authorWithMostLikes = [...numberOfLikesByAuthor.entries()].reduce(
		(a, b) => (a[1] > b[1] ? a : b)
	); // this returns the author with most likes and the number of likes in an array (e.g., ["Edsger W. Dijkstra", 17])

	return {
		author: authorWithMostLikes[0],
		likes: authorWithMostLikes[1],
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
