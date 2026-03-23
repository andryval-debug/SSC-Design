/**
 * MCM Design System — Tailwind Config
 * Source: Figma / MCM - DS - Foundation
 * Font family: Mulish
 * Generated: 2026-03-18
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        mcm: {
          blue:             '#133B62',
          'blue-light':     '#0069AA',
          'blue-pale':      '#B6C7D7',
          green:            '#42820D',
          'green-light':    '#7AC043',
          'green-progress': '#5E9732',
          gray:             '#555555',
          'gray-bg':        '#EDEDF2',
          'gray-footer':    '#333333',
        },
        semantic: {
          error:   '#D32F2F',
          warning: '#F57C00',
          caution: '#FFB300',
          success: '#388E3C',
          info:    '#0288D1',
        },
      },
      fontFamily: {
        sans: ['Mulish', 'sans-serif'],
      },
      fontWeight: {
        light:     '300',
        regular:   '400',
        medium:    '500',
        semibold:  '600',
        bold:      '700',
      },
      fontSize: {
        // Scale 01 — Headings
        'h1':          ['48px', { lineHeight: '1.167', letterSpacing: '-0.02083em', fontWeight: '500' }],
        'h1-tablet':   ['36px', { lineHeight: '1.222', letterSpacing: '-0.02em',    fontWeight: '500' }],
        'h1-mobile':   ['28px', { lineHeight: '1.286', letterSpacing: '-0.01786em', fontWeight: '500' }],
        'h1-hero':     ['60px', { lineHeight: '1.2',   letterSpacing: '-0.00833em', fontWeight: '300' }],
        // Scale 02 — Subheadings
        'subh1':       ['32px', { lineHeight: '1.25',  letterSpacing: '-0.03125em', fontWeight: '600' }],
        'subh2':       ['24px', { lineHeight: '1.333', letterSpacing: '-0.02em',    fontWeight: '600' }],
        'subh3':       ['20px', { lineHeight: '1.4',   letterSpacing: '-0.01em',    fontWeight: '600' }],
        // Scale 03 — Paragraphs
        'body':        ['16px', { lineHeight: '1.75',  fontWeight: '400' }],
        'body-lg':     ['18px', { lineHeight: '1.778', fontWeight: '400' }],
        'body-mobile': ['14px', { lineHeight: '1.714', fontWeight: '400' }],
        // Scale 04 — Captions
        'caption':     ['12px', { lineHeight: '1.667', fontWeight: '400' }],
        // Scale 05 — Quotes
        'quote':       ['20px', { lineHeight: '1.6',   letterSpacing: '-0.01em', fontWeight: '300' }],
        // Scale 06 — Overline
        'overline':    ['11px', { lineHeight: '1.455', letterSpacing: '0.08em',  fontWeight: '700' }],
        // Scale 07 — Small
        'small':       ['12px', { lineHeight: '1.5',   fontWeight: '400' }],
        // Scale 08 — Menu
        'menu':        ['16px', { lineHeight: '1.5',   fontWeight: '500' }],
        // Scale 09-13 — Form elements
        'label':       ['14px', { lineHeight: '1.286', fontWeight: '500' }],
        'form-value':  ['14px', { lineHeight: '1.286', fontWeight: '400' }],
        'btn':         ['14px', { lineHeight: '1.286', fontWeight: '500' }],
        'support':     ['12px', { lineHeight: '1.5',   fontWeight: '400' }],
        'tag':         ['12px', { lineHeight: '1',     fontWeight: '600' }],
        // Branding
        'brand-h1':    ['56px', { lineHeight: '1.143', letterSpacing: '-0.01786em', fontWeight: '400' }],
        'brand-h2':    ['48px', { lineHeight: '1.167', letterSpacing: '-0.02083em', fontWeight: '400' }],
        'brand-h3':    ['32px', { lineHeight: '1.25',  letterSpacing: '-0.03125em', fontWeight: '400' }],
      },
      backgroundColor: {
        page:   '#EDEDF2',
        footer: '#333333',
      },
      screens: {
        'mobile':  '375px',
        'tp':      '768px',   // Tablet Portrait
        'tl':      '1024px',  // Tablet Landscape
        'desktop': '1440px',
      },
    },
  },
  plugins: [],
}
