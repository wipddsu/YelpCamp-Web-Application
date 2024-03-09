const Joi = require('joi');

// mongoose를 실행하기 전에 스키마 유효성 검사
module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    // image: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
  }).required(),
});

module.exports.reivewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
  }).required(),
});
