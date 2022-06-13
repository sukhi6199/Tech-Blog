const User = require("./User");
const Blog = require("./Blog");
const Comments = require("./Comments")

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(Comments);
Comments.belongsTo(User);

Blog.hasMany(Comments);
Comments.belongsTo(Blog);


module.exports = {
    User,
    Blog,
    Comments
}