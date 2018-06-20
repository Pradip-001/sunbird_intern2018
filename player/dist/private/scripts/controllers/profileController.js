"use strict";angular.module("playerApp").controller("ProfileController",["$scope","$rootScope","contentService","userService","toasterService","config","$timeout","$filter","uuid4","formValidation","searchService","$state","learnService","adminService","workSpaceUtilsService","configService","$q","$anchorScroll","telemetryService",function(e,s,r,a,t,n,o,i,d,l,c,u,f,m,g,p,b,y,h){var v=this;v.defaultLimit=4,v.limit=v.defaultLimit,v.resetLimit=0,v.userId=s.userId,v.formElmnt=p.getProfileAddInfformElmnt(),v.languages=v.formElmnt.languages,v.subjects=v.formElmnt.subjects,v.yearOfPassing=p.getYearOfPassingValues(),v.grades=v.formElmnt.grades,v.experienceForm=!1,v.isCurrentJobExist=!1,v.profileSummary="",v.isError=!1,v.contentSortBy="desc",v.quantityOfContent=4,v.isViewMore=!0,v.isSameAddressTypeExist=!1,v.fieldsToBeValidate=[];var P=new Date,w=[];_.forEach(s.organisations,function(e){e.organisationId&&w.push(e.organisationId)}),v.generateInteractEvent=function(e){var r=h.ProfileSectionConfig[e];h.interactTelemetryData("profile",s.userId,e,"1.0",r,"profile-read")},v.formateDate=function(e){e.length&&e.forEach(function(e){e.updatedDate&&(e.updatedDate=new Date(e.updatedDate))},this)},v.processProfileData=function(e){if(v.loader.showLoader=!1,e&&"OK"===e.responseCode){var r=angular.copy(e.result.response);if(v.user=r,v.user.profileVisibility=r.profileVisibility,v.fullName=r.firstName+" "+r.lastName,v.email=r.email,r.dob=r.dob?new Date(r.dob):r.dob,v.formateDate(r.jobProfile),v.formateDate(r.address),v.formateDate(r.education),v.isAvatarUpdate&&(s.avatar=r.avatar),v.address=angular.copy(r.address),v.education=angular.copy(r.education),v.experience=angular.copy(r.jobProfile),v.user.lastLoginTime>0&&(v.lastLoginTime=angular.copy(v.user.lastLoginTime)),v.badgeAssertions=r.badgeAssertions,r.completeness&&(s.profileCompleteness=r.completeness,$(".profile-progress").progress({percent:s.profileCompleteness})),r.missingFields&&(s.profileMissingFields=r.missingFields),v.user.profileVisibility?s.privateProfileFields=Object.keys(v.user.profileVisibility):s.privateProfileFields=[],v.user.webPages){var a={};a.fb=v.user.webPages.find(function(e){return"fb"===e.type})||{type:"fb",url:""},a.twitter=v.user.webPages.find(function(e){return"twitter"===e.type})||{type:"twitter",url:""},a.in=v.user.webPages.find(function(e){return"in"===e.type})||{type:"in",url:""},a.blog=v.user.webPages.find(function(e){return"blog"===e.type})||{type:"blog",url:""},v.user.socialMedia=a}v.userSkills=void 0!==v.user.skills?v.user.skills:[],v.basicProfile=angular.copy(v.user)}else v.loader.showLoader=!1,v.isError=!0,t.error(s.messages.fmsg.m0005)},v.getProfile=function(e){v.loader=t.loader("",s.messages.stmsg.m0074),a.getUserProfile(v.userId,e).then(function(e){v.processProfileData(e)}).catch(function(){v.loader.showLoader=!1,v.isError=!0,t.error(s.messages.fmsg.m0005)}),h.impressionTelemetryData("profile",v.userId,"user","1.0","scroll","profile-read","/profile")},v.updateProfile=function(e){return e.userId=s.userId,v.updateProfileRequest={id:d.generate(),ts:i("date")(new Date,"yyyy-MM-dd HH:mm:ss:sssZ"),params:{},request:e},v.disableSave=!0,v.loader=t.loader("",s.messages.stmsg.m0075),a.updateUserProfile(v.updateProfileRequest,v.fullName,v.email).then(function(e){if(v.disableSave=!1,e&&"OK"===e.responseCode)return!0;throw"CLIENT_ERROR"===e.responseCode?new Error(e.params.errmsg):new Error("")}).catch(function(e){throw e.message?new Error(e.message):new Error(s.messages.fmsg.m0048)})},v.updateUserInfo=function(e,s,r,a){v.updateProfile(e).then(function(){v[s]=!1,t.success(r),v.getProfile("completeness,missingFields")}).catch(function(e){v.loader.showLoader=!1,e.message?t.error(e.message):t.error(a)})},v.openImageBrowser=function(){$("#iconImageInput").click()},v.validateAvatar=function(e){var r=b.defer(),a=new FormData,o=new FileReader,i=n.ERROR.PROFILE_IMAGE_UPLOAD.err,d=n.ERROR.PROFILE_IMAGE_UPLOAD.errorType;if(e[0]&&e[0].name.match(/.(jpg|jpeg|png)$/i)&&e[0].size<4e6)return a.append("file",e[0]),o.readAsDataURL(e[0]),v.icon=a,v.iconUpdate=!0,r.resolve(!0),r.promise;throw t.warning(s.messages.imsg.m0005),h.errorTelemetryData("profile",v.userId,"profile-image","1.0",i,d,s.messages.imsg.m0005,"profile-read"),new Error("")},v.updateAvatar=function(e){try{v.validateAvatar(e).then(function(){v.icon.append("container","user/"+v.userId),r.uploadMedia(v.icon).then(function(e){if(e&&"OK"===e.responseCode){v.isAvatarUpdate=!0,v.updateProfile({avatar:e.result.url});var r={avatar:e.result.url};v.updateUserInfo(r,"basicProfileForm",s.messages.smsg.m0018,s.messages.fmsg.m0035)}else v.error=t.error(s.messages.fmsg.m0048)}).catch(function(){v.loader.showLoader=!1,v.error=t.error(s.messages.fmsg.m0048)})})}catch(e){}},v.webLink=function(){if(v.user.webPages){var e=[];return Object.keys(v.user.socialMedia).forEach(function(s){v.user.socialMedia[s].url.length&&e.push({type:s,url:v.user.socialMedia[s].url})}),e}return[]},v.EditBasicProfile=function(){v.fieldsToBeValidate=v.getFieldsToValidate("#basicInfoForm");var e=$("#editDob").calendar("get date"),r={firstName:v.user.firstName,lastName:v.user.lastName,gender:v.user.gender,dob:e instanceof Date?i("date")(e,"yyyy-MM-dd"):null,language:v.user.language,subject:v.user.subject,grade:v.user.grade,location:v.user.location};if(v.fieldsToBeValidate.length){if(!0!==l.validate("#basicInfoForm",v.fieldsToBeValidate))return!1;var a=v.webLink();v.webPages=a,r.webPages=v.webPages,v.updateUserInfo(r,"basicProfileForm",s.messages.smsg.m0022,s.messages.fmsg.m0039)}else v.user.firstName&&v.user.language.length?v.updateUserInfo(r,"basicProfileForm",s.messages.smsg.m0022,s.messages.fmsg.m0039):t.error(s.messages.fmsg.m0076)},v.addAddress=function(e){v.fieldsToBeValidate=v.getFieldsToValidate("#addressForm");var r;if(e.addressLine1&&e.city)if(v.fieldsToBeValidate.length){if(!0!==l.validate("#addressForm",v.fieldsToBeValidate))return!1;v.address.push(e),r={address:v.address},v.updateUserInfo(r,"addressForm",s.messages.smsg.m0026,s.messages.fmsg.m0046)}else r={address:v.address},v.updateUserInfo(r,"addressForm",s.messages.smsg.m0026,s.messages.fmsg.m0046);else t.error(s.messages.fmsg.m0076)},v.editAddress=function(e){v.fieldsToBeValidate=v.getFieldsToValidate("#addressForm");var r=l.validate(".addressForm",v.fieldsToBeValidate);if(!0!==r&&r.includes(!1))return!1;var a={address:e};v.updateUserInfo(a,"addressForm",s.messages.smsg.m0023,s.messages.fmsg.m0040)},v.deleteAddress=function(e){e.isDeleted=!0;var r={address:[e]};v.updateUserInfo(r,"addressForm",s.messages.smsg.m0016,s.messages.fmsg.m0043)},v.addEducation=function(e){v.fieldsToBeValidate=v.getFieldsToValidate(".educationForm");var r,a=angular.copy(e);if(e.degree&&e.name)if(v.fieldsToBeValidate.length){if(!0!==l.validate(".educationForm",v.fieldsToBeValidate))return!1;a.percentage=a.percentage?parseFloat(a.percentage):0,a.yearOfPassing=a.yearOfPassing?parseInt(a.yearOfPassing):0;var n=angular.copy(v.education);n.push(a),n.forEach(function(e){e.percentage=e.percentage?parseFloat(e.percentage):0,e.yearOfPassing=e.yearOfPassing?parseInt(e.yearOfPassing):0}),r={education:n},v.updateUserInfo(r,"educationForm",s.messages.smsg.m0024,s.messages.fmsg.m0044)}else r={education:v.education},v.updateUserInfo(r,"educationForm",s.messages.smsg.m0024,s.messages.fmsg.m0044);else t.error(s.messages.fmsg.m0076)},v.editEducation=function(e){v.fieldsToBeValidate=v.getFieldsToValidate(".educationForm");var r=l.validate(".educationForm",v.fieldsToBeValidate);if(!0!==r&&r.includes(!1))return!1;e.forEach(function(e){e.percentage=e.percentage?parseFloat(e.percentage):0,e.yearOfPassing=e.yearOfPassing?parseInt(e.yearOfPassing):0});var a={education:e};v.updateUserInfo(a,"educationForm",s.messages.smsg.m0020,s.messages.fmsg.m0037)},v.deleteEducation=function(e){e.forEach(function(e){e.percentage=e.percentage?parseFloat(e.percentage):0,e.yearOfPassing=e.yearOfPassing?parseInt(e.yearOfPassing):0});var r={education:e};r.userId=s.userId,v.updateUserInfo(r,"educationForm",s.messages.smsg.m0014,s.messages.fmsg.m0041)},v.addExperience=function(e){v.fieldsToBeValidate=v.getFieldsToValidate(".jobProfileForm");var r;if(e.jobName&&e.orgName)if(v.fieldsToBeValidate.length){if(!0!==l.validate(".jobProfileForm",v.fieldsToBeValidate))return!1;var a=$("#rangestartAdd").calendar("get date"),n=$("#rangeendAdd").calendar("get date");e.isCurrentJob=e.isCurrentJob?"true"===e.isCurrentJob:null,n=e.isCurrentJob?null:n,e.joiningDate=a instanceof Date?i("date")(a,"yyyy-MM-dd"):null,e.endDate=n instanceof Date?i("date")(n,"yyyy-MM-dd"):null,e.userId=s.userId,v.experience.push(e),r={jobProfile:v.experience},v.updateUserInfo(r,"experienceForm",s.messages.smsg.m0025,s.messages.fmsg.m0045)}else r={jobProfile:v.experience},v.updateUserInfo(r,"experienceForm",s.messages.smsg.m0025,s.messages.fmsg.m0045);else t.error(s.messages.fmsg.m0076)},v.editExperience=function(e){v.fieldsToBeValidate=v.getFieldsToValidate(".jobProfileForm");var r=l.validate(".jobProfileForm",v.fieldsToBeValidate);if(!0!==r&&r.includes(!1))return!1;e.length&&e.forEach(function(e,s){var r=$(".rangeStart").calendar("get date"),a=$(".rangeEnd").calendar("get date");r instanceof Array&&a instanceof Array?(e.joiningDate=r?i("date")(r[s],"yyyy-MM-dd"):e.joiningDate,e.endDate=a?i("date")(a[s],"yyyy-MM-dd"):e.endDate):(e.joiningDate=r?i("date")(r,"yyyy-MM-dd"):e.joiningDate,e.endDate=a?i("date")(a,"yyyy-MM-dd"):e.endDate)},this);var a={jobProfile:e};v.updateUserInfo(a,"experienceForm",s.messages.smsg.m0021,s.messages.fmsg.m0038)},v.deleteExperience=function(e){var r={jobProfile:[e]};r.userId=s.userId,v.updateUserInfo(r,"experienceForm",s.messages.smsg.m0015,s.messages.fmsg.m0042)},v.EditDetails=function(e){var r={profileSummary:e};v.updateUserInfo(r,"openDiscriptionEdit",s.messages.smsg.m0019,s.messages.fmsg.m0061)},v.setEditStart=function(e,s,r){o(function(){$("#"+e+s).calendar("set date",r)},500)},v.setEditEnd=function(e,s,r){o(function(){$("#"+e+s).calendar("set date",r)},500)},v.setDob=function(){$("#editDob").calendar("set date",v.user.dob),$("#editDob").calendar({maxDate:new Date(P.getFullYear(),P.getMonth(),P.getDate()),type:"date"}),o(function(){e.dobVis=!0},100)},o(function(){$(".ui.radio.checkbox").checkbox("attach events",".toggle.button").checkbox({onChange:function(){}})},1e3),v.setDropdownValue=function(){o(function(){$("#languageSelect").dropdown(),$("#languageSelect").dropdown("refresh"),$("#languageSelect").dropdown("set selected",v.user.languages)},100)},v.setSubject=function(){o(function(){$("#setSubjects").dropdown(),$("#setSubjects").dropdown("refresh"),$("#setSubjects").dropdown("set selected",v.user.subjects)},100)},v.setPassingYears=function(){o(function(){$("#passingYears").dropdown(),$("#passingYears").dropdown("refresh"),$("#passingYears").dropdown("set selected",v.yearOfPassing)},100)},v.setEditSubject=function(e,s,r){o(function(){var a="#"+e+s;$(a).dropdown(),$(a).dropdown("refresh"),$(a).dropdown("set selected",r)},100)},v.checkCurrentJob=function(e,s){var r=v.experience.find(function(e){return!0===e.isCurrentJob});r&&r.id!==e.id&&!0===s?v.isCurrentJobExist=!0:(v.isCurrentJobExist=!1,e.isCurrentJob=s)},v.setJobProfileCheckbox=function(e,s){e.isCurrentJob=s},v.getContentLogo=function(e){var s=e.appIcon,r=e.mimeType;if(s)return e.appIcon;switch(r){case n.MIME_TYPE.pdf:return"/common/images/pdf.png";case n.MIME_TYPE.mp4:case n.MIME_TYPE.webm:return"/common/images/mp4.png";case n.MIME_TYPE.pYoutube:case n.MIME_TYPE.youtube:return"/common/images/youtubeFileIcon.jpg";case n.MIME_TYPE.h5p||n.MIME_TYPE.ePub:default:return"/common/images/zipFileIcon.png"}},v.getProfile("lastLoginTime"),v.getCreatedContentList=function(){var e={filters:{createdBy:v.userId,status:["Live"],contentType:n.contributeContentType},sort_by:{lastUpdatedOn:v.contentSortBy}};c.search(e).then(function(e){e&&"OK"===e.responseCode&&(v.contentList=e.result.content||[])}).catch(function(){})},v.openContentPlayer=function(e){"application/vnd.ekstep.content-collection"===e.mimeType?g.previewCollection(e,u.current.name):g.previewContent(e,u.current.name)},v.setSelectedGrades=function(){o(function(){$("#selectGrades").dropdown(),$("#selectGrades").dropdown("refresh"),$("#selectGrades").dropdown("set selected",v.user.grade)},100)},v.cancelEditExperience=function(){v.experienceForm=!1,v.isCurrentJobExist=!1,v.experience=v.getProfileObject(v.user.jobProfile)},v.getProfileObject=function(e){return angular.copy(e)},v.updateAction=function(e){switch(e){case"education":v.educationForm=!0,v.isNewEducation=!0,v.newEducation={},o(function(){y("educationForm")},100);break;case"jobProfile":v.experienceForm=!0,v.isNewExperience=!0,v.newExperience={},o(function(){y("jobProfileForm")},100);break;case"address":v.addressForm=!0,v.isNewAddress=!0,v.newAddress={},o(function(){y("addressForm")},100);break;case"avatar":v.openImageBrowser();break;case"profileSummary":v.openDiscriptionEdit=!0;break;case"lastName":case"email":case"phone":case"dob":case"gender":case"grade":case"language":case"location":case"subject":v.basicProfileForm=!0,o(function(){y("basicInfoForm")},100)}},v.getSkills=function(){a.getSkills().then(function(e){"OK"===e.responseCode&&(v.skills=e.result.skills)})},v.getSkills(),v.openAddSkillModal=function(){o(function(){$("#addSkillModal").modal({onShow:function(){$("#addSkill").dropdown("clear");var e=!1;$.fn.dropdown.settings.templates.addition=function(s){var r="Add ";return e||(r="Add "),r+='" <strong>'+s+'</strong> "'},$("#addSkill").dropdown({allowAdditions:!0,hideAdditions:!1,minCharacters:2,showNoResults:!0,onChange:function(e){},message:{addResult:"{term}"},onAdd:function(e,s,r){$(this).dropdown("remove selected",e)},onLabelCreate:function(e,s){return $(this)},onNoResults:function(s){return e=!1,!0}})},onHide:function(){}}).modal("show")},50),$("#addSkillModal").modal("refresh")},v.addSkills=function(){var e=!1,r=$("#addSkill").dropdown("get value"),n=r.split(",");v.userSkills.length&&v.userSkills.forEach(function(e){n=n.filter(function(s){return s!==e.skillName})});var o={request:{endorsedUserId:v.userId,skillName:n}};1===n.length&&0===n[0].length&&(e=!0),e||a.addSkills(o).then(function(e){e&&"OK"===e.responseCode?(t.success(s.messages.smsg.m0038),v.getProfile()):t.error(s.messages.fmsg.m0062)})},v.setLimit=function(e){v.limit=e<=0?v.userSkills.length:e},v.disableAddressOption=function(e){return console.log,v.address.filter(function(s){return s.addType===e}).length>0},v.getFieldsToValidate=function(e){var s=$(e+" .ng-dirty"),r={},a=[];if(s.length>0)for(var t=0;t<s.length;t++)r[s[t].name]=s[t].value,a=Object.keys(r);return a},v.checkAddress=function(e){v.address.length>1&&v.address[0].addType===v.address[1].addType?v.isSameAddressTypeExist=!0:v.isSameAddressTypeExist=!1}}]);