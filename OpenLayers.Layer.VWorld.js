/* Copyright (c) 2006-2012 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Layer/TMS.js
 */

OpenLayers.Layer.VWorld = OpenLayers.Class(OpenLayers.Layer.TMS, {
	name: "VWorldMap",
	url: 'http://xdworld.vworld.kr:8080/2d/Base/201301/',
	//url_Hybrid: 'http://xdworld.vworld.kr:8080/2d/Hybrid/201301/',
	//url_Satellite : 'http://xdworld.vworld.kr:8080/2d/Satellite/201301/',
	blankimage: 'http://map.vworld.kr/images/maps/no_service.gif',
	attribution: '<img src="http://map.vworld.kr/images/maps/logo_openplatform.png"/>',
	isBaseLayer: true,
	tileSize: new OpenLayers.Size(256, 256),
	type : 'png',
	projection: new OpenLayers.Projection("EPSG:900913"),
    maxExtent : new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
    tileOrigin : new OpenLayers.LonLat(-20037508.34, -20037508.34),
    maxResolution : 1222.9924523925781,
    transitionEffect: "resize",
	units: "m",
	numZoomLevles : 12,
	initialize: function(name, layerType, options) {
		switch(layerType){
			case  'Base' :
				url = 'http://xdworld.vworld.kr:8080/2d/Base/201301/';
				this.type = 'png';
				break;
			case  'Hybrid' : 
				url = 'http://xdworld.vworld.kr:8080/2d/Hybrid/201301/';
				this.type = 'png';
				break;
			case  'Satellite' : 
				url = 'http://xdworld.vworld.kr:8080/2d/Satellite/201301/';
				this.type = 'jpeg';
				break;
			default :
				url = this.url;
		}
		
		if(!options){
			options = {
						maxResolution :  this.maxResolution
						, tileOrigin : this.tileOrigin
						, tileSize :  this.tileSize
						, numZoomLevels : this.numZoomLevles
					};
			
		}
		var newArguments = [];
        newArguments.push(name, url, {}, options);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
    },clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.VWorld(this.name,
                                           this.url,
                                           this.getOptions());
        }
        //get all additions from superclasses
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here

        return obj;
    },
	getURL: function (bounds) {
		var mapBounds = new OpenLayers.Bounds(120.9375, 31.95216223802497, 132.1875, 43.068).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913")); 
	    var res = this.map.getResolution();
	    var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	    var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
	    var z = this.map.getZoom() + 7;
	    var limit = Math.pow(2, z);
	    if (y < 0 || y >= limit) {
	        return this.blankimage;
	    } else {
	        x = ((x % limit) + limit) % limit;
	        if (mapBounds.intersectsBounds(bounds)) {
	        	if (z >= 7) {
	                return this.url + z + "/" + x + "/" + y + "." + this.type;
	            }else return this.blankimage;
	        } else return this.blankimage;
	    }
	}
	,CLASS_NAME: "OpenLayers.Layer.VWorld"
});
