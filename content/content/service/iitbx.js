/*
Made by Tanmoy Ghosh (tantrojan)
*/
const request =require("request");

module.exports = {
	
	getAllAPI : function(req,res){
			var serverIp = "http://10.196.0.56:8000/";
			var requestUrl = "files/info/"
			var requestParameter = {
				uri: serverIp + requestUrl,
				method: "GET",
			}

			request(requestParameter, function(error, response, body) {
			  res.send(response.body);
			  // res.send(body);
			});
	},
	getByNameAPI : function(req,res){

	},
	getByTypeAPI : function(req,res){

	},

}