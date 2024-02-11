import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import BlogForm from './BlogForm';

test('renders content', () => {
	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'me',
		user: { name: 'test' },
	};

	const { container } = render(<Blog blog={blog} />);

	const div = container.querySelector('div');
	expect(div).toHaveTextContent(
		'Component testing is done with react-testing-library'
	);
});

test('clicking the view button once', async () => {
	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'me',
		url: 'localhost',
		likes: 5,
		user: { name: 'test' },
	};

	render(<Blog blog={blog} />);

	const user = userEvent.setup();
	const button = screen.getByText('view');
	await user.click(button);

	const url = screen.getByText('localhost');
	expect(url).toHaveTextContent('localhost');
});

test('clicking the like button twice', async () => {
	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'me',
		url: 'localhost',
		like: 5,
		user: { name: 'test' },
	};

	const mockHandler = jest.fn();

	render(<Blog blog={blog} updateBlog={mockHandler} />);

	const user = userEvent.setup();
	const button = screen.getByText('like');
	await user.dblClick(button);

	expect(mockHandler.mock.calls).toHaveLength(2);
});

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const createBlog = jest.fn();
	const user = userEvent.setup();

	render(<BlogForm createBlog={createBlog} />);

	const inputs = screen.getAllByRole('textbox');
	const sendButton = screen.getByText('create');

	await user.type(inputs[0], 'testing a form...');
	await user.type(inputs[1], 'testing a form...');
	await user.type(inputs[2], 'testing a form...');
	await user.click(sendButton);

	expect(createBlog.mock.calls).toHaveLength(1);
	expect(createBlog.mock.calls[0][0].author).toBe('testing a form...');
});
