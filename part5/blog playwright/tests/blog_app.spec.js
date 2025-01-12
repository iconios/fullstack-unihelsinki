const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
    beforeEach(async({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
              name: 'Muyiwa Ikotun',
              username: 'muyiwa@hotmail.com',
              password: 'Muyiwa@123'
            }
        })
        await request.post('http://localhost:3003/api/users', {
            data: {
              name: 'Arturo Sensei',
              username: 'arturo@hotmail.com',
              password: 'Arturo@123'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        // Locators
        const heading = page.getByRole('heading', {name: /log into application/i})
        const username = page.getByLabel(/username/i)
        const password = page.getByLabel(/password/i)

        // Assertions
        expect(heading).toBeVisible
        expect(username).toBeVisible
        expect(password).toBeVisible
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            // Locators and Actions
            await loginWith(page, 'muyiwa@hotmail.com', 'Muyiwa@123')

            // Assertions
            await expect(page.getByText(/login successful/i)).toBeVisible()
            
        })

        test('fails with incorrect credentials', async ({ page }) => {
            // Locators and Actions
            await loginWith(page, 'muyiwa@hotmail.com', 'Wrong@123')

            // Assertions
            await expect(page.getByText(/Username or password is incorrect/i)).toBeVisible()  
            await expect(page.getByText(/login successful/i)).not.toBeVisible()          
        })

        test('a new blog can be created', async ({ page }) => {
            // Locators and Actions
            await loginWith(page, 'muyiwa@hotmail.com', 'Muyiwa@123')
            await expect(page.getByText(/login successful/i)).toBeVisible()

            await expect(page.getByText(/muyiwa ikotun logged-in/i)).toBeVisible()
            await page.getByRole('button', { name: /create new blog/i }).click()

            await page.getByTestId('title').fill('America must be great again')
            await page.getByTestId('author').fill('Donald Trump')
            await page.getByTestId('url').fill('https://en.wikipedia.org/wiki/Donald_Trump')

            await page.getByRole('button', { name: /create/i }).click()
            await expect(page.getByText(/a new blog america must be great again by donald trump added/i)).toBeVisible()
        })

        test('make sure blog can be liked', async ({ page }) => {
            // Locators and Actions
            await loginWith(page, 'muyiwa@hotmail.com', 'Muyiwa@123')
            await expect(page.getByText(/login successful/i)).toBeVisible()

            await expect(page.getByText(/muyiwa ikotun logged-in/i)).toBeVisible()
            await page.getByRole('button', { name: /create new blog/i }).click()

            await page.getByTestId('title').fill('America must be great again')
            await page.getByTestId('author').fill('Donald Trump')
            await page.getByTestId('url').fill('https://en.wikipedia.org/wiki/Donald_Trump')

            await page.getByRole('button', { name: /create/i }).click()
            await page.getByTestId('blogList').filter({hasText: /america must be great again donald trump/i}).getByRole('button').click()
        })

        test('only user who added a blog can delete the blog', async ({ page }) => {
            // Locators and Actions
            await loginWith(page, 'muyiwa@hotmail.com', 'Muyiwa@123')
            await expect(page.getByText(/login successful/i)).toBeVisible()

            await expect(page.getByText(/muyiwa ikotun logged-in/i)).toBeVisible()
            await page.getByRole('button', { name: /create new blog/i }).click()

            await page.getByTestId('title').fill('America must be great again')
            await page.getByTestId('author').fill('Donald Trump')
            await page.getByTestId('url').fill('https://en.wikipedia.org/wiki/Donald_Trump')
            await page.getByRole('button', { name: /create/i }).click()

            await page.getByTestId('blogList').filter({hasText: /america must be great again donald trump/i}).getByRole('button').click()
            
            await page.reload()
            await page.getByTestId('blogList').filter({hasText: /america must be great again donald trump/i}).getByRole('button').click()
            await expect(page.getByTestId('blogList').getByRole('button', { name: /remove/i })).toBeVisible()
        })

        test('another user cannot see delete button', async ({ page }) => {
            // Locators and Actions
            await loginWith(page, 'muyiwa@hotmail.com', 'Muyiwa@123')
            await expect(page.getByText(/login successful/i)).toBeVisible()

            await expect(page.getByText(/muyiwa ikotun logged-in/i)).toBeVisible()
            await page.getByRole('button', { name: /create new blog/i }).click()

            await page.getByTestId('title').fill('America must be great again')
            await page.getByTestId('author').fill('Donald Trump')
            await page.getByTestId('url').fill('https://en.wikipedia.org/wiki/Donald_Trump')
            await page.getByRole('button', { name: /create/i }).click()

            await page.getByTestId('blogList').filter({hasText: /america must be great again donald trump/i}).getByRole('button').click()
            
            await page.reload()
            await page.getByRole('button', { name: /logout/i}).click()
            await page.reload()

            await loginWith(page, 'arturo@hotmail.com', 'Arturo@123')
            await expect(page.getByText(/login successful/i)).toBeVisible()

            await expect(page.getByText(/arturo sensei logged-in/i)).toBeVisible()
            await page.getByTestId('blogList').filter({hasText: /america must be great again donald trump/i}).getByRole('button').click()
            await expect(page.getByTestId('blogList').getByRole('button', { name: /remove/i })).not.toBeVisible()
        })

        test('blogs are arranged according to number of likes', async ({ page }) => {
            // Locators and Actions
            await loginWith(page, 'muyiwa@hotmail.com', 'Muyiwa@123')
            await expect(page.getByText(/login successful/i)).toBeVisible()

            await expect(page.getByText(/muyiwa ikotun logged-in/i)).toBeVisible()

            await page.getByRole('button', { name: /create new blog/i }).click()
            await page.getByTestId('title').fill('America must be great again')
            await page.getByTestId('author').fill('Donald Trump')
            await page.getByTestId('url').fill('https://en.wikipedia.org/wiki/Donald_Trump')
            await page.getByRole('button', { name: /create/i }).click()

            await page.getByRole('button', { name: /create new blog/i }).click()
            await page.getByTestId('title').fill('Holy Bible')
            await page.getByTestId('author').fill('King James')
            await page.getByTestId('url').fill('https://en.wikipedia.org/wiki/King_James')
            await page.getByRole('button', { name: /create/i }).click()

            await page.locator('li').filter({ hasText: /holy bible king james/i }).getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'likes' }).click()
            await page.locator('li').filter({ hasText: /holy bible king james/i }).getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'likes' }).click()
            await expect(page.locator('li').filter({ hasText: /holy bible king james/i })).toContainText('2')
        })
    })
})