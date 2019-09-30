exports.index = (req, res, next) =>
{
	res.status(200).json(
	{
        message: "howdy user! Welcome to index"
    });	
}