"use strict";angular.module("playerApp").factory("fileUpload",["$filter","config","$timeout","toasterService","uuid4",function(e,t,i,n,o){var a={},l={},s={request:{endpoint:t.URL.BASE_PREFIX+t.URL.LEARNER_PREFIX+t.URL.CONTENT.UPLOAD_MEDIA,inputName:"file",customHeaders:{Accept:"application/json","X-Consumer-ID":"X-Consumer-ID","X-Device-ID":"X-Device-ID","X-msgid":o.generate(),ts:e("date")(new Date,"yyyy-MM-dd HH:mm:ss:sssZ"),"X-Source":"web","X-Org-code":"AP"}},failedUploadTextDisplay:{mode:"default",responseProperty:"error"},fileValidation:{itemLimit:10,sizeLimit:t.AnncmntMaxFileSizeToUpload,allowedExtensions:t.AnncmntAllowedFileExtension,stopOnFirstInvalidFile:!1}},r=function(e,t,i,n){if("OK"===i.responseCode){var o={name:t,mimetype:l.type,size:l.size,link:i.result.url};a.uploadSuccess(e,t,o)}},d=function(e,t){a.onCancel(e,t)},m=function(e){n.error(e)};return{createFineUploadInstance:function(e,t){a=_.merge({},e,s),i(function(){new qq.FineUploader({element:document.getElementById("fine-uploader-manual-trigger"),template:"qq-template-manual-trigger",autoUpload:!0,paramsInBody:!0,debug:!1,request:a.request,validation:a.fileValidation,messages:{sizeError:"{file} "+a.fileSizeErrorText+" "+a.fileSizeLimit/1024e3+" MB.",tooManyItemsError:"Too many items ({netItems}) would be uploaded. Item limit is {itemLimit}."},failedUploadTextDisplay:a.failedUploadTextDisplay,showMessage:m,text:{fileInputTitle:"UPLOAD ATTACHMENT"},callbacks:{onComplete:r,onSubmitted:function(e,t){this.setParams({filename:t,container:a.containerName}),l={type:this.getFile(e).type,size:this.getSize(e)}},onCancel:d}});t(!0),window.cancelUploadFile=function(){document.getElementById("hide-section-with-button").style.display="block"}},800)},onFileUploadSuccess:r,onFileUploadCancel:d,showErrorMessage:m}}]);