/*
Made by Tanmoy Ghosh (tantrojan)
*/
const request =require("request");

var storageUrl="";
var xAuth="";

function generateSwiftAuth()
{
	var serverIp = "http://10.129.103.86:5000/";
	var requestUrl = "v3/auth/tokens"
	var requestParameter = {
		uri: serverIp + requestUrl,
		method: "POST",
		body : '\n{ "auth": {\n    "identity": {\n      "methods": ["password"],\n      "password": {\n        "user": {\n          "name": "swift",\n          "domain": { "name": "default" },\n          "password": "swift"\n        }\n      }\n    },\n    "scope": {\n      "project": {\n        "name": "service",\n        "domain": { "name": "default" }\n      }\n    }\n  }\n}'
	}

	request(requestParameter, function(error, response, body) {
		// res.send();
		var resobj=JSON.parse(response.body)
		xAuth=response.headers['x-subject-token'];
		// xAuth=xAuth['x-subject-token'];
		storageUrl=resobj.token.catalog[0].endpoints[2].url;
		storageUrl=storageUrl.replace("controller","10.129.103.86")
		// res.send("storageUrl :"+ storageUrl + "\n xAuth :"+ xAuth);
	});
}

generateSwiftAuth();

module.exports = {
	
	getCoursesAPI :  function(req,res){
		
		var requestParameter = {
			uri: storageUrl,
			method: "GET",
			headers : {
				'x-auth-token' : xAuth,
				'content-type' : 'application/json'
				// 'data-type'	: 'image/png'
			}
		}

		var matrix={};
		request(requestParameter, function(error, response, body) {
		  var containers = response.body.split("\n");
		  containers=containers.slice(0,-1);
		  console.log(containers);
		  for(var i=0;i<containers.length;i++)
		  {
		  	
		  	matrix[i]=containers[i];
		  }
		  res.send(matrix);
		  // // res.send(body);
		  // res.send(response);
		});
	},
	getObjectsAPI : function(req,res){
	
		var requestParameter = {
			uri: storageUrl + "/"+ req.params['course_name'],
			method: "GET",
			headers : {
				'x-auth-token' : xAuth,
				'content-type' : 'application/json'
				// 'data-type'	: 'image/png'
			}
		}

		var matrix={};
		request(requestParameter, function(error, response, body) {
		  var objects = response.body.split("\n");
		  objects=objects.slice(0,-1);
		  console.log(objects);
		  for(var i=0;i<objects.length;i++)
		  {
		  	
		  	matrix[i]=objects[i];
		  }
		  res.send(matrix);
		});
	},
	getByTypeAPI : function(req,res){

	},

}
