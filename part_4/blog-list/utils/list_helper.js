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

	for (const blog of blogs) {
		const numberOfBlogs =
			numberOfBlogsByAuthor.get(blog.author) === undefined
				? 1
				: numberOfBlogsByAuthor.get(blog.author) + 1;

		numberOfBlogsByAuthor.set(blog.author, numberOfBlogs);
	}

	const authorWithMostBlogs = [...numberOfBlogsByAuthor.entries()].reduce(
		(a, b) => (a[1] > b[1] ? a : b)
	); // this returns the author with most blogs and the number of blogs in an array (e.g., ["Robert C. Martin", 3])

	return {
		author: authorWithMostBlogs[0],
		blogs: authorWithMostBlogs[1],
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
};
