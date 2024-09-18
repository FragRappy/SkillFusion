import Category from "./Category.js";
import Comment from "./Comment.js";
import Lesson from "./Lesson.js";
import Like from "./Like.js";
import Rate from "./Rate.js";
import Step from "./Step.js";
import User from "./User.js";

Lesson.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(Lesson, {foreignKey: 'user_id'});

Like.belongsTo(User, {foreignKey: 'user_id' });
User.hasMany(Like, {foreignKey: 'user_id'});

Comment.belongsTo(Lesson, {foreignKey: 'lesson_id'});
Lesson.hasMany(Comment, {foreignKey: 'lesson_id'});

Comment.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(Comment, {foreignKey: 'user_id'});

Like.belongsTo(Comment, {foreignKey: 'comment_id'});
Comment.hasMany(Like,  {foreignKey: 'comment_id'});

Rate.belongsTo(Lesson, {foreignKey: 'lesson_id'});
Lesson.hasMany(Rate, {foreignKey: 'lesson_id'});

Rate.belongsTo(User, {foreignKey: 'user_id'});
User.hasOne(Rate, {foreignKey: 'user_id'});

Step.belongsTo(Lesson, {foreignKey: 'lesson_id'});
Lesson.hasMany(Step, {foreignKey: 'lesson_id'});

Category.belongsToMany(Lesson, {through : 'tag', timestamps: false});
Lesson.belongsToMany(Category, {through : 'tag', timestamps: false});

User.belongsToMany(Lesson, {through : 'follow', timestamps: false});
Lesson.belongsToMany(User, {through : 'follow', timestamps: false});

export {Category, Comment, Lesson, Like, Rate, Step, User};