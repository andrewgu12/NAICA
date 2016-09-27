require('babel-register');

const express        = require('express');
const React          = require('react');
const ReactDOMServer = require('react-dom/server');
const router         = express.Router();
const Director       = require('../models/directors');
const DirectorTable  = require('../components/layouts/director_table.react');
const DirectorBox    = require('../components/generic/director.react');

router.get('/', (req, res, next) => {
  let testDirector = new Director({
    name: 'Test Director',
    description: 'Test Description',
    imgSource: '/images/profiles/cchen.png',
    title: 'Test Title'
  });
  let testDirector2 = new Director({
    name: 'Test Director',
    description: 'Test Description',
    imgSource: '/images/profiles/cseto.png',
    title: 'Test Title'
  });
  let testDirector3 = new Director({
    name: 'Test Director',
    description: 'Test Description',
    imgSource: '/images/profiles/vyu.png',
    title: 'Test Title'
  });
  let testDirector4 = new Director({
    name: 'Test Director',
    description: 'Test Description',
    imgSource: '/images/profiles/dchou.png',
    title: 'Test Title'
  });
  let testDirector5 = new Director({
    name: 'Test Director',
    description: 'Test Description',
    imgSource: '/images/profiles/aliu.png',
    title: 'Test Title'
  });

  const directorBox1 = ReactDOMServer.renderToString(React.createElement(DirectorBox, {director: testDirector}));
  const directorBox2 = ReactDOMServer.renderToString(React.createElement(DirectorBox, {director: testDirector2}));
  const directorBox3 = ReactDOMServer.renderToString(React.createElement(DirectorBox, {director: testDirector3}));
  const directorBox4 = ReactDOMServer.renderToString(React.createElement(DirectorBox, {director: testDirector4}));
  const directorBox5 = ReactDOMServer.renderToString(React.createElement(DirectorBox, {director: testDirector5}));

  res.render('about/table', {
    title: 'About Us | NAICA',
    director1: directorBox1,
    director2: directorBox2,
    director3: directorBox3,
    director4: directorBox4,
    director5: directorBox5
  });
});

module.exports = router;
