module.exports = {
  format_date: function(date) {
    // Format date as MM/DD/YYYY
    return new Date(date).toLocaleDateString();
  },
  format_amount: function(amount) {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
};

