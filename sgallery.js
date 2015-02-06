function out(outT) {
	document.getElementById("out").innerHTML += outT+"<br />";
}
var sgallery = function(){
	var objects = [];
	function styleIt(id, img) {
		var gallObj = id;
		gallObj.style.visibility = "visible";
		gallObj.style.position = "absolute";
		gallObj.style.left = "50%";
		gallObj.style.top = "50%";
		var imgRatio = img.height/img.width;
		var height = img.height;
		var width = img.width;
		if(imgRatio > 1) {
			if(height > document.body.clientHeight*0.8) {
				height = document.body.clientHeight*0.8;
				var ratio = height/img.height;
				width = img.width*ratio;
			}
		} else {
			if(height > document.body.clientHeight*0.8) {
				height = document.body.clientHeight*0.8;
				var ratio = height/img.height;
				width = img.width*ratio;
			}
		}
		img.width = width;
		img.height = height;
		gallObj.style.marginTop = "-"+(height/2);
		gallObj.style.marginLeft = "-"+(width/2);
		gallObj.style.display = "none";
	}
	function makeObject(o) {
		var gallObj = document.createElement("div");
		var img = document.createElement("img");
		gallObj.appendChild(img);
		img.src = o.src;
		gallObj.id = o.name;
		var child = document.body.appendChild(gallObj);
		child.style.visibility = "hidden";
		gallObj.onclick = function() {
			imgHide(child);
		};
		o.obj.addEventListener("click", function() {
			galleryOn(child, img);
		});
		img.onload = function (){
			styleIt(child, img);
		};
	}
	function createMenus(oList) {
		var groups = [];
		for(var c in oList) {
			if(groups.indexOf(c.group) == -1){
				groups.push(c.group);
			}
		}
		out(groups);
	}
	function galleryOn(obj, img){
		obj.style.display = "block";
	}
	function imgHide(obj) {
		obj.style.display = "none";
	}
	return{
		openImage: function(e){
			
			//alert("img: "+e.target.getAttribute("data-sgalleryimg"));
		},
		init: function(){
			var matchingElements = [];
			matchingElements["default"] = [];
			var allElements = document.getElementsByTagName('*');
			var groupc = [];
			groupc["default"] = 0;
			for (var i = 0, n = allElements.length; i < n; i++) {
				var tObj = {};
				var src = allElements[i].getAttribute("data-sgalleryimg");
				if (src !== null) {
					var group = allElements[i].getAttribute("data-sgallerygroup");
					src = allElements[i].getAttribute("data-sgalleryimg");
					if((group === null) || (group === "")) {
						group = "default";
					} else if(typeof matchingElements[group] === "undefined") {
						matchingElements[group] = [];
						groupc[group] = 0;
					}
					tObj.obj = allElements[i];
					tObj.src = src;
					tObj.group = group;
					tObj.name = "sGallery_"+group+"_"+groupc[group];
					matchingElements[group].push(tObj);
					groupc[group]++;
				}
			}
			objects = matchingElements;
			createMenus(objects);
			for(var i in objects) {
				for(var ic in objects[i]) {
					makeObject(objects[i][ic]);
				}
			}
		}
	}
}();
window.addEventListener("load", sgallery.init);