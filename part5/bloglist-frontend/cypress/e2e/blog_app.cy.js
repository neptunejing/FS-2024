describe('Blog app', function () {
	beforeEach(function () {
		cy.visit('http://localhost:5173');
	});

	it('Login form is shown', function () {
		cy.get('#username').type('Antti');
		cy.get('#password').type('asd14sag');
		cy.get('#login-button').click();
	});

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('Antti');
			cy.get('#password').type('asd14sag');
			cy.get('#login-button').click();
		});

		it('fails with wrong credentials', function () {
			cy.get('#username').type('Antti');
			cy.get('#password').type('xxx');
			cy.get('#login-button').click();
		});
	});

	describe('When logged in', function () {
		const testNoteText = 'a test note';

		beforeEach(function () {
			cy.get('#username').type('Antti');
			cy.get('#password').type('asd14sag');
			cy.get('#login-button').click();
		});

		it('a blog can be created', function () {
			cy.contains('new note').click();
			cy.get('#title').type(testNoteText);
			cy.get('#author').type(testNoteText);
			cy.get('#url').type(testNoteText);
			cy.get('#create').click();
			cy.contains(testNoteText);
		});
	});
});
