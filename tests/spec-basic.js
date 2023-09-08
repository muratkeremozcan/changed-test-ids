const test = require('ava')
const { stripIndent } = require('common-tags')
const { findTestQueries } = require('../src')

test('finds no test id attributes', (t) => {
  const source = stripIndent`
    cy.visit('/')
  `
  const found = findTestQueries(source)
  t.deepEqual(found, [])
})

test('finds one test id query no quotes', (t) => {
  const source = stripIndent`
    cy.get('[data-test=greeting]')
  `
  const found = findTestQueries(source)
  t.deepEqual(found, ['greeting'])
})

test('finds one test id query with double quotes', (t) => {
  const source = stripIndent`
    cy.get('[data-test="greeting"]')
  `
  const found = findTestQueries(source)
  t.deepEqual(found, ['greeting'])
})

test('finds one test id query with spaces', (t) => {
  const source = stripIndent`
    cy.get('[data-test="personal greeting"]')
  `
  const found = findTestQueries(source)
  t.deepEqual(found, ['personal greeting'])
})
