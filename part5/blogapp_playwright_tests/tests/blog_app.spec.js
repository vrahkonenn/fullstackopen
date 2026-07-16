const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlogWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Teppo Testaaja',
        username: 'testuser',
        password: 'testpass'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
      const locator = page.getByText('Log in to application')
      await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'testpass')
      await expect(page.getByText('testuser logged in')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrong')
      await expect(page.getByText('Invalid username or password')).toBeVisible()
      await expect(page.getByText('testuser logged in')).not.toBeVisible()
    })
  })

  describe('While logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'testpass')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlogWith(page, 'Blog made with playwright', 'Playwright tester', 'blog.com')
      await expect(page.getByText('Blog made with Playwright by Playwright tester')).toBeVisible()
    })

    test ('a blog can be liked', async ({ page }) => {
      await createBlogWith(page, 'Another blog made with playwright', 'Playwright tester', 'blog.com')
      await expect(page.getByText('Another blog made with playwright by Playwright tester')).toBeVisible()
      const showButtons = await page.getByRole('button', { name: 'Show' }).all()
      await showButtons[0].click()
      const likeButtons = await page.getByRole('button', { name: 'like' }).all()
      await likeButtons[0].click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })
  })
})