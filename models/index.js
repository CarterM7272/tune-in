const User = require('./User');
const Youtube_accounts = require('./Youtube')

// Write Table relationships here

/* 

hasOne
belongsTo
hasMany
belongsToMany

example A.hasOne(B)
example2 B.belongsTo(A)
*/
Youtube_accounts.belongsTo(User, {
  foreignKey: 'user_id'
})
User.hasMany(Youtube_accounts, {
  foreignKey: 'youtube_account_list'
})
module.exports = { User, Youtube_accounts };
