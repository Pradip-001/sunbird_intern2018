/*
Added by Tanmoy Ghosh (tantrojan)
*/
const request =require("request");
const http = require("http");
var storageUrl="";
var xAuth="";
var fs = require('fs');
var path = require('path');

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
	
	getCoursesAPI : function(req,res){
		
		console.log(storageUrl +"\n"+ xAuth);
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
	getParticularObjectAPI : function(req,res){
		var options = {
			method: 'GET',
			host: '10.129.103.86',
			port: 8080,
			path: '/v1/AUTH_b3f70be8acad4ec197e2b5edf48d9e5a/' + req.params['course_name'] +'/' + req.params['obj_name'],
			headers : {
				'x-auth-token' : xAuth,
			}
		};

		var request = http.request(options, function(response) {
			var data = [];
			// console.log("CONNECTED TO SWIFT")
			response.on('data', function(chunk) {
				data.push(chunk);
			});

			response.on('end', function() {
				data = Buffer.concat(data);
				// console.log('requested content length: ', response.headers['content-length'] , response.headers['content-type']);
				// console.log('parsed content length: ', data.length);
				res.writeHead(200, {
					'Content-Type': response.headers['content-type'],
					'content-disposition' : 'inline',
					'Content-Length': data.length
				});
				res.end(data);
			});
		});

		request.end();
		
	},
	uploadCourseAPI : function(req,res){
		
		fileName = req.file.filename;
		mimeType = req.file.mimetype;
	
		file = fs.readFileSync(path.join(__dirname+'/uploads', fileName));
		// filepath= "@" + filepath;
		//res.send("OK")
 		var postheaders = {
 			'x-auth-token' : xAuth,
		    'Content-Type' : mimeType,
		    'Content-Length' : Buffer.byteLength(file, null)
		};
		// console.log(postheaders['Content-Length'])
		var options = {
		    host: '10.129.103.86',
			port: 8080,
			path: '/v1/AUTH_b3f70be8acad4ec197e2b5edf48d9e5a/marktwain/'+fileName,
		    method: 'PUT',
		    headers : postheaders,
		    encoding : null
		};

		var reqPost = http.request(options, function(response) {
		    console.log("statusCode: ", response.statusCode);
			 
			response.on('data', function(d) {
		        console.info('POST result:\n');
		        process.stdout.write(d);
		        console.info('\n\nPOST completed')
		        res.send("OK DONE")
		    });

		});
		 
		console.log('Writing Data');
		reqPost.write(file,null);
		reqPost.end();
		reqPost.on('error', function(e) {
		    console.error(e);
		});
	}

}
