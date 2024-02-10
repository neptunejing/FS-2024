const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((acc, ojb) => acc + ojb.likes, 0);
};

const mostLikes = (blogs) => {
	let currMaxLikes = 0;
	let mostLiked = {};
	blogs.forEach((blog) => {
		if (blog.likes > currMaxLikes) {
			currMaxLikes = blog.likes;
			mostLiked = blog;
		}
	});
	return {
		title: mostLiked.title,
		author: mostLiked.author,
		likes: mostLiked.likes,
	};
};

const authorWithMostBlogs = (blogs) => {
	// <author, cntOfBlogs>
	const map = new Map();
	blogs.forEach(({ author }) => {
		if (!map.has(author)) {
			map.set(author, 0);
		}
		map.set(author, map.get(author) + 1);
	});
	let author = '';
	let currMaxCnt = 0;
	map.forEach((v, k) => {
		if (v > currMaxCnt) {
			currMaxCnt = v;
			author = k;
		}
	});
	return {
		author: author,
		blogs: currMaxCnt,
	};
};

const authorWithMostLikes = (blogs) => {
	// <author, cntOfLikes>
	const map = new Map();
	blogs.forEach(({ author, likes }) => {
		if (!map.has(author)) {
			map.set(author, 0);
		}
		map.set(author, map.get(author) + likes);
	});
	let author = '';
	let currMaxCnt = 0;
	map.forEach((v, k) => {
		if (v > currMaxCnt) {
			currMaxCnt = v;
			author = k;
		}
	});
	return {
		author: author,
		likes: currMaxCnt,
	};
};

module.exports = {
	dummy,
	totalLikes,
	mostLikes,
	authorWithMostBlogs,
	authorWithMostLikes,
};
