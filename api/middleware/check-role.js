module.exports = (req, res, next) => 
{
	try 
    {
		console.log("on user role");
		next();
    } 
    catch (error) 
    {
        return res.status(401).json(
        	{
            message: 'Auth failed on user rbp'
        });
    }
};