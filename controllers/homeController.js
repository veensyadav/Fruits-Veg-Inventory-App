const Category = require('../models/category');

exports.home_detail = function (req, res, next) {
  Category.find({}, 'name').exec((err, categories) => {
    if (err) next(err);

    res.render('index', { title: 'Home', content: 'home', props: { categories } });
  });
};
