/* SpRestLib 1.8.0-beta-20180815 */
!function(e){function i(){}function a(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],u(e,this)}function n(r,i){for(;3===r._state;)r=r._value;return 0===r._state?void r._deferreds.push(i):(r._handled=!0,void a._immediateFn(function(){var e=1===r._state?i.onFulfilled:i.onRejected;if(null!==e){var t;try{t=e(r._value)}catch(e){return void s(i.promise,e)}o(i.promise,t)}else(1===r._state?o:s)(i.promise,r._value)}))}function o(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if(e instanceof a)return t._state=3,t._value=e,void l(t);if("function"==typeof r)return void u((i=r,n=e,function(){i.apply(n,arguments)}),t)}t._state=1,t._value=e,l(t)}catch(e){s(t,e)}var i,n}function s(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&a._immediateFn(function(){e._handled||a._unhandledRejectionFn(e._value)});for(var t=0,r=e._deferreds.length;t<r;t++)n(e,e._deferreds[t]);e._deferreds=null}function d(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function u(e,t){var r=!1;try{e(function(e){r||(r=!0,o(t,e))},function(e){r||(r=!0,s(t,e))})}catch(e){if(r)return;r=!0,s(t,e)}}var t=setTimeout;a.prototype.catch=function(e){return this.then(null,e)},a.prototype.then=function(e,t){var r=new this.constructor(i);return n(this,new d(e,t,r)),r},a.all=function(e){var s=Array.prototype.slice.call(e);return new a(function(i,n){function a(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){a(t,e)},n)}s[t]=e,0==--o&&i(s)}catch(e){n(e)}}if(0===s.length)return i([]);for(var o=s.length,e=0;e<s.length;e++)a(e,s[e])})},a.resolve=function(t){return t&&"object"==typeof t&&t.constructor===a?t:new a(function(e){e(t)})},a.reject=function(r){return new a(function(e,t){t(r)})},a.race=function(n){return new a(function(e,t){for(var r=0,i=n.length;r<i;r++)n[r].then(e,t)})},a._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){t(e,0)},a._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},a._setImmediateFn=function(e){a._immediateFn=e},a._setUnhandledRejectionFn=function(e){a._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=a:e.Promise||(e.Promise=a)}(this),function(){var u=!1,i={0:"List",1:"Library",3:"Discussion Board",4:"Survey",5:"Issue"},c={0:"None",1:"User",2:"Distribution List",4:"Security Group",8:"SharePoint Group",15:"All"},f={baseUrl:"..",busySpinnerHtml:'<div class="sprlib-spinner"><div class="sprlib-bounce1"></div><div class="sprlib-bounce2"></div><div class="sprlib-bounce3"></div></div>',cache:!1,cleanColHtml:!0,currencyChar:"$",language:"en",maxRetries:2,maxRows:5e3,metadata:!1,isNodeEnabled:!1,nodeCookie:"",nodeServer:"",retryAfter:1e3},d=null,t=/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i,r=0;function p(t){var e="("+(t=t||{}).status+") "+t.responseText;try{JSON.parse(t.responseText).error.code.split(",")[0],e="("+t.status+") "+JSON.parse(t.responseText).error.message.value}catch(e){u&&console.warn("Unable to parse jqXHR response:\n"+t.responseText)}return e}this.sprLib={},sprLib.version="1.8.0-beta-20180815",sprLib.baseUrl=function(e){if("string"!=typeof e||""==e||!e)return f.baseUrl;f.baseUrl=e.replace(/\/+$/,""),u&&console.log("APP_OPTS.baseUrl = "+f.baseUrl)},sprLib.file=function(e){var t={},n="";(e=e||{}).requestDigest||"undefined"!=typeof document&&document.getElementById("__REQUESTDIGEST")&&document.getElementById("__REQUESTDIGEST").value;if(e&&"string"==typeof e)n=encodeURI(e);else{if(!e||"object"!=typeof e||!e.hasOwnProperty("name"))return console.error("ERROR: A 'fileName' is required! EX: `sprLib.file('Documents/Sample.docx')` or `sprLib.file({ 'name':'Documents/Sample.docx' })`"),console.error("ARGS:"),console.error(e),null;n=encodeURI(e.name)}return n=n.replace(/\/$/gi,""),_fileName=n.substring(n.lastIndexOf("/")+1),0!=n.indexOf("/")&&_spPageContextInfo&&_spPageContextInfo.webServerRelativeUrl&&(n=_spPageContextInfo.webServerRelativeUrl+n),t.get=function(){return new Promise(function(t,r){sprLib.rest({url:"_api/web/GetFileByServerRelativeUrl('"+n+"')/$value",headers:{binaryStringResponseBody:!0}}).then(function(e){"undefined"!=typeof Blob?t(new Blob([e],{type:"application/octet-stream"})):t(Buffer.from(e,"binary"))}).catch(function(e){r(e)})})},t.info=function(i){return new Promise(function(e,t){var r={};if(i&&i.hasOwnProperty("version")&&isNaN(Number(i.version)))return console.error("ERROR: 'version' should be a number! EX: `sprLib.file('Sample.docx').info({ version:12 })`"),console.error("ARGS:"),console.error(i),null;sprLib.rest({url:"_api/web/GetFileByServerRelativeUrl('"+n+"')",queryCols:["Author/Id","CheckedOutByUser/Id","LockedByUser/Id","ModifiedBy/Id","CheckInComment","CheckOutType","ETag","Exists","Length","Level","MajorVersion","MinorVersion","Name","ServerRelativeUrl","TimeCreated","TimeLastModified","UniqueId","UIVersionLabel"],metadata:!1}).then(function(e){return r=e&&0<e.length?e[0]:{},["Author","CheckedOutByUser","LockedByUser","ModifiedBy"].forEach(function(e){r[e]&&r[e].__deferred&&delete r[e].__deferred,r[e]&&r[e].__metadata&&delete r[e].__metadata}),i&&i.version?sprLib.rest({url:"_api/web/GetFileByServerRelativeUrl('"+n+"')/versions("+512*Number(i.version)+")",queryCols:["CheckInComment","Created","IsCurrentVersion","Length","VersionLabel"],metadata:!1}).catch(function(e){throw e}):null}).then(function(t){t&&t[0]&&(Object.keys(t[0]).forEach(function(e){"VersionLabel"!=e&&(r[e]=t[0][e])}),r.MajorVersion=t[0].VersionLabel.split(".")[0],r.MinorVersion=t[0].VersionLabel.split(".")[1],r.UIVersionLabel=t[0].VersionLabel),e(r)}).catch(function(e){t(e)})})},t.perms=function(){return new Promise(function(t,r){sprLib.rest({url:"_api/web/GetFileByServerRelativeUrl('"+n+"')/ListItemAllFields/RoleAssignments",queryCols:["PrincipalId","Member/PrincipalType","Member/Title","RoleDefinitionBindings/Name","RoleDefinitionBindings/Hidden"]}).then(function(e){e.forEach(function(e,t){Object.defineProperty(e,"Roles",Object.getOwnPropertyDescriptor(e,"RoleDefinitionBindings")),delete e.RoleDefinitionBindings,e.Member.PrincipalId=e.PrincipalId,delete e.PrincipalId,e.Member.PrincipalType=c[e.Member.PrincipalType]||e.Member.PrincipalType}),t(e||[])}).catch(function(e){r(e)})})},t},sprLib.folder=function(e){var t={},i="";(e=e||{}).requestDigest||"undefined"!=typeof document&&document.getElementById("__REQUESTDIGEST")&&document.getElementById("__REQUESTDIGEST").value;if(e&&"string"==typeof e)i=encodeURI(e);else{if(!e||"object"!=typeof e||!e.hasOwnProperty("name"))return console.error("ERROR: A 'folderName' is required! EX: `sprLib.folder('Documents/Finance')` or `sprLib.folder({ 'name':'Documents/Finance' })`"),console.error("ARGS:"),console.error(e),null;i=encodeURI(e.name)}return i=i.replace(/\/$/gi,""),t.info=function(){return new Promise(function(r,t){sprLib.rest({url:"_api/web/GetFolderByServerRelativeUrl('"+i+"')",queryCols:["Name","ItemCount","ServerRelativeUrl","StorageMetrics/TotalSize","Properties/vti_x005f_timecreated","Properties/vti_x005f_timelastmodified","Properties/vti_x005f_hassubdirs","Properties/vti_x005f_isbrowsable","Properties/vti_x005f_foldersubfolderitemcount","Properties/vti_x005f_listname"],metadata:!1}).then(function(e){var t=e&&0<e.length?e[0]:{};t.Properties&&(t.Created=t.Properties.vti_x005f_timecreated?t.Properties.vti_x005f_timecreated:null,t.FolderCount=t.Properties.vti_x005f_foldersubfolderitemcount?t.Properties.vti_x005f_foldersubfolderitemcount:0,t.ItemCount=t.ItemCount?t.ItemCount:0,t.GUID=t.Properties.vti_x005f_listname?t.Properties.vti_x005f_listname:null,t.HasSubdirs=!!t.Properties.vti_x005f_hassubdirs&&"true"==t.Properties.vti_x005f_hassubdirs,t.Hidden=!!t.Properties.vti_x005f_isbrowsable&&"false"==t.Properties.vti_x005f_isbrowsable,t.Level=t.Properties.vti_x005f_level?t.Properties.vti_x005f_level:1,t.Modified=t.Properties.vti_x005f_timelastmodified?t.Properties.vti_x005f_timelastmodified:null,delete t.Properties),t.StorageMetrics&&t.StorageMetrics.TotalSize&&(t.TotalSize=Number(t.StorageMetrics.TotalSize)||0,delete t.StorageMetrics),r(t)}).catch(function(e){t(e)})})},t.files=function(){return new Promise(function(t,r){sprLib.rest({url:"_api/web/GetFolderByServerRelativeUrl('"+i+"')/Files",queryCols:["Author/Id","CheckedOutByUser/Id","LockedByUser/Id","ModifiedBy/Id","Author/Title","CheckedOutByUser/Title","LockedByUser/Title","ModifiedBy/Title","CheckInComment","CheckOutType","ETag","Exists","Length","Level","MajorVersion","MinorVersion","Name","ServerRelativeUrl","TimeCreated","TimeLastModified","Title","UniqueId"],metadata:!1}).then(function(e){e.forEach(function(e){e.Created=e.TimeCreated,delete e.TimeCreated,e.Modified=e.TimeLastModified,delete e.TimeLastModified,e.Length&&!isNaN(Number(e.Length))&&(e.Length=Number(e.Length)),e.CheckedOutByUser&&Array.isArray(e.CheckedOutByUser)&&0==e.CheckedOutByUser.length&&(e.CheckedOutByUser=null),e.LockedByUser&&Array.isArray(e.LockedByUser)&&0==e.LockedByUser.length&&(e.LockedByUser=null)}),t(e||[])}).catch(function(e){r(e)})})},t.folders=function(){return new Promise(function(t,r){sprLib.rest({url:"_api/web/GetFolderByServerRelativeUrl('"+i+"')/Folders",queryCols:["Name","ItemCount","ServerRelativeUrl","Properties/vti_x005f_timecreated","Properties/vti_x005f_timelastmodified","Properties/vti_x005f_hassubdirs","Properties/vti_x005f_isbrowsable","Properties/vti_x005f_foldersubfolderitemcount","Properties/vti_x005f_listname"],metadata:!1}).then(function(e){e.forEach(function(e){e.Properties&&(e.Created=e.Properties.vti_x005f_timecreated?e.Properties.vti_x005f_timecreated:null,e.FolderCount=e.Properties.vti_x005f_foldersubfolderitemcount?e.Properties.vti_x005f_foldersubfolderitemcount:0,e.ItemCount=e.ItemCount?e.ItemCount:0,e.GUID=e.Properties.vti_x005f_listname?e.Properties.vti_x005f_listname:null,e.HasSubdirs=!!e.Properties.vti_x005f_hassubdirs&&"true"==e.Properties.vti_x005f_hassubdirs,e.Hidden=!!e.Properties.vti_x005f_isbrowsable&&"false"==e.Properties.vti_x005f_isbrowsable,e.Level=e.Properties.vti_x005f_level?e.Properties.vti_x005f_level:1,e.Modified=e.Properties.vti_x005f_timelastmodified?e.Properties.vti_x005f_timelastmodified:null,0)}),t(e||[])}).catch(function(e){r(e)})})},t},sprLib.list=function(a){var e={},l="_api/lists",d=(a=a||{}).requestDigest||("undefined"!=typeof document&&document.getElementById("__REQUESTDIGEST")?document.getElementById("__REQUESTDIGEST").value:null);if(a.guid&&(a.name=a.guid),a&&"string"==typeof a)l+=t.test(a)?"(guid'"+a+"')":"/getbytitle('"+a.replace(/\s/gi,"%20")+"')";else{if(!a||"object"!=typeof a||!a.hasOwnProperty("name"))return console.error("ERROR: A 'listName' or 'listGUID' is required! EX: `sprLib.list('Employees')` or `sprLib.list({ 'name':'Employees' })`"),console.error("ARGS:"),console.error(a),null;l=a.baseUrl?a.baseUrl.replace(/\/+$/,"")+"/_api/lists":l,l+=t.test(a.name)?"(guid'"+a.name+"')":"/getbytitle('"+a.name.replace(/\s/gi,"%20")+"')"}function o(){return new Promise(function(t,r){sprLib.rest({url:l+"?$select=ListItemEntityTypeFullName"}).then(function(e){e&&Array.isArray(e)&&1==e.length?t({type:e[0].ListItemEntityTypeFullName}):r("Invalid result!")}).catch(function(e){r(e)})})}return e.cols=function(){return new Promise(function(t,r){sprLib.rest({url:l+"?$select=Fields&$expand=Fields",metadata:!1}).then(function(e){var r=[];(e&&e[0]&&e[0].Fields&&e[0].Fields.results?e[0].Fields.results:[]).forEach(function(e,t){e.Hidden||"Edit"==e.InternalName||"DocIcon"==e.InternalName||0==e.InternalName.indexOf("_")||r.push({dispName:e.Title,dataName:e.InternalName,dataType:e.TypeAsString,isAppend:e.AppendOnly||!1,isNumPct:-1<e.SchemaXml.toLowerCase().indexOf('percentage="true"'),isReadOnly:e.ReadOnlyField,isRequired:e.Required,isUnique:e.EnforceUniqueValues,defaultValue:e.DefaultValue||null,maxLength:e.MaxLength||null})}),t(r)}).catch(function(e){r(e)})})},e.info=function(){return new Promise(function(t,r){sprLib.rest({url:l+"?$select=Id,AllowContentTypes,BaseTemplate,BaseType,Created,Description,DraftVersionVisibility,EnableAttachments,EnableFolderCreation,EnableVersioning,ForceCheckout,HasUniqueRoleAssignments,Hidden,ItemCount,LastItemDeletedDate,LastItemModifiedDate,LastItemUserModifiedDate,ListItemEntityTypeFullName,Title",metadata:!1}).then(function(e){t(e&&0<e.length?e[0]:[])}).catch(function(e){r(e)})})},e.perms=function(e){return new Promise(function(t,r){sprLib.rest({url:l+"/RoleAssignments?$select=",queryCols:["PrincipalId","Member/PrincipalType","Member/Title","RoleDefinitionBindings/Name","RoleDefinitionBindings/Hidden"]}).then(function(e){e.forEach(function(e,t){Object.defineProperty(e,"Roles",Object.getOwnPropertyDescriptor(e,"RoleDefinitionBindings")),delete e.RoleDefinitionBindings,e.Member.PrincipalId=e.PrincipalId,delete e.PrincipalId,e.Member.PrincipalType=c[e.Member.PrincipalType]||e.Member.PrincipalType}),t(e||[])}).catch(function(e){r(e)})})},e.items=function(o){var s="";return new Promise(function(t,n){if(""!=(o=o||{})&&o!=[]||(o={}),o.queryFilter&&(o.queryFilter=o.queryFilter.replace(/\"/gi,"'")),"string"==typeof o||"number"==typeof o){var e={};e[o.toString()]={dataName:o.toString()},o={listCols:e}}else if(Array.isArray(o)){var i={};o.forEach(function(e,t){var r=-1<e.indexOf("/")?e.substring(0,e.indexOf("/")):e;e&&(i[r]=i[r]?{dataName:i[r].dataName+","+e}:{dataName:e})}),o={listCols:i}}else if("string"==typeof o.listCols){var r={};Object.keys(o).forEach(function(e,t){r[e]=o[e]}),o.listCols=[o.listCols];i={};o.listCols.forEach(function(e,t){var r=-1<e.indexOf("/")?e.substring(0,e.indexOf("/")):e;e&&(i[r]=i[r]?{dataName:i[r].dataName+","+e}:{dataName:e})}),r.listCols=i,o=r}else if(Array.isArray(o.listCols)){r={};Object.keys(o).forEach(function(e,t){r[e]=o[e]});i={};o.listCols.filter(function(e,t,r){return r.indexOf(e)===t}).forEach(function(e,t){var r=-1<e.indexOf("/")?e.substring(0,e.indexOf("/")):e;e&&(i[r]=i[r]?{dataName:i[r].dataName+","+e}:{dataName:e})}),r.listCols=i,o=r}else o.listCols||(o.listCols={});o.spArrData=[],o.spObjData={},"object"==typeof o.listCols&&0<Object.keys(o.listCols).length&&Object.keys(o.listCols).forEach(function(e){o.listCols[e].getVersions&&(o.metadata=!0)}),Promise.resolve().then(function(){return new Promise(function(e,t){var i={url:l+"/items",type:"GET",cache:o.cache||f.cache,metadata:o.metadata||f.metadata,headers:{Accept:"application/json;odata=verbose","X-RequestDigest":d}},n=[],a="";o.queryNext&&("object"==typeof o.queryNext&&o.queryNext.prevId&&o.queryNext.maxItems||(o.queryNext=null,console.log('ERROR: queryNext should be an object with `prevId` and `maxItems`. EX: `{"prevId":200,"maxItems":100}`'))),o.queryNext&&o.listCols&&0<Object.keys(o.listCols).length?i.url+="?%24skiptoken=Paged%3dTRUE%26p_ID%3d"+o.queryNext.prevId+"&%24select=":o.listCols&&0<Object.keys(o.listCols).length&&(i.url+="?$select="),Object.keys(o.listCols).forEach(function(e){var t=o.listCols[e];if(t.dataName&&("="==i.url.substring(i.url.length-1)?i.url+=t.dataName:i.url+=i.url.lastIndexOf(",")==i.url.length-1?t.dataName:","+t.dataName,-1<t.dataName.indexOf("/"))){var r=t.dataName.substring(0,t.dataName.indexOf("/"));-1==n.indexOf(r)&&(n.push(r),a+=(""==a?"":",")+r)}}),a&&(i.url+=(-1<i.url.indexOf("?")?"&":"?")+"$expand="+a),o.queryFilter&&(i.url+=(-1<i.url.indexOf("?")?"&":"?")+"$filter="+(-1==o.queryFilter.indexOf("%")?encodeURI(o.queryFilter):o.queryFilter)),o.queryOrderby&&(i.url+=(-1<i.url.indexOf("?")?"&":"?")+"$orderby="+o.queryOrderby),o.queryNext?i.url+="&p_ID="+o.queryNext.prevId+"&$top="+o.queryNext.maxItems:o.queryLimit&&(i.url+=(-1<i.url.indexOf("?$")?"&":"?")+"$top="+o.queryLimit),sprLib.rest(i).then(function(r){if((!o.listCols||0==Object.keys(o.listCols).length)&&0<r.length){var i={};Object.keys(r[0]).forEach(function(e,t){r[0][e]&&"object"==typeof r[0][e]&&r[0][e].__deferred?u&&console.log('FYI: Skipping "select all" column: '+e):i[e]={dataName:e}}),o.listCols=i}r.forEach(function(n,e){var a={},t=0;n.__metadata&&(a.__metadata=n.__metadata,n.__metadata.uri&&(-1<n.__metadata.uri.indexOf("/Items(")&&(t=Number(n.__metadata.uri.split("/Items(").pop().replace(")",""))),!s&&-1<n.__metadata.uri.indexOf("guid'")&&(s=n.__metadata.uri.split("guid'").pop().split("')/")[0]))),n.__next&&(a.__next=n.__next),Object.keys(o.listCols).forEach(function(e){var t=o.listCols[e],r=[],i="";if(t.dataName&&-1<t.dataName.indexOf("/")&&n[t.dataName.split("/")[0]].results){if(a[e])return;i=[],n[t.dataName.split("/")[0]].results.forEach(function(e,t){e.__metadata&&delete e.__metadata,i.push(e)})}else t.dataName&&-1<t.dataName.indexOf("/")?(r=t.dataName.split("/"),n[r[0]].__metadata&&delete n[r[0]].__metadata,n[r[0]].__deferred&&delete n[r[0]].__deferred,(i=e!=r[0]&&e!=t.dataName?n[r[0]][r[1]]:n[r[0]])&&"object"==typeof i&&!Array.isArray(i)&&0==Object.keys(i).length&&(i=null)):t.dataName?i=n[t.dataName]:t.dataFunc&&(i=t.dataFunc(n));"DateTime"==t.dataType?a[e]=new Date(i):a[e]=f.cleanColHtml&&"string"==t.listDataType?i.replace(/<div(.|\n)*?>/gi,"").replace(/<\/div>/gi,""):i,t.getVersions&&(a[e]=[])}),o.spArrData.push(a),t&&(o.spObjData[t]=a)}),e()}).catch(function(e){t(e)})})}).then(function(){var r=[],i=[];Object.keys(o.listCols).forEach(function(e){var t=o.listCols[e];t.getVersions&&(t.keyName=e,r.push(t),i.push(t.dataName))}),s&&r.length?sprLib.rest({url:(a.baseUrl?a.baseUrl+"/":"")+"_vti_bin/owssvr.dll?Cmd=Display&List=%7B"+s+"%7D&XMLDATA=TRUE&IncludeVersions=TRUE&Query=ID%20"+i.toString().replace(/\,/g,"%20")+"%20Modified%20Editor%20&SortField=Modified&SortDir=ASC"}).then(function(e){e&&e[0]&&e[0].documentElement&&e[0].documentElement.querySelectorAll("row").forEach(function(a){r.forEach(function(e,t){var r=a.getAttribute("ows_ID"),i="";if(o.spObjData[r]&&a.getAttribute("ows_"+e.dataName)){var n=a.getAttribute("ows_"+e.dataName)||"";n&&(n!=i?(o.spObjData[r][e.keyName].push({verDate:new Date(a.getAttribute("ows_Modified").replace(" ","T")).toISOString(),verName:a.getAttribute("ows_Editor").substring(a.getAttribute("ows_Editor").indexOf("#")+1),verText:n}),i=n):(o.spObjData[r][e.keyName].pop(),o.spObjData[r][e.keyName].push({verDate:new Date(a.getAttribute("ows_Modified").replace(" ","T")).toISOString(),verName:a.getAttribute("ows_Editor").substring(a.getAttribute("ows_Editor").indexOf("#")+1),verText:n})))}})}),t(o.spArrData)}).catch(function(e){n(e)}):t(o.spArrData)}).catch(function(e){n(e)})})},e.getItems=e.items,e.create=function(i){return new Promise(function(t,r){i&&!Array.isArray(i)&&"object"==typeof i&&0!=Object.keys(i).length||r("Object type expected! Ex: `{Title:'New Emp'}`");try{JSON.stringify(i)}catch(e){r("`JSON.stringify(jsonData)` failed! Send valid JSON Please. Ex: `{'Name':'Brent'}`")}i.__metadata=i.__metadata||{},delete i.__metadata.etag,delete i.__next,Promise.resolve().then(function(){return i.__metadata.type?null:o()}).then(function(e){e&&e.type&&(i.__metadata=e),sprLib.rest({type:"POST",url:l+"/items",data:JSON.stringify(i),metadata:!0,headers:{Accept:"application/json;odata=verbose","X-RequestDigest":d}}).then(function(e){e&&e[0]?(i.Id=e[0].Id,i.ID=e[0].ID,i.__metadata=i.__metadata||e[0].__metadata||{},i.__metadata.etag=i.__metadata.etag||(e[0].__metadata?e[0].__metadata.etag:null)):i=null,t(i)}).catch(function(e){r(e)})}).catch(function(e){r(e)})})},e.update=function(n){return new Promise(function(t,r){n&&!Array.isArray(n)&&"object"==typeof n&&0!=Object.keys(n).length||r("Object type expected! Ex: `{Title:'Brent'}`"),n.ID||n.Id||n.iD||n.id||r("Object must have an `Id` property! Ex: `{Id:99}`");try{JSON.stringify(n)}catch(e){r("`JSON.stringify(jsonData)` failed! Send valid object. Ex: `{'Title':'Brent'}`")}var i=n.ID||n.Id||n.iD||n.id;delete n.ID,delete n.Id,delete n.iD,delete n.id,n.__metadata=n.__metadata||{},""!=n.__metadata.etag&&null!=n.__metadata.etag||delete n.__metadata.etag,delete n.__next,Promise.resolve().then(function(){return n.__metadata.type?null:o()}).then(function(e){e&&e.type&&(n.__metadata.type=e.type),sprLib.rest({type:"POST",url:l+"/items("+i+")",data:JSON.stringify(n),metadata:!0,headers:{"X-HTTP-Method":"MERGE",Accept:"application/json;odata=verbose","X-RequestDigest":d,"IF-MATCH":n.__metadata.etag?n.__metadata.etag:"*"}}).then(function(e){n.Id=i,n.ID=i,n.__metadata.etag&&(n.__metadata.etag='"'+(Number(n.__metadata.etag.replace(/[\'\"]+/gi,""))+1)+'"'),t(n)}).catch(function(e){r(e)})})})},e.delete=function(n){return new Promise(function(t,r){n&&!Array.isArray(n)&&"object"==typeof n&&0!=Object.keys(n).length||r("Object type expected! Ex: `{'ID':123}`"),n.ID||n.Id||n.iD||n.id||r("Object data must have an `Id` property! Ex: `{'ID':123}`");try{JSON.stringify(n)}catch(e){r("`JSON.stringify(jsonData)` failed! Please pass a valid object. Ex: `{'ID':123}`")}var i=n.ID||n.Id||n.iD||n.id;delete n.ID,delete n.Id,delete n.iD,delete n.id,n.__metadata=n.__metadata||{},""!=n.__metadata.etag&&null!=n.__metadata.etag||delete n.__metadata.etag,delete n.__next,Promise.resolve().then(function(){return n.__metadata.type?null:o()}).then(function(e){e&&e.type&&(n.__metadata.type=e.type),sprLib.rest({type:"DELETE",url:l+"/items("+i+")",metadata:!0,headers:{Accept:"application/json;odata=verbose","X-RequestDigest":d,"X-HTTP-Method":"MERGE","IF-MATCH":n.__metadata.etag?n.__metadata.etag:"*"}}).then(function(){t(i)}).catch(function(e){r(e)})})})},e.recycle=function(i){return new Promise(function(e,t){i&&!Array.isArray(i)&&"object"==typeof i&&0!=Object.keys(i).length||t("Object type expected! Ex: `{'ID':123}`"),i.ID||i.Id||i.iD||i.id||t("Object data must have an `Id` property! Ex: `{'ID':123}`");try{JSON.stringify(i)}catch(e){t("`JSON.stringify(jsonData)` failed! Please pass a valid object. Ex: `{'ID':123}`")}var r=i.ID||i.Id||i.iD||i.id;delete i.ID,delete i.Id,delete i.iD,delete i.id,i.__metadata=i.__metadata||{},""!=i.__metadata.etag&&null!=i.__metadata.etag||delete i.__metadata.etag,delete i.__next,sprLib.rest({type:"POST",url:l+"/items("+r+")/recycle()",metadata:!0,headers:{Accept:"application/json;odata=verbose","X-RequestDigest":d}}).then(function(){e(Number(r))}).catch(function(e){t(e)})})},e},sprLib.rest=function(l){return new Promise(function(n,t){(l=l||{}).spArrData=[],l.cache=l.cache||f.cache,l.digest=l.requestDigest||("undefined"!=typeof document&&document.getElementById("__REQUESTDIGEST")?document.getElementById("__REQUESTDIGEST").value:null),l.metadata=void 0!==l.metadata&&null!=l.metadata?l.metadata:f.metadata,l.type=l.restType||l.type||"GET",l.url=(l.restUrl||l.url||f.baseUrl).replace(/\"/g,"'");var i=[],a="",o={url:l.url,type:l.type,cache:l.cache,headers:l.headers||{Accept:"application/json;odata=verbose","X-RequestDigest":l.digest}};if(l.data&&(o.data=l.data),"POST"!=o.type||o.headers.contentType||(o.headers["content-type"]="application/json;odata=verbose"),o.url=0==l.url.toLowerCase().indexOf("http")||0==l.url.indexOf("/")?"":f.baseUrl,o.url+=(0!=l.url.toLowerCase().indexOf("http")&&0!=l.url.indexOf("/")?"/":"")+l.url,l.queryCols){if(-1==o.url.toLowerCase().indexOf("$select")&&(o.url+="?$select="),"string"==typeof l.queryCols&&(l.queryCols=[l.queryCols]),Array.isArray(l.queryCols)){var s={};l.queryCols.forEach(function(e,t){var r=-1<e.indexOf("/")?e.substring(0,e.indexOf("/")):e;s[r]=s[r]?{dataName:s[r].dataName+","+e}:{dataName:e}}),l.queryCols=s}"object"==typeof l.queryCols&&Object.keys(l.queryCols).forEach(function(e){var t=l.queryCols[e];if(t.dataName&&("="==o.url.substring(o.url.length-1)?o.url+=t.dataName:o.url+=o.url.lastIndexOf(",")==o.url.length-1?t.dataName:","+t.dataName,-1<t.dataName.indexOf("/"))){t.dataName.substring(0,t.dataName.indexOf("/"));var r=t.dataName.substring(0,t.dataName.lastIndexOf("/"));-1==i.indexOf(r)&&(i.push(r),a+=(""==a?"":",")+r)}})}(l.queryFilter||-1<o.url.toLowerCase().indexOf("$select"))&&"GET"==l.type&&-1==l.url.toLowerCase().indexOf("$top")&&l.queryLimit&&(o.url+=(0<o.url.indexOf("?")?"&":"?")+"$top="+l.queryLimit),-1==l.url.toLowerCase().indexOf("$filter")&&l.queryFilter&&(o.url+=(0<o.url.indexOf("?")?"&":"?")+"$filter="+(-1==l.queryFilter.indexOf("%")?encodeURI(l.queryFilter):l.queryFilter)),-1==l.url.toLowerCase().indexOf("$orderby")&&l.queryOrderby&&(o.url+=(0<o.url.indexOf("?")?"&":"?")+"$orderby="+l.queryOrderby),-1==l.url.toLowerCase().indexOf("$expand")&&a&&(o.url+=(0<o.url.indexOf("?")?"&":"?")+"$expand="+a),Promise.resolve().then(function(){return new Promise(function(r,i){if(f.isNodeEnabled){if(!d)try{d=require("https")}catch(e){throw console.error("Unable to load `https`"),"LIB-MISSING-HTTPS"}o.headers.Cookie=f.nodeCookie,o.data&&(o.headers["Content-Length"]=o.data.length);var e={hostname:f.nodeServer,path:o.url,method:o.type,headers:o.headers},t=d.request(e,function(e){var t="";e.setEncoding("utf8"),e.on("data",function(e){t+=e}),e.on("end",function(){-1<t.indexOf("HTTP Error")?i():-1<t.indexOf('{"error"')&&-1<t.indexOf('{"code"')?i(JSON.parse(t).error.message.value+"\n\nURL used: "+o.url):r(t)}),e.on("error",function(e){i(JSON.parse(t).error.message.value+"\n\nURL used: "+o.url)})});o.data&&t.write(o.data),t.end()}else{t=new XMLHttpRequest;l.headers&&l.headers.binaryStringResponseBody&&(t.responseType="arraybuffer"),t.open(o.type,o.url,!0),Object.keys(o.headers||{}).forEach(function(e){t.setRequestHeader(e,o.headers[e])}),t.onload=function(){200<=t.status&&t.status<400?l.headers&&l.headers.binaryStringResponseBody?r(t.response):r(t.responseXML||t.responseText):i(p(t)+"\n\nURL used: "+o.url)},t.onerror=function(){i(p(t)+"\n\nURL used: "+o.url)},t.send(o.data?o.data:null)}}).catch(function(e){t(e)})}).then(function(e){if(l.headers&&l.headers.binaryStringResponseBody)n(e);else{var t=(e="string"==typeof e&&0==e.indexOf("{")?JSON.parse(e):e)&&e.d&&!e.d.results&&"object"==typeof e.d&&0<Object.keys(e.d).length?[e.d]:[];if(-1<o.url.toLowerCase().indexOf("owssvr.dll")&&-1<o.url.toLowerCase().indexOf("includeversions=true"))l.spArrData.push(e);else if(0<t.length||e&&e.d&&e.d.results&&"object"==typeof e.d.results)(0<t.length?t:e.d.results).forEach(function(s){var r={};if(l.queryCols?Array.isArray(l.queryCols)?l.queryCols.forEach(function(e){r[e]=f.cleanColHtml&&"string"==col.listDataType?colVal.replace(/<div(.|\n)*?>/gi,"").replace(/<\/div>/gi,""):colVal}):Object.keys(l.queryCols).forEach(function(n){var a=l.queryCols[n],e=[],o="";if(a.dataName&&-1<a.dataName.indexOf("/")&&s[a.dataName.split("/")[0]]&&s[a.dataName.split("/")[0]].results){if(r[n])return;o=[],s[a.dataName.split("/")[0]].results.forEach(function(e,t){e.__metadata&&delete e.__metadata,o.push(e)})}else a.dataName&&-1<a.dataName.indexOf("/")?(a.dataName.split(",").forEach(function(e,t){var r=e.split("/");s[r[0]]&&s[r[0]].__metadata&&delete s[r[0]].__metadata,s[r[0]]&&s[r[0]].__deferred&&delete s[r[0]].__deferred;var i=null;2==r.length?((i=s[r[0]])&&"object"==typeof i&&"results"==Object.keys(i)[0]&&(s[r[0]]=i.results),o=n!=r[0]&&n!=a.dataName?s[r[0]][r[1]]:s[r[0]]):3==r.length?((i=s[r[0]][r[1]])&&"object"==typeof i&&"results"==Object.keys(i)[0]&&(s[r[0]][r[1]]=i.results),o=n!=r[0]&&n!=a.dataName?s[r[0]][r[1]][r[2]]:s[r[0]]):4==r.length?((i=s[r[0]][r[1]][r[2]])&&"object"==typeof i&&"results"==Object.keys(i)[0]&&(s[r[0]][r[1]][r[2]]=i.results),o=n!=r[0]&&n!=a.dataName?s[r[0]][r[1]][r[2]][r[3]]:s[r[0]]):4<r.length&&console.log("This is madness!!")}),"object"!=typeof o||Array.isArray(o)||0!=Object.keys(o).length||(o=[])):a.dataName&&(e=a.dataName.split("/"),o=1<e.length?s[e[0]][e[1]]:s[e[0]]);"DateTime"==a.dataType?r[n]=new Date(o):r[n]=f.cleanColHtml&&"string"==a.listDataType?o.replace(/<div(.|\n)*?>/gi,"").replace(/<\/div>/gi,""):o}):Object.keys(s).forEach(function(e){var t=s[e];r[e]=t}),r.__metadata&&!l.metadata&&delete r.__metadata,e.d.__next){var i={prevId:"",maxItems:""};e.d.__next.split("&").forEach(function(e,t){-1<e.indexOf("p_ID%3d")?i.prevId=e.split("&")[0].split("%3d")[2]:-1<e.indexOf("%24top=")&&(i.maxItems=e.substring(e.lastIndexOf("=")+1))}),i.prevId&&i.maxItems&&(r.__next=i)}l.spArrData.push(r)});else if((e&&e.d?e.d:e||0)&&"object"==typeof(e.d||e)&&0<Object.keys(e.d||e).length){var r={},i=e.d||e;Object.keys(i).forEach(function(e){var t=i[e];r[e]=t}),r.__metadata&&!l.metadata&&delete r.__metadata,l.spArrData.push(r)}n(l.spArrData)}}).catch(function(e){!f.isNodeEnabled&&"string"==typeof e&&-1<e.indexOf("(403)")&&r<=f.maxRetries?Promise.resolve().then(function(){return sprLib.renewSecurityToken()}).then(function(){var e=document&&document.getElementById("__REQUESTDIGEST")?document.getElementById("__REQUESTDIGEST").value:null;u&&console.log("err-403: token renewed"),l.headers&&l.headers["X-RequestDigest"]&&(l.headers["X-RequestDigest"]=e),r++,sprLib.rest(l)}):(r=0,t(e))})})},sprLib.site=function(o){var e={},s=o?(o+"/").replace(/\/+$/g,"/"):"";return e.info=function(){return new Promise(function(r,t){Promise.all([sprLib.rest({url:s+"_api/web",queryCols:["Id","Title","Description","Language","Created","LastItemModifiedDate","LastItemUserModifiedDate","RequestAccessEmail","SiteLogoUrl","Url","WebTemplate","AssociatedOwnerGroup/Id","AssociatedMemberGroup/Id","AssociatedVisitorGroup/Id","AssociatedOwnerGroup/OwnerTitle","AssociatedMemberGroup/OwnerTitle","AssociatedVisitorGroup/OwnerTitle","AssociatedOwnerGroup/Title","AssociatedMemberGroup/Title","AssociatedVisitorGroup/Title"],cache:!1}),sprLib.rest({url:s+"_api/site",queryCols:["Owner/Email","Owner/LoginName","Owner/Title","Owner/IsSiteAdmin"],cache:!1})]).then(function(e){var t=e[0][0];t.Owner=e[1][0].Owner,delete t.Owner.__metadata,delete t.AssociatedMemberGroup.__metadata,delete t.AssociatedOwnerGroup.__metadata,delete t.AssociatedVisitorGroup.__metadata,t.hasOwnProperty("LastItemUserModifiedDate")&&!t.LastItemUserModifiedDate&&delete t.LastItemUserModifiedDate,r(t)}).catch(function(e){t(e)})})},e.lists=function(){return new Promise(function(t,r){sprLib.rest({url:s+"_api/web/lists",queryCols:["Id","Title","Description","ItemCount","BaseType","BaseTemplate","Hidden","ImageUrl","ParentWebUrl","RootFolder/ServerRelativeUrl"]}).then(function(e){e.forEach(function(e,t){e.ServerRelativeUrl=e.RootFolder&&e.RootFolder.ServerRelativeUrl?e.RootFolder.ServerRelativeUrl:null,e.RootFolder&&delete e.RootFolder,e.BaseType=i[e.BaseType]||e.BaseType}),t(e||[])}).catch(function(e){r(e)})})},e.subsites=function(){return new Promise(function(t,r){sprLib.rest({url:s+"_api/web/webs",queryCols:{Id:{dataName:"Id",dispName:"Id"},Name:{dataName:"Title",dispName:"Subsite Name"},UrlAbs:{dataName:"Url",dispName:"Absolute URL"},UrlRel:{dataName:"ServerRelativeUrl",dispName:"Relative URL"},Created:{dataName:"Created",dispName:"Date Created"},Modified:{dataName:"LastItemModifiedDate",dispName:"Date Last Modified"},Language:{dataName:"Language",dispName:"Language"},SiteLogoUrl:{dataName:"SiteLogoUrl",dispName:"Site Logo URL"}}}).then(function(e){t(e||[])}).catch(function(e){r(e)})})},e.perms=function(){return new Promise(function(t,r){sprLib.rest({url:s+"_api/web/roleAssignments",queryCols:["PrincipalId","Member/PrincipalType","Member/Title","RoleDefinitionBindings/Name","RoleDefinitionBindings/Hidden"]}).then(function(e){e.forEach(function(e,t){Object.defineProperty(e,"Roles",Object.getOwnPropertyDescriptor(e,"RoleDefinitionBindings")),delete e.RoleDefinitionBindings,e.Member.PrincipalId=e.PrincipalId,delete e.PrincipalId,e.Member.PrincipalType=c[e.Member.PrincipalType]||e.Member.PrincipalType}),t(e||[])}).catch(function(e){r(e)})})},e.roles=function(){return new Promise(function(t,r){sprLib.rest({url:s+"_api/web/roleDefinitions",queryCols:["Id","Name","Description","RoleTypeKind","Hidden"]}).then(function(e){t(e||[])}).catch(function(e){r(e)})})},e.groups=function(n){return new Promise(function(t,r){var i=[];if(n&&0<Object.keys(n).length&&!n.hasOwnProperty("id")&&!n.hasOwnProperty("title")&&(console.warn("Warning..: Check your options! Available `site().groups()` options are: `id`,`title`"),console.warn("Result...: Invalid filter option: All site groups will be returned"),n=null),o){var e="Member/PrincipalType eq 8";n&&n.id?e="Member/Id eq "+n.id:n&&n.title&&(e="Member/Title eq '"+n.title+"'"),sprLib.rest({url:s+"_api/web/RoleAssignments",queryCols:["Member/Id","Member/Title","Member/Description","Member/OwnerTitle","Member/PrincipalType","Member/AllowMembersEditMembership","Member/Users/Id","Member/Users/LoginName","Member/Users/Title"],queryFilter:e,queryLimit:f.maxRows}).then(function(e){e.forEach(function(e,t){i.push({Id:e.Member.Id,Title:e.Member.Title,Description:e.Member.Description,OwnerTitle:e.Member.OwnerTitle,PrincipalType:c[e.Member.PrincipalType]||e.Member.PrincipalType,AllowMembersEditMembership:e.Member.AllowMembersEditMembership,Users:e.Member.Users.map(function(e){return e.__metadata&&delete e.__metadata,e})})}),t(i||[])}).catch(function(e){r(e)})}else{e="";n&&n.id?e="Id eq "+n.id:n&&n.title&&(e="Title eq '"+n.title+"'"),sprLib.rest({url:s+"_api/web/SiteGroups",queryCols:["Id","Title","Description","OwnerTitle","PrincipalType","AllowMembersEditMembership","Users/Id","Users/LoginName","Users/Title"],queryFilter:e,queryLimit:f.maxRows}).then(function(e){e&&Array.isArray(e)&&(e=e.filter(function(e){return-1==e.Title.indexOf("SharingLinks")})),e.forEach(function(e,t){e.PrincipalType=c[e.PrincipalType]||e.PrincipalType}),t(e||[])}).catch(function(e){r(e)})}})},e.users=function(a){return new Promise(function(n,t){a&&0<Object.keys(a).length&&!a.hasOwnProperty("id")&&!a.hasOwnProperty("title")&&(console.warn("Warning..: Check your options! Available `site().users()` options are: `id`,`title`"),console.warn("Result...: Invalid filter option: All site users will be returned"),a=null),o?Promise.all([sprLib.rest({url:s+"_api/web/RoleAssignments",queryCols:["Member/Id","Member/Email","Member/LoginName","Member/Title","Member/IsSiteAdmin"],queryFilter:"Member/PrincipalType eq 1",queryLimit:f.maxRows}),sprLib.rest({url:s+"_api/web/RoleAssignments",queryCols:["Member/Id","Member/Title","Member/Users/Id","Member/Users/Email","Member/Users/LoginName","Member/Users/Title","Member/Users/IsSiteAdmin"],queryFilter:"Member/PrincipalType eq 8",queryLimit:f.maxRows})]).then(function(e){var r=[],i={};e[0].forEach(function(e){e.Member.Groups=[],(!a||a&&a.id&&a.id==e.Member.Id||a&&a.title&&a.title==e.Member.Title)&&(r.push(e.Member),i[e.Member.Id]=e.Member)}),e[1].forEach(function(t){t.Member.Users&&0<t.Member.Users.length&&t.Member.Users.forEach(function(e){e.__metadata&&delete e.__metadata,(!a||a&&a.id&&a.id==e.Id||a&&a.title&&a.title==e.Title)&&(e.Groups||(e.Groups=[]),e.Groups.push({Id:t.Member.Id,Title:t.Member.Title}),i[e.Id]?(i[e.Id].Groups||(i[e.Id].Groups=[]),i[e.Id].Groups.push({Id:t.Member.Id,Title:t.Member.Title})):(r.push(e),i[e.Id]=t.Member))})}),n(r||[])}).catch(function(e){t(e)}):sprLib.rest({url:s+"_api/web/SiteUsers",queryCols:["Id","Email","LoginName","Title","IsSiteAdmin","Groups/Id","Groups/Title"],queryFilter:"PrincipalType eq 1",queryLimit:f.maxRows}).then(function(e){var t=[];e.forEach(function(e){(!a||a&&a.id&&a.id==e.Id||a&&a.title&&a.title==e.Title)&&-1==e.Title.indexOf("spocrwl")&&e.Id<1e9&&t.push(e)}),n(t||[])}).catch(function(e){t(e)})})},e},sprLib.user=function(a){var e={},t="_api/Web",o="_api",i="/CurrentUser?";return!(a&&0<Object.keys(a).length)||a.hasOwnProperty("id")||a.hasOwnProperty("email")||a.hasOwnProperty("login")||a.hasOwnProperty("title")||a.hasOwnProperty("baseUrl")||(console.warn("Warning: Unknown option(s) passed. Available `user()` options are: `baseUrl`,`id`,`email`,`login`,`title`"),console.warn("Result: The current user is being returned"),a={}),(a=a||{}).hasOwnProperty("baseUrl")&&(t=a.baseUrl.toString().replace(/\/+$/,"")+"/_api/Web",o=a.baseUrl.toString().replace(/\/+$/,"")+"/_api"),a&&a.id?i="/siteusers?$filter=Id%20eq%20"+a.id+"&":a&&a.email?i="/siteusers?$filter=Email%20eq%20%27"+a.email+"%27&":a&&a.login?i="/siteusers?$filter=LoginName%20eq%20%27"+a.login.replace(/#/g,"%23")+"%27&":a&&a.title&&(i="/siteusers?$filter=Title%20eq%20%27"+a.title+"%27&"),i=t+i,e.info=function(){return new Promise(function(e,t){sprLib.rest({url:i+"$select=Id,Title,Email,LoginName,IsSiteAdmin,PrincipalType",headers:{Accept:"application/json;odata=verbose"},type:"GET",cache:!1}).then(function(r){var i={};(r&&Array.isArray(r)&&r[0]&&0<Object.keys(r[0]).length?Object.keys(r[0]):[]).forEach(function(e,t){i[e]=r[0][e]}),e(i)}).catch(function(e){t(e)})})},e.groups=function(){return new Promise(function(t,r){sprLib.rest({url:i+"$select=Groups/Id,Groups/Title,Groups/Description,Groups/LoginName,Groups/OwnerTitle&$expand=Groups",headers:{Accept:"application/json;odata=verbose"},type:"GET",cache:!1}).then(function(e){var r=[];(e&&e[0]&&e[0].Groups&&e[0].Groups.results?e[0].Groups.results:[]).forEach(function(e,t){r.push({Id:e.Id,Title:e.Title,Description:e.Description,OwnerTitle:e.OwnerTitle,LoginName:e.LoginName})}),t(r)}).catch(function(e){r(e)})})},e.profile=function(i){return new Promise(function(e,t){var n=Array.isArray(i)?i:"string"==typeof i?[i]:null,r=a&&a.login?encodeURIComponent(a.login):null;Promise.resolve().then(function(){if(a&&!a.login)return sprLib.user(a).info()}).then(function(e){return e&&(r=encodeURIComponent(e.LoginName)),r?sprLib.rest({url:o+"/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='"+r+"'",metadata:!1}):sprLib.rest({url:o+"/SP.UserProfiles.PeopleManager/GetMyProperties",metadata:!1})}).then(function(t){var r={};if(t&&t[0]&&t[0].hasOwnProperty("GetPropertiesFor")&&e({}),t[0]&&Array.isArray(n)&&0<n.length?n.forEach(function(e){r[e]=t[0][e]||"ERROR: No such property exists in SP.UserProfiles.PeopleManager"}):t[0]?r=t[0]:u&&console.log("??? `arrProfileProps[0]` does not exist!"),Object.keys(r).forEach(function(e){r[e]&&r[e].__metadata&&delete r[e].__metadata,r[e]&&r[e].ValueType&&delete r[e].ValueType,"UserProfileProperties"==e&&(r[e]=r[e].results),r[e]&&r[e].results&&(r[e]=r[e].results)}),r.UserProfileProperties){var i={};r.UserProfileProperties.forEach(function(e){i[e.Key]=e.Value}),r.UserProfileProperties=i}e(0==Object.keys(r).length?{}:r)}).catch(function(e){t(e)})})},e},sprLib.renewSecurityToken=function(){return new Promise(function(r,t){sprLib.rest({url:"_api/contextinfo",type:"POST"}).then(function(e){var t=e&&e[0]&&e[0].GetContextWebInformation&&e[0].GetContextWebInformation.FormDigestValue?e[0].GetContextWebInformation.FormDigestValue:null;"undefined"!=typeof document&&document.getElementById("__REQUESTDIGEST")&&(document.getElementById("__REQUESTDIGEST").value=t),r(t)}).catch(function(e){t(e)})})},sprLib.nodeConfig=function(e){e=e&&"object"==typeof e?e:{},f.isNodeEnabled=void 0===e.nodeEnabled||e.nodeEnabled,f.nodeCookie=e.cookie||"",f.nodeServer=e.server||""}}(),"undefined"!=typeof window&&window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(e,t){t=t||window;for(var r=0;r<this.length;r++)e.call(t,this[r],r,this)}),"undefined"!=typeof module&&module.exports&&(module.exports=sprLib);
//# sourceMappingURL=sprestlib.bundle.js.map
