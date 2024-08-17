describe('Blog app', function() {
  beforeEach(function() {
    //每次测试前直接通过后端进行一个数据库的清空

    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'TayTay',
      name: 'Taylor Swift',
      password: 'queen13'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.wait(500)
    cy.visit('http://localhost:5173/')
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
  })

  describe('Log in', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('TayTay')
      cy.get('#password').type('queen13')
      cy.get('#login-button').click()

      cy.contains('Taylor Swift logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('TayTay')
      cy.get('#password').type('queen')
      cy.get('#login-button').click()

      cy.get('.fail')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Taylor Swift logged in')
    })
  })

  describe('When logged in', function() {

    beforeEach(function() {
      cy.login({ username: 'TayTay', password: 'queen13' })
    })

    it('a blog can be create', function() {
      cy.get('#show-button').click()
      cy.get('#title').type('Tesing Blog is here')
      cy.get('#author').type('zzh')
      cy.get('#url').type('http://testing.com/')
      cy.get('#add-new-blog').click()

      cy.get('.success')
        .should('contain', 'Added Tesing Blog is here')
        .and('have.css','color', 'rgb(0, 128, 0)')

      cy.contains('Tesing Blog is here')
    })
  })

  describe('When have a blog', function() {
    beforeEach(function() {
      cy.login({ username: 'TayTay', password: 'queen13' })
      cy.addBlog({ title: 'Tesing Blog is here', author: 'zzh', url: 'http://testing.com/' })
      cy.wait(2000)
    })

    it('A blog can be liked', function() {
      cy.get('#show-blog-detail').click()
      cy.get('#like-blog').click()
      cy.get('#likes-count').contains('1').parent().find('#like-blog')
        .should('contain', 'like')
    })

    it('A blog can be deleted', function() {
      cy.get('html').should('contain', 'Tesing Blog is here')

      cy.get('#show-blog-detail').click()
      cy.get('#remove-blog').click()

      cy.get('html').should('not.contain', 'Tesing Blog is here')
    })

    it('Cannot delete when not authorized', function() {
      cy.wait(1000)
      const user = {
        username: 'thffffffffffffff',
        name: 'thf',
        password: 'sodagreen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'thffffffffffffff', password: 'sodagreen' })

      cy.get('#show-blog-detail').click()
      cy.get('#remove-blog').click()

      cy.get('html').should('contain', 'Tesing Blog is here')
      cy.contains('Logout').click()
      cy.wait(1000)
    })

    it('sort the blogs', function() {
      cy.addBlog({ title: 'The blog with the most likes', author: 'zzh', url: 'http://testing.com/' })
      cy.addBlog({ title: 'The blog with the second most likes', author: 'zzh', url: 'http://testing.com/' })

      cy.contains('The blog with the most likes').contains('view').click()
      cy.get('.showDetail').contains('The blog with the most likes').contains('like').as('clicklike')
      cy.get('@clicklike').click()
      cy.wait(1000)
      cy.get('@clicklike').click()
      cy.wait(1000)

      cy.contains('The blog with the second most likes').contains('view').click()
      cy.get('.showDetail').contains('The blog with the second most likes').contains('like').click()

      cy.get('.blog').eq(0).should('contain', 'The blog with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The blog with the second most likes')
      cy.get('.blog').eq(2).should('contain', 'Tesing Blog is here')
    })

  })

})