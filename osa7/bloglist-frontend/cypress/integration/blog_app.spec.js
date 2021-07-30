describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'yeet',
      username: 'yeet',
      password: 'yeet'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('yeet')
      cy.get('#password').type('yeet')
      cy.get('#login-button').click()

      cy.contains('yeet logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('yeet')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('html').should('not.contain', 'yeet logged in')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username: 'yeet',
        password: 'yeet'
      })
      cy.contains('create a new blog').click()
      cy.createBlog({
        title: 'Yeets adventures',
        author: 'Yeetimus',
        url: 'yeet.com',
        likes: 0
      })
    })

    it('A blog can be created', function() {
      cy.contains('Yeets adventures Yeetimus')
    })
    it('A blog can be liked', function(){
      cy.get('#view').click()
      cy.contains('0')
      cy.get('#like').click()
      cy.contains('1')
    })
    it('A blog can be removed', function() {
      cy.get('#view').click()
      cy.get('#remove').click()

      cy.get('html').should('not.contain', 'Yeets adventures Yeetimus')
    })
  })
  describe('Ordering blogs', function() {
    beforeEach(function(){
      cy.login({
        username: 'yeet',
        password: 'yeet'
      })
      cy.createBlog({
        title: 'Yeets adventures 1',
        author: 'Yeetimus',
        url: 'yeet.com',
        likes: 1
      })
      cy.createBlog({
        title: 'Yeets adventures 2',
        author: 'Teetimus',
        url: 'yeet2.com',
        likes: 2
      })
      cy.createBlog({
        title: 'Yeets adventures 3',
        author: 'Weetimus',
        url: 'yeet3.com',
        likes: 3
      })
    })
    it('Ordering blogs by likes', function() {
      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).should('contain', 3)
        cy.wrap(blogs[1]).should('contain', 2)
        cy.wrap(blogs[2]).should('contain', 1)
      })
    })
  })
})