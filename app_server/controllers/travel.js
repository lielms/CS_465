/* GET Homepage */
/* Defines controller function for travel routes*/
const travel = (req, res) => {
    res.render('travel', {title: "Travlr Getaways"});
};

module.exports = {
    travel
};