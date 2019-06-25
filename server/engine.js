/**
 * @file Lemonade Engine
 * @version 11.18.2017
 * @updated 5.25.2019
 */
/* global DEBUG_ALL, DEBUG_ERROR, DEBUG_NOTICE, DEBUG_MIN, DEBUG_NONE, ERROR_FILENOTFOUND, ERROR_CANVASERROR, ERROR_IMAGELOAD, ERROR_SOUNDLOAD, ERROR_ASSETLOAD, ERROR_GAMEPLAY, ERROR_OPENGL,
		ASSET_DEFAULT, ASSET_FILE, ASSET_STRING, ASSET_NUMBER, ASSET_OBJECT, ASSET_GENERAL, ASSET_JSON_TEXT, ASSET_JSON_OBJECT, ASSET_JSON,
		COMPONENT_SCALE_BASE, COMPONENT_SCALE_CAMERA, COMPONENT_SCALE_CAMERA_BASE, COMPONENT_SCALE_CAMERA_RELATIVE, COMPONENT_SCALE_RELATIVE, COMPONENT_SCALE_ENTITY, COMPONENT_SCALE_DISABLE,
		ENTITY_CAMERA, ENTITY_TEMP1, ENTITY_TEMP2, ENTITY_TEMP3, ENTITY_TEMP4, ENTITY_TEMP0, ENTITY_TEMPR1, ENTITY_TEMPR2, ENTITY_TEMPR3, ENTITY_TEMPR4, ENTITY_TEMPR0,
		FLAG_WIDTH, FLAG_HEIGHT, DO_NOT_LOAD, 
		EVENT_COLLIDE, EVENT_CLICK, EVENT_LEFTCLICK, EVENT_RIGHTCLICK, EVENT_ALWAYS, EVENT_VALUE, EVENT_KEY, EVENT_KEYPRESS, EVENT_KEYDOWN, EVENT_KEYUP, EVENT_HOVER, EVENT_NOOTHER,
		GRAPHICS_CANVAS, GRAPHICS_WEBGL, GRAPHICS_DOM,
		SYSTEM_RENDER, SYSTEM_LOGIC, SYSTEM_NEVER,
		ANIMATION_TYPE_A, ANIMATION_TYPE_B, ANIMATION_TYPE_BC, ANIMATION_TYPE_C, ANIMATION_TYPE_D,
		DRAWSTYLE_WIREFRAME, DRAWSTYLE_SOLID0, DRAWSTYLE_SOLID1, DRAWSTYLE_SOLID2, DRAWSTYLE_SOLID3, BACKCULL_CW, BACKCULL_CCW, SHAPE_LINE, SHAPE_TRIANGLE, GUI_BUTTON, 
		MOUSE_LEFT, MOUSE_RIGHT, MOUSE_MIDDLE,
		Lemonade*/
/**
    @desc Debug mode that shows all messages being logged. Can product quite a bit of output
    @constant {number}
 */
DEBUG_ALL = 100;
/**
 * @desc Debug mode that shows errors only. Or ones that are meant for all.
 * @constant {number}
 */
DEBUG_ERROR = 30;
/**
 * @desc Debug mode that shows errors, and Notice messages.
 * @constant {number}
 */
DEBUG_NOTICE = 40;
/**
 * @desc Debug mode that shows minimal messages.
 * @constant {number}
 */
DEBUG_MIN = 10;
/**
 * @desc Debug mode to show no messages.
 * @constant {number}
 */
DEBUG_NONE = 0;

/**
 * @desc Error indicating a file has not been found when trying to load.
 * @constant {number}
 */
ERROR_FILENOTFOUND = 69;
/**
 * @desc Error indicating the canvas was unable to load properly.
 * @constant {number}
 */
ERROR_CANVASERROR = 50;
/**
 * @desc Error indicating an image was unable to be loaded.
 * @constant {number}
 */
ERROR_IMAGELOAD = 15;
/**
 * @desc Error indicating a sound was unable to be loaded.
 * @constant {number}
 */
ERROR_SOUNDLOAD = 111;
/**
 * @desc Error indicating an asset was unable to be loaded.
 * @constant {number}
 */
ERROR_ASSETLOAD = 132;
/**
 * @desc Error indicating there was a gameplay related error reported.
 * @constant {number}
 */
ERROR_GAMEPLAY = 12;
/**
 * @desc Error indicating an issue with opengl.
 * @constant {number}
 */
ERROR_OPENGL = 27;

/**
 * @desc Default asset type
 * @constant {number}
 */
ASSET_DEFAULT = 0;
/**
 * @desc Asset type for a filename.
 * @constant {number}
 */
ASSET_FILE = 1;
/**
 * @desc Asset type to describe a string.
 * @constant {number}
 */
ASSET_STRING = 2;
/**
 * @desc Asset type to describe  a number.
 * @constant {number}
 */
ASSET_NUMBER = 3;
/**
 * @desc Asset type for an object.
 * @constant {number}
 */
ASSET_OBJECT = 4;
/**
 * @desc General asset type. Similar to default.
 * @constant {number}
 */
ASSET_GENERAL = 5;
/**
 * @desc Asset type for a string, that is actually a stringified object (JSON)
 * @constant {number}
 */
ASSET_JSON_TEXT = 6;
/**
 * @desc Asset type for an object, that is a result of JSON.
 * @constant {number}
 */
ASSET_JSON_OBJECT = 7;
/**
 * @desc Asset type for indistinguishable JSON. String or Object.
 * @constant {number}
 */
ASSET_JSON = 8;

/**
 * @desc For the scale component, will be relative to the origin.
 * @constant {string}
 */
COMPONENT_SCALE_BASE = 'base'; // Scale relative to the origin. No point specified, only the position.
/**
 * @desc For the scale component, will be relative to the camera.
 * @constant {string}
 */
COMPONENT_SCALE_CAMERA = 'camera'; // Scale relative to the camera
/**
 * @desc For the scale component, will be relative to the camera scale, compared to origin position.
 * @constant {string}
 */
COMPONENT_SCALE_CAMERA_BASE = 'camerabase'; // Scale relative to the camera's scale, except compared to origin position.
/**
 * @desc For the scale component, will be relative to the camera, relative to another entity's size.
 * @constant {string}
 */
COMPONENT_SCALE_CAMERA_RELATIVE = 'camerarel'; // Scale relative to the camera, relative to another entity's size
/**
 * @desc For the scale component, will be relative to a point, specified by component.
 * @constant {string}
 */
COMPONENT_SCALE_RELATIVE = 'relative'; // Scale relative to a point, specified in component.
/**
 * @desc For the scale component, will be relative to another entity.
 * @constant {string}
 */
COMPONENT_SCALE_ENTITY = 'entity'; // Scale relative to an entity.
/**
 * @desc For the scale component, disables scale from having an effect.
 * @constant {string}
 */
COMPONENT_SCALE_DISABLE = 'disable';

/**
 * @desc Entity used for the camera.
 * @constant {number}
 */
ENTITY_CAMERA = -1;
// Temporary Entity Variables.
/**
 * @desc Temporary entity variable.
 * @type {number}
 */
ENTITY_TEMP1 = 0;
/**
 * @desc Temporary entity variable.
 * @type {number}
 */
ENTITY_TEMP2 = 1;
/**
 * @desc Temporary entity variable.
 * @type {number}
 */
ENTITY_TEMP3 = 2;
/**
 * @desc Temporary entity variable.
 * @type {number}
 */
ENTITY_TEMP4 = 3;
/**
 * @desc Temporary entity variable.
 * @type {number}
 */
ENTITY_TEMP0 = 4;
// Entity Variable Replacements.
/**
 * @desc Temporary entity replacement variable.
 * @type {object}
 */
ENTITY_TEMPR1 = undefined;
/**
 * @desc Temporary entity replacement variable.
 * @type {object}
 */
ENTITY_TEMPR2 = undefined;
/**
 * @desc Temporary entity replacement variable.
 * @type {object}
 */
ENTITY_TEMPR3 = undefined;
/**
 * @desc Temporary entity replacement variable.
 * @type {object}
 */
ENTITY_TEMPR4 = undefined;
/**
 * @desc Temporary entity replacement variable.
 * @type {object}
 */
ENTITY_TEMPR0 = undefined;

/**
 * @desc Flag to indicate width.
 * @constant {string}
 */
FLAG_WIDTH = "WIDTH";
/**
 * @desc Flag to indicate height.
 * @constant {string}
 */
FLAG_HEIGHT = "HEIGHT";

/**
 * @desc Flag used to determine if a resource should not be loaded.
 * @constant {string}
 */
DO_NOT_LOAD = "DNL";
/**
 * @desc Event for if a collision happens.
 * @constant {string}
 */
EVENT_COLLIDE = "COLLIDE";
/**
 * @desc Event for if there is a mouse click. Regardless of type.
 * @constant {string}
 */
EVENT_CLICK = "CLICK";
/**
 * @desc Event for if mouse left click is pressed.
 * @constant {string}
 */
EVENT_LEFTCLICK = "LEFTCLICK";
/**
 * @desc Event for if mouse right click happens.
 * @constant {string}
 */
EVENT_RIGHTCLICK = "RIGHTCLICK";
/**
 * @desc Event that is always triggered. All the time.
 * @constant {string}
 */
EVENT_ALWAYS = "ALWAYS";
/**
 * @desc Store the name of the event value.
 * @constant {string}
 */
EVENT_VALUE = "VALUE";
/**
 * @desc Store the name of the event key.
 * @constant {string}
 */
EVENT_KEY = "KEY";
/**
 * @desc Event for if a key is pressed down.
 * @constant {string}
 */
EVENT_KEYDOWN = "KEYDOWN";
/**
 * @desc Event for a complete key press.
 * @constant {string}
 */
EVENT_KEYPRESS = "KEYPRESS";
/**
 * @desc Event for if a key is released to be up.
 * @constant {string}
 */
EVENT_KEYUP = "KEYUP";
/**
 * @desc Event for if there is a hover with the mouse.
 * @constant {string}
 */
EVENT_HOVER = "HOVER";
/**
 * @desc Event to describe no other.
 * @constant {string}
 */
EVENT_NOOTHER = "NOOTHER";

/**
 * @desc Describes the Canvas graphics type.
 * @constant {string}
 */
GRAPHICS_CANVAS = "CANVAS";
/**
 * @desc Describes the WEBGL graphics type.
 * @constant {string}
 */
GRAPHICS_WEBGL = "WEBGL";
// Unused in the engine.
/**
 * @desc Describes the DOM graphics type.
 * @constant {string}
 */
GRAPHICS_DOM = "DOM";
// ~~

/**
 * @desc Global used to indicate a render system for components / systems.
 * @constant {string}
 */
SYSTEM_RENDER = "render";
/**
 * @desc Global used to indicate a logic system for components / systems.
 * @constant {string}
 */
SYSTEM_LOGIC = "logic";
/**
 * @desc Global used to indicate no system to be run with component / system.
 * @constant {string}
 */
SYSTEM_NEVER = "never";

/**
 * @desc Animation Type A. This is a full play through of the animation.
 * @constant {string}
 */
ANIMATION_TYPE_A = "A";
/**
 * @desc Animation Type B. This is a full play through of the animation.
 * @constant {string}
 */
ANIMATION_TYPE_B = "B";
/**
 * @desc Animation Type C. This is a full play through of the animation.
 * @constant {string}
 */
ANIMATION_TYPE_C = "C";
/**
 * @desc Animation Type BC. This is a full play through of the animation.
 * @constant {string}
 */
ANIMATION_TYPE_BC = "BC";
/**
 * @desc Animation Type D. This is a full play through of the animation.
 * @constant {string}
 */
ANIMATION_TYPE_D = "D";

/**
 * @desc For webgl, draw 3d models in Wireframe.
 * @constant {string}
 */
DRAWSTYLE_WIREFRAME = "WIRE";
/**
 * @desc For webgl, draw 3d models in Solid.
 * @constant {string}
 */
DRAWSTYLE_SOLID1 = "SOLID1";
/**
 * @desc For webgl, draw 3d models in Solid.
 * @constant {string}
 */
DRAWSTYLE_SOLID2 = "SOLID2";
/**
 * @desc For webgl, draw 3d models in Solid.
 * @constant {string}
 */
DRAWSTYLE_SOLID3 = "SOLID3";

/**
 * @desc Back cull mode for Clockwise
 * @constant {string}
 */
BACKCULL_CW = "CW";
/**
 * @desc Back Cull mode for Counter Clockwise
 * @constant {string}
 */
BACKCULL_CCW = "CCW";

/**
 * @desc Constant to describe line shape.
 * @constant {string}
 */
SHAPE_LINE = "LINE";
/**
 * @desc Constant to describe the triangle shape
 * @constant {string}
 */
SHAPE_TRIANGLE = "TRIANGLE";

/**
 * @desc Constant to describe the GUI Button
 * @constant {string}
 */
GUI_BUTTON = "BUTTON";

/**
 * @desc Constant to indicate left mouse button.
 * @constant {number}
 */
MOUSE_LEFT = 0;
/**
 * @desc Constant to indicate middle mouse button.
 * @constant {number}
 */
MOUSE_MIDDLE = 1;
/**
 * @desc Constant to indicate right mouse button.
 * @constant {number}
 */
MOUSE_RIGHT = 2;

/**
 * @desc Lemonade library main object.
 * @global
 * @type {object}
 */
Lemonade = {};

/**
 * @desc Global component variables. Different from the Temp ones.
 * @type {object}
 */
Lemonade.CompVar = {};
/**
 * @desc Used to indicate the current entity that magnify is focused on.
 * @type {?object}
 */
Lemonade.CompVar.MAGNIFY_ACTIVE = undefined;

/**
 * @desc List of strings of loaded assets.
 * @type {object}
 */
Lemonade.loadedAssets = [];
/**
 * @desc List of strings of loaded images.
 * @type {object}
 */
Lemonade.loadedImages = [];
/**
 * @desc List of strings of loaded sounds.
 * @type {object}
 */
Lemonade.loadedSounds = [];

/**
 * @desc Reference to current loading screen if it is set.
 * @type {?object}
 */
Lemonade.loadingScreen = undefined;

/**
 * @desc Generate a loading screen based on parameters provided.
 * @param {function} render - Method that should be run on render loop, while loading.
 * @param {function} update - Method to run on logic loop, while loading.
 * @param {object} assetsNeeded - List of needed asset names.
 * @param {object} imagesNeeded - List of needed image names.
 * @param {object} soundsNeeded - List of needed sound names.
 * @returns {object} Loading screen with the submitted parameters.
 */
Lemonade.loadScreen = function(render, update, assetsNeeded, imagesNeeded, soundsNeeded) {
	// proof checking that the variables supplied are objects or arrays
	if (typeof assetsNeeded != "object")
		assetsNeeded = [];
	if (typeof imagesNeeded != "object")
		imagesNeeded = [];
	if (typeof soundsNeeded != "object")
		soundsNeeded = [];

	this.render = render;
	this.update = update;
	this.assetsNeeded = assetsNeeded; // Array of extra assets needed, like file datas and the such.
	this.imagesNeeded = imagesNeeded; // Array of Images that are needed.
	this.soundsNeeded = soundsNeeded; // Array of Sounds that are needed.

	return this;
};

/**
 * @desc Mark an asset as loaded, and add to loaded assets.
 * @param {string} 
 */
Lemonade.loadAsset = function(assetName) {
	Lemonade.loadedAssets.push(assetName);
};

/**
 * @desc Mark an image as loaded, and add to loaded images.
 * @param {string} 
 */
Lemonade.loadImage = function(imageName) {
	Lemonade.loadedImages.push(imageName);
};

/**
 * @desc Mark an sound as loaded, and add to loaded sounds.
 * @param {string} 
 */
Lemonade.loadSound = function(soundName) {
	Lemonade.loadedSounds.push(soundName);
};
/**
 * @desc Start a loading, with the supplied loadScreen.
 * @param {object} ls - Loading screen to be loaded.
 */
Lemonade.load = function(ls) {
	Lemonade.loadedAssets = [];
	Lemonade.loadedImages = [];
	Lemonade.loadedSounds = [];
	Lemonade.loadingScreen = ls;
};
/**
 * @desc Overload a function with a list of parameters.
 * @param {function} func - Function that will be overloaded.
 * @param {object} params - List of parameters to send to function.
 * @returns {object} result of the called function.
 */
Lemonade.funcOverload = function(func, params) {
	if (params === undefined)
		return func();
	if (params.length < 1) {
		return func();
	} else if (params.length < 2) {
		return func(params[0]);
	} else if (params.length < 3) {
		return func(params[0], params[1]);
	} else if (params.length < 4) {
		return func(params[0], params[1], params[2]);
	}
	return func();
}

/**
 * @desc FPS counter object with related variables and functions.
 */
Lemonade.FPS = {
	startTime: 0,
	frameNumber: 0,
	fp: 0,
	capFPS: true,
	maxFPS: 60,
	isDelaying: false,
	updateFPS: function() {
		this.frameNumber++;
		var d = new Date().getTime(),
			currentTime = (d - this.startTime) / 1000,
			result = Math.floor((this.frameNumber / currentTime));
		if (currentTime > 1) {
			this.startTime = new Date().getTime();
			this.frameNumber = 0;
		}
		this.fp = result;
	},
	getFPS: function() {
		return this.fp;
	}
};
Lemonade.Timer = {
	curTime: 0,
	timeInc: 5,

	getCurrentTime: function() {
		return this.curTime;
	},

	incTime: function() {
		this.curTime++;
	},
	setTimeIncrement: function(ti) {
		this.timeInc = ti;
		this.curTime = 0;
	},
	resetTime: function() {
		this.curTime = 0;
	}
};
// Lovely MD5 Function from https://css-tricks.com/snippets/javascript/javascript-md5/
Lemonade.MD5 = function (string) {

   function RotateLeft(lValue, iShiftBits) {
           return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
   }

   function AddUnsigned(lX,lY) {
           var lX4,lY4,lX8,lY8,lResult;
           lX8 = (lX & 0x80000000);
           lY8 = (lY & 0x80000000);
           lX4 = (lX & 0x40000000);
           lY4 = (lY & 0x40000000);
           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
           if (lX4 & lY4) {
                   return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
           }
           if (lX4 | lY4) {
                   if (lResult & 0x40000000) {
                           return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                   } else {
                           return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                   }
           } else {
                   return (lResult ^ lX8 ^ lY8);
           }
   }

   function F(x,y,z) { return (x & y) | ((~x) & z); }
   function G(x,y,z) { return (x & z) | (y & (~z)); }
   function H(x,y,z) { return (x ^ y ^ z); }
   function I(x,y,z) { return (y ^ (x | (~z))); }

   function FF(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function GG(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function HH(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function II(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function ConvertToWordArray(string) {
           var lWordCount;
           var lMessageLength = string.length;
           var lNumberOfWords_temp1=lMessageLength + 8;
           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
           var lWordArray=Array(lNumberOfWords-1);
           var lBytePosition = 0;
           var lByteCount = 0;
           while ( lByteCount < lMessageLength ) {
                   lWordCount = (lByteCount-(lByteCount % 4))/4;
                   lBytePosition = (lByteCount % 4)*8;
                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                   lByteCount++;
           }
           lWordCount = (lByteCount-(lByteCount % 4))/4;
           lBytePosition = (lByteCount % 4)*8;
           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
           return lWordArray;
   };

   function WordToHex(lValue) {
           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
           for (lCount = 0;lCount<=3;lCount++) {
                   lByte = (lValue>>>(lCount*8)) & 255;
                   WordToHexValue_temp = "0" + lByte.toString(16);
                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
           }
           return WordToHexValue;
   };

   function Utf8Encode(string) {
           string = string.replace(/\r\n/g,"\n");
           var utftext = "";

           for (var n = 0; n < string.length; n++) {

                   var c = string.charCodeAt(n);

                   if (c < 128) {
                           utftext += String.fromCharCode(c);
                   }
                   else if((c > 127) && (c < 2048)) {
                           utftext += String.fromCharCode((c >> 6) | 192);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }
                   else {
                           utftext += String.fromCharCode((c >> 12) | 224);
                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }

           }

           return utftext;
   };

   var x=Array();
   var k,AA,BB,CC,DD,a,b,c,d;
   var S11=7, S12=12, S13=17, S14=22;
   var S21=5, S22=9 , S23=14, S24=20;
   var S31=4, S32=11, S33=16, S34=23;
   var S41=6, S42=10, S43=15, S44=21;

   string = Utf8Encode(string);

   x = ConvertToWordArray(string);

   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

   for (k=0;k<x.length;k+=16) {
           AA=a; BB=b; CC=c; DD=d;
           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
           a=AddUnsigned(a,AA);
           b=AddUnsigned(b,BB);
           c=AddUnsigned(c,CC);
           d=AddUnsigned(d,DD);
   		}

   	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

   	return temp.toLowerCase();
};

Lemonade.include = function(filename, name) {
	try{
		name = name || filename;
		if (document.getElementById("include" + name) === null) {
			var fileref = document.createElement('script');
			fileref.setAttribute("type", "text/javascript");
			fileref.setAttribute("src", filename);
			fileref.setAttribute("id", "include" + name);
			if (typeof fileref != "undefined")
				document.getElementsByTagName("head")[0].appendChild(fileref);
		}
	}catch (e){
		console.log("Unable to include: " + filename);
	}
};
Lemonade.componentToHex = function(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
};

Lemonade.rgbToHex = function(r, g, b) {
	return "#" + Lemonade.componentToHex(r) + Lemonade.componentToHex(g) + Lemonade.componentToHex(b);
};

Lemonade.arrayContains = function(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
};
Lemonade.arrayIndex = function(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === obj) {
			return i;
		}
	}
	return -1;
};

Lemonade.clone = function(src) {
	function mixin(dest, source, copyFunc) {
		var name, s, i, empty = {};
		for (name in source) {
			s = source[name];
			if (!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))) {
				dest[name] = copyFunc ? copyFunc(s) : s;
			}
		}
		return dest;
	}

	if (!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]") {
		return src;
	}
	if (src.nodeType && "cloneNode" in src) {
		return src.cloneNode(true);
	}
	if (src instanceof Date) {
		return new Date(src.getTime());
	}
	if (src instanceof RegExp) {
		return new RegExp(src);
	}
	var r, i, l;
	if (src instanceof Array) {
		r = [];
		for (i = 0, l = src.length; i < l; ++i) {
			if (i in src) {
				r.push(Lemonade.clone(src[i]));
			}
		}
	} else {
		r = src.constructor ? new src.constructor() : {};
	}
	return mixin(r, src, Lemonade.clone);

};
Lemonade.include("quadtree.js", "quadtree");

Lemonade.readTextFile = function(file, callback) {
	var allText;
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, callback !== undefined);
	rawFile.overrideMimeType("text/plain; charset=x-user-defined");
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				allText = rawFile.responseText;
				if (callback !== undefined)
					callback(allText);
			}
		}
	};
	rawFile.send(null);
	return allText;
};
Lemonade.getTextFromFile = function(file, callback) {
	return Lemonade.readTextFile(file, callback);
}

Lemonade.getDistance = function(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

Lemonade.version = 1.001;

Lemonade.running = true;
Lemonade.autoClear = true;

Lemonade.showCollisionRects = false;
Lemonade.countTouchAsMouse = true;
Lemonade.multiTouch = false;

Lemonade.allowKeyPress = true;

Lemonade.Collision = {};
Lemonade.Collision.initialize = function() {
	Lemonade.Collision.QuadTree = new QuadTree({
		x: 0,
		y: 0,
		width: Lemonade.Canvas.canvasWidth,
		height: Lemonade.Canvas.canvasHeight
	});
};

Lemonade.Point = function(x, y, z) {
	return {
		x: x || 0,
		y: y || 0,
		z: z || 0
	};
};

Lemonade.initialize = function(w, h, id, autorun, webglEnabled, debugMode) {
	if (webglEnabled === false)
		Lemonade.Canvas.initialize2D(w, h, id);
	else
		Lemonade.Canvas.initialize3D(w, h, id);
	Lemonade.Collision.initialize();
	Lemonade.Debug.setDebugMode(debugMode);
	Lemonade.setListeners();

	Lemonade.loadComponents();

	if (autorun)
		Lemonade.run();
};

var gl; // Used as global object to call opengl related functions.

var ttn = function(num, woh) {
	return Lemonade.Graphics.threed.translateToNormal(num, woh);
};

Lemonade.Graphics = {
	graphicsType: GRAPHICS_CANVAS,

	threed: {
		enabled: false, // Disable 3d by default

		translateFromNormal: function(num, widthOrHeight) // Want to know what we are getting relative to.
			{
				var res = num + 1; // Make the number easier to manage.
				res = res / 2; //TODO change to divide by max height and width ratio.
				if (widthOrHeight === FLAG_WIDTH)
					res = res * Lemonade.Canvas.canvasWidth;
				else
					res = res * Lemonade.Canvas.canvasHeight;
				return res;
			},
		translateToNormal: function(num, widthOrHeight) {
			var res = num;
			if (widthOrHeight === FLAG_WIDTH)
				res = res / Lemonade.Canvas.canvasWidth;
			else
				res = res / Lemonade.Canvas.canvasHeight;
			res = res * 2;
			res -= 1;
			return res;
		},

		buffer: {
			// This assumes that the array is of vertices with 3 coordinates
			get: function(arrayVert, arrayFace) {
				return {
					v: this.getVertexBuffer(arrayVert),
					f: this.getFaceBuffer(arrayFace)
				};
			},
			getFaceBuffer: function(arrayFace) {
				var buf = gl.createBuffer();
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buf);
				gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(arrayFace), gl.STATIC_DRAW);

				// Not necessary, but becomes useful later on
				buf.itemSize = 1;
				buf.numItems = Math.floor(arrayFace.length / 1);
				return buf;
			},
			getVertexBuffer: function(arrayVert) {
				var buf = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, buf);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arrayVert), gl.STATIC_DRAW);

				// Not necessary, but becomes useful later on
				buf.itemSize = 3;
				buf.numItems = Math.floor(arrayVert.length / 3);
				return buf;
			},
		},

		shader: {
			test_vertex_source: "attribute vec2 position; attribute vec3 color; varying vec3 vColor; void main(void) { gl_Position = vec4(position, 0., 1.); vColor=color; }",
			test_fragment_source: "precision mediump float;varying vec3 vColor;void main(void) {gl_FragColor = vec4(vColor, 1.);}",

			shader_vertex: undefined,
			shader_fragment: undefined,

			shader_program: undefined,

			_color: undefined,
			_position: undefined,
			_uv: undefined,

			test_vertex_source_uv: "attribute vec3 position; uniform mat4 Pmatrix; uniform mat4 Vmatrix; uniform mat4 Mmatrix; attribute vec2 uv; varying vec2 vUV; void main(void) { gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);vUV=uv;}",
			test_fragment_source_uv: "precision mediump float; uniform sampler2D sampler; varying vec2 vUV; void main(void) { gl_FragColor = texture2D(sampler, vec2(vUV.s, vUV.t)); }",

			generate_test_color: function() {
				this.shader_vertex = this.get(this.test_vertex_source, gl.VERTEX_SHADER, "VERTEX");
				this.shader_fragment = this.get(this.test_fragment_source, gl.FRAGMENT_SHADER, "FRAGMENT");

				this.shader_program = gl.createProgram();
				gl.attachShader(this.shader_program, this.shader_vertex);
				gl.attachShader(this.shader_program, this.shader_fragment);

				gl.linkProgram(this.shader_program);

				this._color = gl.getAttribLocation(this.shader_program, "color");
				this._position = gl.getAttribLocation(this.shader_program, "position");

				gl.enableVertexAttribArray(this._color);
				gl.enableVertexAttribArray(this._position);

				gl.useProgram(this.shader_program);
			},
			generate_test_uv: function() {
				this.shader_vertex = this.get(this.test_vertex_source_uv, gl.VERTEX_SHADER, "VERTEX");
				this.shader_fragment = this.get(this.test_fragment_source_uv, gl.FRAGMENT_SHADER, "FRAGMENT");

				this.shader_program = gl.createProgram();
				gl.attachShader(this.shader_program, this.shader_vertex);
				gl.attachShader(this.shader_program, this.shader_fragment);

				gl.linkProgram(this.shader_program);

				this._position = gl.getAttribLocation(this.shader_program, "position");
				this._uv = gl.getAttribLocation(this.shader_program, "uv");

				gl.enableVertexAttribArray(this._position);
				gl.enableVertexAttribArray(this._uv);

				gl.useProgram(this.shader_program);
			},

			get: function(source, type, typeString) {
				var shader = gl.createShader(type);
				gl.shaderSource(shader, source);
				gl.compileShader(shader);
				if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
					Lemonade.Error.trigger("Error in " + typeString + " Shader: " + gl.getShaderInfoLog(shader), ERROR_OPENGL);
					return false;
				}
				return shader;
			},
			bind: function(shader) {

			}
		},

		initializeGL: function() {
			try {
				gl = Lemonade.Canvas.canvasObject.getContext("webgl") || Lemonade.Canvas.canvasObject.getContext("experimental-webgl");
				gl.viewportWidth = Lemonade.Canvas.canvasWidth;
				gl.viewportHeight = Lemonade.Canvas.canvasHeight;

				gl.clearColor(0.3922, 0.5843, 0.9294, 0.0);
				gl.enable(gl.DEPTH_TEST);
			} catch (e) {
				Lemonade.Error.trigger(e, ERROR_OPENGL);
			}
			if (!gl) {
				Lemonade.Error.trigger("Could not initialize webGL", ERROR_OPENGL);
			}
			this.enabled = true;
		},
	},

	changeGraphicsType: function(newType) {
		this.graphicsType = newType;
	},
	prepThreeD: function() {
		this.graphicsType = GRAPHICS_WEBGL;
		// Here we will setup the canvas to use webgl on graphic calls.
		this.threed.initializeGL();
		// Enable the use of threed components.
		this.enabled = true;

		this.threed.shader.generate_test_color();
	},
};

Lemonade.Camera = {
	x: 0,
	y: 0,
	z: 0, // Not used yet.
	sx: 1,
	sy: 1,
	sz: 1,

	getX: function() {
		return this.x;
	},
	getY: function() {
		return this.y;
	},
	getZ: function() {
		return this.z;
	},
	getScaleX: function() {
		return this.sx;
	},
	getScaleY: function() {
		return this.sy;
	},
	getScaleZ: function() {
		return this.sz;
	},

	moveX: function(dx) {
		this.x += dx;
		return this.x;
	},
	moveY: function(dy) {
		this.y += dy;
		return this.y;
	},
	moveZ: function(dz) {
		this.z += dz;
		return this.z;
	},
	moveScaleX: function(dsx) {
		this.sx += dsx;
		return this.sx;
	},
	moveScaleY: function(dsy) {
		this.sy += dsy;
		return this.sy;
	},
	moveScaleZ: function(dsz) {
		this.sz += dsz;
		return this.sz;
	},

	setX: function(nx) {
		this.x = nx;
		return this.x;
	},
	setY: function(ny) {
		this.y = ny;
		return this.y;
	},
	setZ: function(nz) {
		this.z = nz;
		return this.z;
	},
	setScaleX: function(nsx) {
		this.sx = nsx;
		return this.sx;
	},
	setScaleY: function(nsy) {
		this.sy = nsy;
		return this.sy;
	},
	setScaleZ: function(nsz) {
		this.sz = nsz;
		return this.sz;
	},

	move: function(dx, dy, dz) {
		dx = dx || 0;
		dy = dy || 0;
		dz = dz || 0;
		this.moveX(dx);
		this.moveY(dy);
		this.moveZ(dz);
		return true;
	},
	moveScale: function(dsx, dsy, dsz) {
		dsx = dsx || 0;
		dsy = dsy || 0;
		dsz = dsz || 0;
		this.moveScaleX(dsx);
		this.moveScaleY(dsy);
		this.moveScaleZ(dsz);
		return true;
	}
};

Lemonade.Canvas = {
	canvasWidth: 0,
	canvasHeight: 0,

	canvasObject: undefined,
	context: undefined,
	xRatio: 1,
	yRatio: 1,

	autoClear: true,
	FPS: 30,
	initialize2D: function(w, h, divName, autoScale) {
		this.initialize(w, h, divName, autoScale);
	},
	initialize3D: function(w, h, divName, autoScale) {
		this.canvasWidth = w || 0;
		this.canvasHeight = h || 0;
		this.divName = divName || "game";
		this.autoScale = autoScale || true;

		this.canvasObject = document.getElementById(this.divName);
		this.realWidth = this.canvasObject.offsetWidth;
		this.realHeight = this.canvasObject.offsetHeight;

		this.xRatio = this.realWidth / this.canvasWidth;
		this.yRatio = this.realHeight / this.canvasHeight;

		this.context = this.canvasObject.getContext('webgl') || this.canvasObject.getContext('experimental-webgl');
		this.mobile = false;
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			this.mobile = true;
		}
		window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

		Lemonade.Graphics.prepThreeD();

		return this;
	},
	// THe default initializer for 2d
	initialize: function(w, h, divName, autoScale) {
		this.canvasWidth = w || 0;
		this.canvasHeight = h || 0;
		this.divName = divName || "game";
		this.autoScale = autoScale || true;

		this.canvasObject = document.getElementById(this.divName);
		this.realWidth = this.canvasObject.offsetWidth;
		this.realHeight = this.canvasObject.offsetHeight;

		this.xRatio = this.realWidth / this.canvasWidth;
		this.yRatio = this.realHeight / this.canvasHeight;

		this.context = this.canvasObject.getContext('2d');
		this.mobile = false;
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			this.mobile = true;
		}
		window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
		return this;
	},
};

Lemonade.Debug = {
	DebugMode: DEBUG_NONE,
	log: function(output, importance) {
		importance = importance || DEBUG_NOTICE;
		if (this.debugMode == importance || this.debugMode == DEBUG_ALL || importance == DEBUG_NONE) {
			var debugElement = document.getElementById('debuglog');
			if (debugElement !== null) {
				if (debugElement.innerHTML.length > 2000)
					debugElement.innerHTML = "";
				debugElement.innerHTML += output + "<br>";
			} else {
				var dl = document.createElement('div');
				dl.id = "debuglog";
				dl.style = 'height:100px;background-color:#ffffff;overflow-y:scroll;';
				document.getElementsByTagName('body')[0].appendChild(dl);
				Lemonade.Debug.log(output, importance);
				return;
			}
			debugElement.scrollTop = debugElement.scrollHeight;
			console.log(output);
		}
		return this;
	},
	setDebugMode: function(newDebugMode) {
		this.debugMode = newDebugMode;
	},
};

Lemonade.Error = {
	errorTriggered: false,
	trigger: function(description, code) {
		Lemonade.Debug.log("ERROR " + code + " - " + description);
		alert("Game Error!\nCode: " + code + "\nDescription:" + description);
		this.errorTriggered = true;
		throw new Error("ERROR " + code + " - " + description);
	},
};

Lemonade.Image = function(iKey, iFile, w, h) {
	this.iKey = iKey;
	this.iFile = iFile;
	this.iImage = new Image();
	if (this.iFile !== DO_NOT_LOAD)
		this.iImage.src = this.iFile;
	this.iImage.crossOrigin = "anonymous";
	this.webglTexture = false;
	var textureHelper = this;
	this.getWebGLTexture = function() {
		return this.webglTexture;
	};
	var ready = false;
	this.iImage.onload = function() {
		Lemonade.loadImage(iKey);
		ready = true;
		if (Lemonade.Graphics.threed.enabled === true) {
			var texture = gl.createTexture();
			/* var can = document.createElement('canvas');
			  can.width = this.width;
			  can.height = this.height;

			  var ctx = can.getContext('2d');

			  textureHelper.draw(0,0,this.width, this.height, 0, ctx, 0);
			  var dat = new Image();
			  dat.src = can.toDataURL("image/png");
			  dat.crossOrigin = "anonymous";
			  dat.onload = function(){
			    */
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.bindTexture(gl.TEXTURE_2D, null);

			textureHelper.webglTexture = texture;
		}
	};

	this.isSpriteSheet = false;

	this.scale = 1;
	this.scaleX = 1;
	this.scaleY = 1;

	this.curSprite = 0;
	this.maxSprite = 0;
	this.spriteWidth = 0;
	this.spriteHeight = 0;
	this.rotation = 0.0;

	this.animation = false;
	this.animationType = 0;
	this.animationTicks = 0;
	this.animationTickCount = 0;
	this.animationComplete = false;
	this.setSpriteSheet = function(frameAmount, w, h) {
		this.isSpriteSheet = true;
		this.maxSprite = frameAmount;
		this.curSprite = 0;
		this.spriteWidth = w || 32;
		this.spriteHeight = h || 32;
	};

	this.setAnimation = function(frameAmount, w, h, ticks, a, b, c, d, e) {
		this.animation = true;
		this.animationType = a || ANIMATION_TYPE_A;
		this.animationStart = b || 0;
		if (this.animationType == ANIMATION_TYPE_B)
			this.curSprite = this.animationStart;
		else
			this.curSprite = 0;
		this.setSpriteSheet(frameAmount, w, h);
		this.animationMax = c || this.maxSprite;
		this.animationTicks = ticks;
		this.animationTickCount = 0;
	};

	this.resetAnimation = function() {
		this.animationComplete = false;
		this.animationTickCount = 0;
		if (this.animationType == ANIMATION_TYPE_BC)
			this.curSprite = 0;
		else
			this.curSprite = this.animationStart;
	};

	this.width = w;
	this.height = h;

	this.originX = this.width / 2 || -1;
	this.originY = this.height / 2 || -1;

	this.flipHorizontal = false;
	this.flipVertical = false;

	this.x = 0;
	this.y = 0;

	this.animate = function() {};

	this.forceReady = function() {
		ready = true;
		Lemonade.loadedAssets++;
		Lemonade.loadedImages++;
	};

	this.draw = function(x, y, width, height, spriteid, context, rotate) {
		if (ready === false)
			return;
		context = context || Lemonade.Canvas.context;
		rotate = rotate || 0;
		x = x || this.x || 0;
		y = y || this.y || 0;
		spriteid = spriteid || this.curSprite || 0;
		width = width || this.width || 0;
		height = height || this.height || 0;

		// Setup for scaling and rotating
		context.save();
		context.translate(x + this.originX, y + this.originY);
		context.rotate(rotate);
		var scx = 1;
		var scy = 1;
		if (this.flipHorizontal == true)
			scx = -1;
		if (this.flipVertical == true)
			scy = -1;
		context.scale(scx, scy);


		if (!this.isSpriteSheet && !this.animation)
			context.drawImage(this.iImage, -this.originX, -this.originY, width, height);
		else if (this.isSpriteSheet)
			context.drawImage(this.iImage, spriteid * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, -this.originX, -this.originY, width, height);

		if (this.animation && this.animationComplete === false) {
			this.animationTickCount += 1;
			if (this.animationTickCount >= this.animationTicks) {
				this.animationTickCount = 0;
				this.curSprite += 1;
				if (this.curSprite >= this.animationMax && this.animationType != ANIMATION_TYPE_C && this.animationType != ANIMATION_TYPE_D)
					this.curSprite = this.animationStart;
				else if (this.curSprite > this.animationMax && this.animationType == ANIMATION_TYPE_C) {
					this.curSprite = this.animationMax;
					this.animationComplete = true;
				} else if (this.curSprite > this.animationMax && this.animationType == ANIMATION_TYPE_D) {
					this.curSprite = this.animationStart - 1;
					this.animationComplete = true;
				}
			}
		}

		var dbtxt = "Image: " + this.iKey + " being drawn.";
		if (this.isSpriteSheet)
			dbtxt += " from a spritesheet.";
		Lemonade.Debug.log(dbtxt, DEBUG_NOTICE);

		context.restore();
	};
};
Lemonade.Sound = function(iKey, iFile, loop, volume) {
	this.iKey = iKey;
	this.iFile = iFile;
	this.iSound = new Audio(this.iFile);
	this.loop = loop;
	this.volume = volume;

	this.tmp = false;

	this.iSound.loop = this.loop;
	this.iSound.load();
	this.iSound.volume = this.volume;
	// Mark it as loaded for loading screens.
	Lemonade.loadSound(iKey);
	
	this.play = function() {
		if (this.iSound.currentTime !== 0 && this.iSound.paused === false) {
			var newSound = new Audio(this.iFile);
			newSound.volume = this.volume;
			newSound.loop = false;
			newSound.tmp = true;
			newSound.load();
			newSound.play();
		} else
			this.iSound.play();
	};
	this.pause = function() {
		this.iSound.pause();
	};
	this.stop = function() {
		this.iSound.pause();
		this.iSound.currentTime = 0;
	};
};

Lemonade.Data = {};
Lemonade.Data.retrieve = function(assetName, extension) {
	var asset = undefined;
	// TODO allow assetName to be a string for loading as json,
	//  As well as loading an object through this.
	if (Lemonade.isAsset(assetName) == true)
		asset = assetName;
	else if (typeof assetName == "object") {
		asset = {};
		asset.data = assetName;
		asset.type = ASSET_OBJECT;
	} else
		asset = Lemonade.Repository.getAsset(assetName);
	if (asset !== undefined) {
		if (asset.type == ASSET_FILE) {
			// Use the asset data to load file from localStorage, into an object, then retrieve with extension.
			// TODO use localStorage web api to load a saved file.
			// TODO allow local files and game files
			// Game files pertain to the game and should remain unchanged.
		} else if (asset.type == ASSET_OBJECT || asset.type == ASSET_JSON_OBJECT) {
			// Use the object to access with extension
			return Lemonade.Data.retrieveWithExtension(asset.data, extension);
		} else if (asset.type == ASSET_STRING) {
			// use the string and convert to an object through json.
			var obj = JSON.parse(asset.data);
			asset.data = obj;
			return Lemonade.Data.retrieveWithExtension(asset.data, extenstion);
		}
	}
};

Lemonade.Data.retrieveWithExtension = function(object, extension) {
	var extensionArray = [];
	for (var i = 0; i < extension.length; i++) {
		if (extension[i] == '.') {
			extensionArray.push(extension.substr(0, i));
			extension = extension.substr(i + 1, extension.length - 1);
			i = 0;
		}
	}
	extensionArray.push(extension);
	return Lemonade.Data.recursiveExtension(object, extensionArray);
};
Lemonade.Data.recursiveExtension = function(object, extensionArray) {
	if (extensionArray.length > 1) {
		return Lemonade.Data.recursiveExtension(object[extensionArray[0]], extensionArray.splice(1, extensionArray.length - 1));
	}
	return object[extensionArray[0]];
};

Lemonade.Data.setWithExtension = function(object, extension, toSet) {
	var extensionArray = [];
	for (var i = 0; i < extension.length; i++) {
		if (extension[i] == '.') {
			extensionArray.push(extension.substr(0, i));
			extension = extension.substr(i + 1, extension.length - 1);
			i = 0;
		}
	}
	extensionArray.push(extension);
	Lemonade.Data.recursiveSetExtension(object, extensionArray, toSet);
};
Lemonade.Data.recursiveSetExtension = function(object, extensionArray, toSet) {
	if (extensionArray.length > 1) {
		Lemonade.Data.recursiveSetExtension(object[extensionArray[0]], extensionArray.splice(1, extensionArray.length - 1), toSet);
	} else
		object[extensionArray[0]] = toSet;
};
Lemonade.loadAssetFromJSON = function(assetName, fileName) {
	Lemonade.readTextFile(fileName, function(t) {
		Lemonade.Repository.addAsset(new Lemonade.Asset(assetName, JSON.parse(t), ASSET_JSON_OBJECT), true);
	});
};

Lemonade.Asset = function(assetKey, assetInfo, assetType) {
	this.__asset = true;
	this.aKey = assetKey;
	this.data = assetInfo;
	this.type = assetType || ASSET_DEFAULT;
};
Lemonade.loadAsset = function(assetName, assetInfo, assetType, assetLoadType) {
	var newAsset = new Lemonade.Asset(assetName, assetInfo, assetType);
	if (assetLoadType === ASSET_JSON || assetLoadType === ASSET_JSON_TEXT) {
		newAsset.data = JSON.parse(assetInfo);
	} else if (assetLoadType === ASSET_FILE) {
		newAsset.data = JSON.parse(Lemonade.readTextFile(assetInfo));
	}
	Lemonade.Repository.addAsset(newAsset);
};
Lemonade.isAsset = function(obj) {
	return this.__asset !== undefined;
};
Lemonade.Repository = {
	images: new Array(),
	sounds: new Array(),
	assets: new Array(),
	addAsset: function(assetKey, assetInfo, update) { // if assetKey is an object (Assumed to be an asset) then assetInfo becomes the new update variable
		// addAsset can be used to add an object or other asset like a string into the repository.
		update = update || false;
		if (typeof assetKey == "object") {
			var index = this.getAssetIndex(assetKey.aKey);
			if (index !== undefined && assetInfo === true) {
				this.assets[index] = assetKey;
				Lemonade.loadAsset(assetKey);
			} else {
				this.assets.push(assetKey);
				Lemonade.loadAsset(assetKey);
			}
			return true;
		} else if (assetInfo === undefined) {
			return undefined;
		}
		try {
			var index = this.getAssetIndex(assetKey);
			if (index !== undefined && update === true) {
				this.assets[index].data = assetInfo;
				Lemonade.loadAsset(assetKey);
			} else {
				this.assets.push(new Lemonade.Asset(assetKey, assetInfo));
				Lemonade.loadAsset(assetKey);
			}
		} catch (e) {
			Lemonade.Error.trigger("Could not add asset: " + imageFile + " <br> Reason: " + err.message, ERROR_ASSETLOAD);
		}
	},
	getAsset: function(assetKey) {
		var l = this.assets.length;
		for (var i = 0; i < l; i++) {
			if (this.assets[i].aKey == assetKey) {
				return this.assets[i];
			}
		}
		Lemonade.Debug.log("No Asset found by key: " + assetKey, DEBUG_NOTICE);
		return undefined;
	},
	getAssetIndex: function(assetKey) {
		var l = this.assets.length;
		for (var i = 0; i < l; i++) {
			if (this.assets[i].aKey == assetKey) {
				return i;
			}
		}
		Lemonade.Debug.log("No Asset found by key: " + assetKey, DEBUG_NOTICE);
		return undefined;
	},
	addImage: function(imageKey, imageFile, w, h) {
		if (imageFile === undefined)
			return new Lemonade.Image(imageKey, undefined, w, h);
		try {
			if (Lemonade.Repository.getImage(imageKey) == undefined) {
				var im = new Lemonade.Image(imageKey, imageFile, w, h);
				this.images.push(im);
				Lemonade.Debug.log("Added image " + imageFile, DEBUG_NOTICE);
				return im;
			}
			// Mark the image as loaded.
			Lemonade.loadImage(imageKey);
			
			return Lemonade.Repository.getImage(imageKey);
		} catch (err) {
			Lemonade.Error.trigger("Could not add image: " + imageFile + " <br> Reason: " + err.message, ERROR_IMAGELOAD);
		}
		return undefined;
	},
	getImage: function(imageKey) {
		var l = this.images.length;
		for (var i = 0; i < l; i++) {
			if (this.images[i].iKey == imageKey || this.images[i].iFile == imageKey) {
				Lemonade.Debug.log("Image found: " + this.images[i].iKey + ", " + this.images[i].iFile, DEBUG_NOTICE);
				return this.images[i];
			}
		}
		Lemonade.Debug.log("No image found by key: " + imageKey, DEBUG_NOTICE);
		return undefined;
	},
	removeImage: function(imageKey) {
		var l = this.images.length;
		for (var i = 0; i < l; i++) {
			if (this.images[i].iKey == imageKey || this.images[i].iFile == imageKey) {
				Lemonade.Debug.log("Image found: " + this.images[i].iKey + ", " + this.images[i].iFile, DEBUG_NOTICE);
				this.images.splice(i, 1);
				return true;
			}
		}
		Lemonade.Debug.log("No image found by key: " + imageKey, DEBUG_NOTICE);
		return false;
	},
	addSound: function(soundKey, soundFile, w, h) {
		try {
			if (Lemonade.Repository.getSound(soundKey) == undefined) {
				var im = new Lemonade.Sound(soundKey, soundFile, w, h);
				this.sounds.push(im);
				Lemonade.Debug.log("Added sound " + soundFile, DEBUG_NOTICE);
				return im;
			}
			Lemonade.loadSound(soundKey);
			return Lemonade.Repository.getSound(soundKey);
		} catch (err) {
			Lemonade.Error.trigger("Could not add sound: " + soundFile + " <br> Reason: " + err.message, ERROR_SOUNDLOAD);
		}
		return undefined;
	},
	getSound: function(soundKey) {
		var l = this.sounds.length;
		for (var i = 0; i < l; i++) {
			if (this.sounds[i].iKey == soundKey || this.sounds[i].iFile == soundKey) {
				Lemonade.Debug.log("Sound found: " + this.sounds[i].iKey + ", " + this.sounds[i].iFile, DEBUG_NOTICE);
				return this.sounds[i];
			}
		}
		Lemonade.Debug.log("No sound found by key: " + soundKey, DEBUG_NOTICE);
		return undefined;
	},
	removeSound: function(imageKey) {
		var l = this.images.length;
		for (var i = 0; i < l; i++) {
			if (this.images[i].iKey == imageKey || this.images[i].iFile == imageKey) {
				Lemonade.Debug.log("Image found: " + this.images[i].iKey + ", " + this.images[i].iFile, DEBUG_NOTICE);
				this.images.splice(i, 1);
				return true;
			}
		}
		Lemonade.Debug.log("No image found by key: " + imageKey, DEBUG_NOTICE);
		return false;
	},
};

Lemonade.random = function(min, max) {
	if (min === undefined) {
		min = 0;
		max = 100;
	} else if (max === undefined) {
		max = min;
		min = 0;
	}
	var ret = Math.floor((Math.random() * (max - min)) + min);
	return ret;
};

Lemonade.BubbleSort = function(array) {
	var ret = array;
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array.length; j++) {
			if (ret[i] > ret[j]) {
				var ij = ret[i];
				var ji = ret[j];
				ret[i] = ji;
				ret[j] = ij;
			}
		}
	}
	return ret;
};

Lemonade.CollisionDetection = function(x1, y1, w1, h1, x2, y2, w2, h2) {
	var a = {
		x: 0,
		y: 0,
		w: 0,
		h: 0
	};
	var b = {
		x: 0,
		y: 0,
		w: 0,
		h: 0
	};
	a.x = x1;
	a.y = y1;
	a.w = w1;
	a.h = h1;

	b.x = x2;
	b.y = y2;
	b.w = w2;
	b.h = h2;
	if (a.x < b.x + b.w &&
		a.x + a.w > b.x &&
		a.y < b.y + b.h &&
		a.y + a.h > b.y) {
		return true;
	} else
		return false;
};
Lemonade.Event = {};
Lemonade.Event.events = new Array();
Lemonade.Event.triggerEvent = function(eventName, obj) {
	var event = {
		event: eventName,
		object: obj,
		length: 0
	};
	Lemonade.Event.events.push(event);
	Lemonade.Debug.log("Event triggered: " + eventName + "on object: " + obj, DEBUG_NOTICE);
	return event;
};
Lemonade.Event.clearEvents = function() {
	Lemonade.Event.events.splice(0, Lemonade.Event.events.length);
};
Lemonade.Event.eventExists = function(eventName, obj, eventneed, objneed) {
	objneed = objneed || false;
	eventneed = eventneed || false;

	var whd = false;
	var l = Lemonade.Event.events.length;
	for (var i = 0; i < l; i++) {
		if (Lemonade.Event.events[i].event === eventName || Lemonade.Event.events[i].object === obj) {
			whd = true;
			if (Lemonade.Event.events[i].event != eventName && eventneed === true)
				whd = false;
			if (Lemonade.Event.events[i].object != obj && objneed === true)
				whd = false;
			if (whd == true)
				return whd;
		}
	}
	return whd;
};
Lemonade.Event.getEvent = function(eventName, obj, eventneed, objneed) {
	objneed = objneed || false;
	eventneed = eventneed || false;

	var whd = false;
	var evts = [];
	var l = Lemonade.Event.events.length;
	for (var i = 0; i < l; i++) {
		if (Lemonade.Event.events[i].event === eventName || Lemonade.Event.events[i].object === obj) {
			whd = true;
			if (Lemonade.Event.events[i].event != eventName && eventneed === true)
				whd = false;
			if (Lemonade.Event.events[i].object != obj && objneed === true)
				whd = false;
			if (whd == true)
				evts.push(Lemonade.Event.events[i]);
		}
	}
	if (evts.length == 1)
		return evts[0];
	return evts;
};
Lemonade.Event.getEvents = function(eventName, obj, eventneed, objneed) {
	objneed = objneed || false;
	eventneed = eventneed || false;

	var whd = false;
	var events = [];
	var l = Lemonade.Event.events.length;
	for (var i = 0; i < l; i++) {
		if (Lemonade.Event.events[i].event === eventName || Lemonade.Event.events[i].object === obj) {
			whd = true;
			if (Lemonade.Event.events[i].event != eventName && eventneed === true)
				whd = false;
			if (Lemonade.Event.events[i].object != obj && objneed === true)
				whd = false;
			if (whd == true)
				events.push(Lemonade.Event.events[i]);
		}
	}
	return events;
};
Lemonade.tween = function(key, obj1, ticks, action, complete) {
	this.key = key;
	this.object = obj1;
	this.action = action || function(o, t) {};

	// Specifies if the ticks should be against milliseconds or amount of times loop has run.
	this.timer = false;
	this.startTime = -1; // If negative one, it will be set the first time the tween is run.

	this.timeSinceStart = function() {
		return (Lemonade.Timer.getCurrentTime() - this.startTime) * Lemonade.Timer.timeInc;
	};
	this.timeLeft = function() {
		return this.ticks - this.timeSinceStart();
	};
	this.timeRatio = function() {
		return (this.timeSinceStart() / this.ticks);
	};

	this.ticks = ticks || 1000;
	this.curTicks = 0;
	this.finished = false;

	this.doAction = function() {
		this.action(this.object, this.curTicks);
		this.curTicks += 1;
	};

	this.finish = complete || function(o) {};
	this.complete = function() {
		this.finish(this.object);
		this.finished = true;
	};
};
Lemonade.tweenList = {
	tweens: new Array(),
	addTween: function(key, o1, ti, ac, co) {
		var tw = new Lemonade.tween(key, o1, ti, ac, co);
		this.tweens.push(tw);
		return tw;
	},
	addTweenTimer: function(key, o1, ti, ac, co) {
		var tw = new Lemonade.tween(key, o1, ti, ac, co);
		tw.timer = true;
		tw.startTime = -1;
		this.tweens.push(tw);
		return tw;
	},
	removeTween: function(key, callFinish) {
		callFinish = callFinish || false;
		var l = this.tweens.length;
		for (var i = 0; i < l; i++) {
			if (this.tweens[i].key == key) {
				if (callFinish === true)
					this.tweens[i].complete();
				this.tweens.splice(i, 1);
				return;
			}
		}
	},
	tweenExists: function(key) {
		var l = this.tweens.length;
		for (var i = 0; i < l; i++) {
			if (this.tweens[i].key == key)
				return true;
		}
		return false;
	},
	getTween: function(key) {
		var l = this.tweens.length;
		for (var i = 0; i < l; i++) {
			if (this.tweens[i].key == key)
				return this.tweens[i];
		}
		return false;
	},
	addPrevTween: function(o) {
		this.tweens.push(o);
	},
};

/**
 * @desc Contains Messaging related functions and variables.
 * @type {object}
 */
Lemonade.Messaging = {};

/**
 * @desc A list of message handlers. Key is the message, value is a list of functions (in case there are multiple)
 * @type {object}
 */
Lemonade.Messaging.messageHandlers = {};

/**
 * @desc List of messages that have been received, up to maxMessageHistory.
 * @type {object}
 */
Lemonade.Messaging.messageHistory = [];

/**
 * @desc Limit of how many messages should be kept in messageHistory.
 * @type {number}
 */
Lemonade.Messaging.maxMessageHistory = 200;

/**
 * @desc Add a message handler to be processed on the message received.
 * @param {string} message - Message to run the handler on.
 * @param {function} handler - Function to be run on receipt of message.
 * @returns {boolean} If the message handler was added successfully.
 */
Lemonade.Messaging.addMessageHandler = function(message, handler){
	if(Lemonade.Messaging.messageHandlers[message] === undefined) {
		Lemonade.Messaging.messageHandlers[message] = [];
	}
	Lemonade.Messaging.messageHandlers[message].push(handler);
	return true;
};

/**
 * @desc Check if there is any handler for the message.
 * @param {string} message - Message to check for handlers.
 * @returns {boolean} If there are any handlers existing for the message.
 */
Lemonade.Messaging.hasMessageHandler = function(message) {
	return Lemonade.Messaging.messageHandlers[message] !== undefined;
};

/**
 * @desc Submits a message. Will run any handlers if any, and add onto messageHistory.
 * @param {string} message - Message to run
 * @param {object} arguments - Any amount of arguments to pass to the message handlers.
 * @returns {boolean} If the message was handled successfully.
 */
Lemonade.Messaging.submitMessage = function(message) {
	if(!Lemonade.Messaging.hasMessageHandler(message))
		return false;
	var args = Array.prototype.slice.call(arguments).splice(1, arguments.length - 1);
	var handlers = Lemonade.Messaging.messageHandlers[message];
	for(var l in handlers) {
		handlers[l].apply(null, args);
	}
	return true;
};

Lemonade.Keyboard = function() {
	this.typed = "";
	this.key = new Array();
	this.init = function() {
		this.resetKeys();
	};
	this.resetKeys = function() {
		for (var i = 0; i < 100; i++) {
			this.key[i] = false;
		}
		this.typed = "";
	};
	this.updateKeys = function() {
		for (var i = 0; i < 100; i++) {
			if (this.key[i] === true) {
				Lemonade.Event.triggerEvent(EVENT_KEYDOWN + i, "");
			}
		}
	};
	this.onKeyDown = function(e) {
		var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
		if (Lemonade.allowKeypress === false)
			e.preventDefault();
		if (this.key[keyCode] !== undefined) {
			//e.preventDefault();
			this.key[keyCode] = true;

			Lemonade.Event.triggerEvent(EVENT_KEYDOWN + keyCode, "");
			if ((keyCode >= 48 && keyCode <= 90) || keyCode == Lemonade.Keyboard.keyCode.space)
				this.typed += String.fromCharCode(keyCode);
			else if (keyCode == Lemonade.Keyboard.keyCode.enter)
				this.typed += "|";
		}
	};
	this.onKeyUp = function(e) {
		var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
		if (Lemonade.allowKeypress === false)
			e.preventDefault();
		if (this.key[keyCode] !== undefined) {
			//e.preventDefault();
			this.key[keyCode] = false;
			Lemonade.Event.triggerEvent(EVENT_KEYUP + keyCode, "");
		}
	};
	this.onKeyPress = function(e) {
		var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
		if (Lemonade.allowKeypress === false)
			e.preventDefault();
		Lemonade.Event.triggerEvent(EVENT_KEYPRESS + keyCode, "");
	};
};
Lemonade.Touch = function() {
	this.touchPos = [];
	this.touchWidth = 4;
	this.touchHeight = 4;

	this.init = function() {};
	this.onTouchStart = function(e) {
		var touchobj = e.changedTouches;
		var sx = window.scrollX;
		var sy = window.scrollY;
		for (var i = 0; i < touchobj.length; i++)
			this.touchPos.push({
				id: touchobj[i].identifier,
				x: (touchobj[i].clientX - Lemonade.Canvas.canvasObject.offsetLeft) / Lemonade.Canvas.xRatio + sx,
				y: (touchobj[i].clientY - Lemonade.Canvas.canvasObject.offsetTop) / Lemonade.Canvas.yRatio + sy
			});
		Lemonade.mouse.leftPressed = true;
		e.preventDefault();

		Lemonade.Event.triggerEvent("touchstart", "touch");
	};

	this.onTouchMove = function(e) {
		var touchobj = e.changedTouches;
		var sx = window.scrollX;
		var sy = window.scrollY;
		for (var i = 0; i < touchobj.length; i++) {
			for (var j = 0; j < this.touchPos.length; j++) {
				if (this.touchPos[j].id != touchobj[i].identifier)
					continue;
				this.touchPos[j] = ({
					id: touchobj[i].identifier,
					x: (touchobj[i].clientX - Lemonade.Canvas.canvasObject.offsetLeft) / Lemonade.Canvas.xRatio + sx,
					y: (touchobj[i].clientY - Lemonade.Canvas.canvasObject.offsetTop) / Lemonade.Canvas.yRatio + sy
				});
			}
		}
		e.preventDefault();
	};

	this.onTouchEnd = function(e) {
		if (Lemonade.multiTouch == false)
			this.touchPos.splice(0);
		Lemonade.mouse.leftPressed = false;
	};
};
Lemonade.Mouse = function() {
	this.leftPressed = false;
	this.middlePressed = false;
	this.rightPressed = false;
	this.mouseclick = false;
	this.x = 0;
	this.y = 0;
	this.width = 1;
	this.height = 1;

	this.wheelx = 0;
	this.wheely = 0;
	this.wheeldx = 0;
	this.wheeldy = 0;

	this.init = function() {
		this.leftPressed = false;
		this.middlePressed = false;
		this.rightPressed = false;
		this.mouseclick = false;
		this.x = 0;
		this.y = 0;
	};
	this.onMouseMove = function(e) {
		if (!e) e = window.event;
		var sx = window.scrollX;
		var sy = window.scrollY;
		this.x = (e.clientX - Lemonade.Canvas.canvasObject.offsetLeft) / Lemonade.Canvas.xRatio + sx;
		this.y = (e.clientY - Lemonade.Canvas.canvasObject.offsetTop) / Lemonade.Canvas.yRatio + sy;
	};

	this.onMouseDown = function(e) {
		if (!e) e = window.event;
		e.preventDefault();
		if (e.button == MOUSE_LEFT)
			this.leftPressed = true;
		else if (e.button == MOUSE_RIGHT)
			this.rightPressed = true;
		else if (e.button == MOUSE_MIDDLE)
			this.middlePressed = true;
		this.mouseclick = true;
	};

	this.onMouseWheel = function(e) {
		console.log("Mouse wheel called.");
		e = window.event || e;
		if (e.preventDefault)
			e.preventDefault();

		var deltay = e.detail ? e.detail * (-120) : e.wheelDeltaY;
		var deltax = e.wheelDeltaX || 0;

		this.wheelx += deltax;
		this.wheely += deltay;
		this.wheeldx = deltax;
		this.wheeldy = deltay;
	};

	this.onMouseUp = function(e) {
		if (!e) e = window.event;
		e.preventDefault();
		if (e.button == MOUSE_LEFT)
			this.leftPressed = false;
		else if (e.button == MOUSE_MIDDLE)
			this.middlePressed = false;
		else if (e.button == MOUSE_RIGHT)
			this.rightPressed = false;
		this.mouseclick = false;
	};
};

Lemonade.Keyboard.keyCode = {
	backspace: 8,
	space: 32,
	tab: 9,
	enter: 13,
	shift: 16,
	ctrl: 17,
	alt: 18,
	pausebreak: 19,
	capslock: 20,
	escape: 27,
	pageup: 33,
	pagedown: 34,
	end: 35,
	home: 36,
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	insert: 45,
	delete_key: 46,
	zero: 48,
	one: 49,
	two: 50,
	three: 51,
	four: 52,
	five: 53,
	six: 54,
	seven: 55,
	eight: 56,
	nine: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90
};

Lemonade.setListeners = function(mouse, keyboard, touch) {
	mouse = mouse || new Lemonade.Mouse();
	keyboard = keyboard || new Lemonade.Keyboard();
	touch = touch || new Lemonade.Touch();

	Lemonade.mouse = mouse;
	Lemonade.keyboard = keyboard;
	Lemonade.touch = touch;
	mouse.init();
	keyboard.init();
	touch.init();
	document.onmousemove = function(e) {
		mouse.onMouseMove(e);
	};
	document.onmousedown = function(e) {
		mouse.onMouseDown(e);
	};
	document.onmouseup = function(e) {
		mouse.onMouseUp(e);
	};

	if (document.onmousewheel === null)
		document.onmousewheel = function(e) {
			mouse.onMouseWheel(e);
		};
	else {
		document.addEventListener("DOMMouseScroll", function(e) {
			mouse.onMouseWheel(e);
		}, false);
	}

	document.onkeydown = function(e) {
		keyboard.onKeyDown(e);
	};
	document.onkeypress = function(e) {
		keyboard.onKeyPress(e);
	};
	document.onkeyup = function(e) {
		keyboard.onKeyUp(e);
	};

	document.ontouchstart = function(e) {
		touch.onTouchStart(e);
	};
	document.ontouchend = function(e) {
		touch.onTouchEnd(e);
	};
	document.ontouchmove = function(e) {
		touch.onTouchMove(e);
	};
};
Lemonade.Behaviour = function(behaviourName, trigger, eventNeeded, objNeeded, action) {
	this.key = behaviourName || "behaviour";
	this.trigger = trigger;
	this.objectNeeded = objNeeded || false;
	this.eventNeeded = eventNeeded || false;
	this.action = action || function(obj) {
		alert("NO ACTION!!!");
	};
};

Lemonade.getEntityPosition = function(entity, excludeScale, excludeCamera) {
	var position = {
		x: 0,
		y: 0,
		z: 0,
		w: 0,
		h: 0
	};
	if (entity.hasComponent(Lemonade.Components.position)) {
		position.x = entity.get('position', 'x');
		position.y = entity.get('position', 'y');
		position.z = entity.get('position', 'z');
		position.w = entity.get('position', 'width');
		position.h = entity.get('position', 'height');

		if (!excludeScale && entity.hasComponent(Lemonade.Components.scale)) {
			if (entity.get("scale", "relativeVar") == COMPONENT_SCALE_CAMERA_BASE) {
				position.w = (position.w * Lemonade.Camera.getScaleX());
				position.h = (position.h * Lemonade.Camera.getScaleY());
			}
			if (entity.get("scale", "relativeVar") == COMPONENT_SCALE_CAMERA_RELATIVE) {
				var tentity = entity.get("scale", "relativeEntity");
				var target;
				if (tentity !== undefined) {
					if (tentity === ENTITY_TEMP0)
						target = ENTITY_TEMPR0;
					else if (tentity === ENTITY_TEMP1)
						target = ENTITY_TEMPR1;
					else if (tentity === ENTITY_TEMP2)
						target = ENTITY_TEMPR2;
					else if (tentity === ENTITY_TEMP3)
						target = ENTITY_TEMPR3;
					else if (tentity === ENTITY_TEMP4)
						target = ENTITY_TEMPR4;
					var targetp = Lemonade.getEntityPosition(target, true, excludeCamera);
					var targetps = Lemonade.getEntityPosition(target, false, excludeCamera);
					var ratiow = (position.x - targetp.x) * Lemonade.Camera.getScaleX();
					var ratioh = (position.y - targetp.y) * Lemonade.Camera.getScaleY();
					position.x = targetps.x + ratiow;
					position.y = targetps.y + ratioh;
					position.w = (position.w * Lemonade.Camera.getScaleX());
					position.h = (position.h * Lemonade.Camera.getScaleY());
				} else {}
			}
			if (entity.get("scale", "relativeVar") == COMPONENT_SCALE_CAMERA) {
				var targetW = position.w - (position.w * Lemonade.Camera.getScaleX());
				var targetH = position.h - (position.h * Lemonade.Camera.getScaleY());
				var scaleX = position.x - targetW / 2;
				var scaleY = position.y - targetH / 2;
				position.x = scaleX;
				position.y = scaleY;
				position.w = (position.w * Lemonade.Camera.getScaleX());
				position.h = (position.h * Lemonade.Camera.getScaleY());
			}
			if (entity.get("scale", "relativeVar") == COMPONENT_SCALE_BASE) {
				var targetW = position.w / 2 - (position.w * entity.get("scale", "scaleX")) / 2;
				var targetH = position.h / 2 - (position.h * entity.get("scale", "scaleY")) / 2;
				var scaleX = position.x + targetW;
				var scaleY = position.y + targetH;
				position.x = scaleX;
				position.y = scaleY;
				position.w = (position.w * entity.get("scale", "scaleX"));
				position.h = (position.h * entity.get("scale", "scaleY"));
			}
		}

		// Move with the camera if it is affected.
		if (!((excludeCamera === undefined && excludeScale === true) || excludeCamera === true) && entity.hasComponent(Lemonade.Components.camera) && entity.get("camera", "isAffected") === true) {
			position.x += Lemonade.Camera.getX();
			position.y += Lemonade.Camera.getY();
			position.z += Lemonade.Camera.getZ();
		}
	}
	return position;
};

Lemonade.Entity = function Entity() {
	this.id = (+new Date()).toString(16) +
		(Math.random() * 1000000000 | 0).toString(16) +
		Lemonade.Entity.prototype._count;
	Lemonade.Entity.prototype._count++;
	this.components = {};

	return this;
};
Lemonade.Entity.prototype._count = 0;

Lemonade.Entity.prototype.render = function() {};

Lemonade.Entity.prototype.addComponent = function(component) {
	this.components[component.prototype.name] = Lemonade.clone(component);
	return this;
};
Lemonade.Entity.prototype.removeComponent = function(componentName) {
	var name = componentName;
	if (typeof componentName === 'object') {
		name = componentName.prototype.name;
	}
	delete this.components[name];
};
Lemonade.Entity.prototype.hasComponent = function(componentName) {
	var name = componentName;
	if (typeof componentName === 'object')
		name = componentName.prototype.name;
	if (this.components[name])
		return true;
	else
		return false;
};
Lemonade.Entity.prototype.get = function(componentName, variableName) {
	var name = componentName;
	if (typeof componentName === 'object')
		name = componentName.prototype.name;
	if (!this.components[name])
		return undefined;
	else
		return this.components[name][variableName];
};
Lemonade.Entity.prototype.set = function(componentName, variableName, value) {
	var name = componentName;
	if (typeof componentName === 'object')
		name = componentName.prototype.name;
	if (!this.components[name])
		return undefined;
	else {
		this.components[componentName][variableName] = value;
		return value;
	}
};
Lemonade.Collision.getCollisionObject = function(entity) {
	var pos = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		isColliding: false,
		id: " "
	};
	pos.id = entity.id;
	if (entity.hasComponent(Lemonade.Components.position)) {
		pos.x = entity.get('position', 'x');
		pos.y = entity.get('position', 'y');
		pos.width = entity.get('position', 'width');
		pos.height = entity.get('position', 'height');
	}
	if (entity.hasComponent(Lemonade.Components.image) && (pos.width == 0 || pos.height == 0)) {
		pos.width = entity.get('image', 'image').width;
		pos.height = entity.get('image', 'image').height;
	}

	if (entity.hasComponent(Lemonade.Components.camera) && entity.get("camera", "isAffected") === true) {
		pos.x += Lemonade.Camera.getX();
		pos.y += Lemonade.Camera.getY();
	}
	return pos;
};
Lemonade.Entity.prototype.print = function() {
	console.log(JSON.stringify(this, null, 4));
	return this;
};

Lemonade.EntityHandler = {
	entities: new Array(),
};
Lemonade.bringEntityTo = function(id, index) {
	var i = Lemonade.getEntityIndex(id);
	if (i !== -1) {
		var e = Lemonade.removeEntity(id);
		Lemonade.addEntity(e, index);
	}
};
Lemonade.bringEntityToFront = function(id) {
	var i = Lemonade.getEntityIndex(id);
	if (i !== -1) {
		var e = Lemonade.removeEntity(id);
		Lemonade.addEntity(e);
	}
};
Lemonade.bringEntityToBack = function(id) {
	var i = Lemonade.getEntityIndex(id);
	if (i != null) {
		var e = Lemonade.removeEntity(id);
		Lemonade.addEntity(e, 0);
	}
};
Lemonade.addEntity = function(ent, ind) {
	if (ind !== undefined) {
		Lemonade.EntityHandler.entities.splice(ind, 0, ent);
	} else
		Lemonade.EntityHandler.entities.push(ent);
	return ent;
};

Lemonade.removeEntity = function(id) {
	if (Lemonade.CompVar.MAGNIFY_ACTIVE === id)
		Lemonade.CompVar.MAGNIFY_ACTIVE = undefined;
	var i = Lemonade.getEntityIndex(id);
	if (i != -1) {
		var e = Lemonade.getEntity(id);
		Lemonade.EntityHandler.entities.splice(i, 1);
		return e;
	}
	return null;
};

Lemonade.getEntityIndex = function(id) {
	for (var i = 0; i < Lemonade.EntityHandler.entities.length; i++) {
		if (Lemonade.EntityHandler.entities[i] === undefined || Lemonade.EntityHandler.entities[i] === null)
			continue;
		if (Lemonade.EntityHandler.entities[i].id === id) {
			return i;
		}
	}
	return -1;
};

Lemonade.getEntity = function(id) {
	var i = Lemonade.getEntityIndex(id);
	if (i != -1) {
		return Lemonade.EntityHandler.entities[i];
	}
	return undefined;
};

Lemonade.Components = {};

// An array of names that are to not be run through
Lemonade.Components_Disabled = [];

Lemonade.isComponentDisabled = function(componentName) {
	return Lemonade.arrayContains(Lemonade.Components_Disabled, componentName);
};
Lemonade.disableComponent = function(componentName) {
	if (Lemonade.arrayContains(Lemonade.Components_Disabled, componentName))
		return;
	else
		Lemonade.Components_Disabled.push(componentName);
};
Lemonade.enableComponent = function(componentName) {
	var ind = Lemonade.arrayIndex(Lemonade.Components_Disabled, componentName);
	if (ind !== -1) {
		Lemonade.Components_Disabled.splice(ind, 1);
	}
};

Lemonade.System = function(componentName, componentProcess, renderOrLogic, precedence) {
	this.componentName = componentName;
	this.componentProcess = componentProcess;
	this.renderOrLogic = renderOrLogic;
	// Used if we need to run before another system. This should a string name of the component / system.
	this.precedence = precedence;
};

Lemonade.Systems = {
	renderSystems: {},
	logicSystems: {},
	addSystem: function(system) {
		if (system.renderOrLogic === SYSTEM_RENDER) {
			if(this.renderSystems[system.componentName] !== undefined) {
				this.renderSystems[system.componentName].push(system);
			}else
				this.renderSystems[system.componentName] = [system];
		} else if (system.renderOrLogic === SYSTEM_LOGIC) {
			if(this.logicSystems[system.componentName] !== undefined) {
				this.logicSystems[system.componentName].push(system);
			}else
				this.logicSystems[system.componentName] = [system];
		}
	},
};

Lemonade.Component = {
	addComponent: function(componentName, componentDetails, componentProcess, renderOrLogic, otherMethod, precedence) { // Precedence is used if the system needs to run before another first.
		if (Lemonade.Components[componentName] !== undefined)
			return;
		Lemonade.Components[componentName] = componentDetails || {};
		Lemonade.Components[componentName].prototype = {};
		Lemonade.Components[componentName].prototype.name = componentName;
		Lemonade.Systems.addSystem(new Lemonade.System(componentName, componentProcess, renderOrLogic, precedence));

		if (otherMethod !== undefined) {
			if (renderOrLogic === SYSTEM_RENDER)
				Lemonade.Systems.addSystem(new Lemonade.System(componentName, otherMethod, SYSTEM_LOGIC, precedence));
			else
				Lemonade.Systems.addSystem(new Lemonade.System(componentName, otherMethod, SYSTEM_RENDER, precedence));
		}
	}
};

Lemonade.loadComponents = function() {
	Lemonade.Component.addComponent("visible", {
		isVisible: true
	}, Lemonade.render, SYSTEM_RENDER);
	Lemonade.Component.addComponent("keeporder", {
		order: -1, // default to bring the entity to the front. Anything other than -1(less than 0) will be inserted into the appropriate index.
	}, Lemonade.doNothing, SYSTEM_NEVER);
	Lemonade.Component.addComponent("collide", {
		isCollidable: true,
		isColliding: false,
		inQuadTree: false
	}, Lemonade.checkCollision, SYSTEM_LOGIC);
	Lemonade.Component.addComponent("update", {
		update: function(entity, data) {},
		data: undefined
	}, Lemonade.updateEntity, SYSTEM_LOGIC);
	Lemonade.Component.addComponent("render", {
		render: function(entity, data) {},
		data: undefined
	}, Lemonade.renderEntity, SYSTEM_RENDER);
	Lemonade.Component.addComponent("image", {
		image: undefined,
		imagedata: undefined,
		width: 0,
		height: 0,
		flipH: false,
		flipV: false,
		scale: 1,
		scaleX: 1,
		scaleY: 1,
		rotation: 0,
		sprite: 0
	}, Lemonade.doNothing, SYSTEM_NEVER);
	Lemonade.Component.addComponent("animation", {
		speed: 0,
		currentFrame: 0,
		maxFrames: 0
	}, Lemonade.animateImage, SYSTEM_LOGIC);
	Lemonade.Component.addComponent("position", {
		x: 0,
		y: 0,
		z: 0,
		width: 0,
		height: 0
	}, Lemonade.doNothing, SYSTEM_NEVER);
	Lemonade.Component.addComponent("camera", {
		isAffected: true
	}, Lemonade.doNothing, SYSTEM_NEVER); // whether the entity should be moved by the camera.
	Lemonade.Component.addComponent("scale", {
		relativeX: 0,
		relativeY: 0,
		relativeZ: 0,
		originalX: 0, // Original coordinates to keep in track of relativeness..
		originalY: 0,
		originalZ: 0,
		scaleX: 0,
		scaleY: 0,
		scaleZ: 0,
		relativeEntity: undefined,
		relativeVar: COMPONENT_SCALE_BASE
	});
	Lemonade.Component.addComponent("label", {
		text: "",
		baseline: "top",
		style: "20px Courier New",
		wrap: false,
		fontHeight: 0,
		fontWidth: 0
	}, Lemonade.doNothing, SYSTEM_NEVER);
	Lemonade.Component.addComponent("color", {
		red: 255,
		green: 255,
		blue: 255,
		alpha: 1,
		color: 0
	}, Lemonade.doNothing, SYSTEM_NEVER);
	Lemonade.Component.addComponent("rectangle", {
		fill: true
	}, Lemonade.doNothing, SYSTEM_NEVER);
	Lemonade.Component.addComponent("kill", {
		kill: true
	}, Lemonade.doNothing, SYSTEM_NEVER);
	Lemonade.Component.addComponent("button", {
			onClick: function() {}
		},
		function(e) {
			if (Lemonade.Event.eventExists(EVENT_COLLIDE + 'mouse', e.id, true, true) === true && Lemonade.mouse.leftPressed === true) {
				Lemonade.mouse.leftPressed = false;

				e.get("button", "onClick")(e);
			}
		}, SYSTEM_LOGIC);
	Lemonade.Component.addComponent("data", {
		data: {}
	}, Lemonade.doNothing, SYSTEM_NEVER);
	Lemonade.Component.addComponent("magnify", {
			oneAtATime: true,
			scale: undefined,
			cr: 0,
			csr: 0,
			cx: 0,
			cy: 0,
			sx: undefined,
			sy: 0,
			sw: 0,
			sh: 0,
			nx: undefined,
			ny: undefined,
			nw: undefined,
			nh: undefined,
			mouseActivate: true,
			progress: 0,
			speed: 1
		},
		function(e) {
			var active = false;
			if (e.get("magnify", "mouseActivate") === true) {
				if (Lemonade.Event.eventExists(EVENT_COLLIDE + 'mouse', e.id, true, true) === true) {
					if (e.get("magnify", "oneAtATime") === true) {
						if (Lemonade.CompVar.MAGNIFY_ACTIVE === e.id || Lemonade.CompVar.MAGNIFY_ACTIVE === undefined) {
							active = true;

							if (Lemonade.CompVar.MAGNIFY_ACTIVE === undefined && GameTimer.paused === false) {
								Lemonade.bringEntityToFront(e.id);
							}

							Lemonade.CompVar.MAGNIFY_ACTIVE = e.id;
						}
					}
				}
			}

			if (active === false && Lemonade.CompVar.MAGNIFY_ACTIVE === e.id)
				Lemonade.CompVar.MAGNIFY_ACTIVE = undefined;

			if (active === true) {
				var pos = Lemonade.getEntityPosition(e);

				if (e.get("magnify", "progress") <= 0) {
					e.set("magnify", "progress", 0);

					e.set("magnify", "sx", pos.x);
					e.set("magnify", "sy", pos.y);
					e.set("magnify", "sw", pos.w);
					e.set("magnify", "sh", pos.h);

					if (e.hasComponent(Lemonade.Components.circle)) {
						e.set("magnify", "csr", e.get("circle", "radius"));
						e.set("magnify", "cx", e.get("circle", "offsetX"));
						e.set("magnify", "cy", e.get("circle", "offsetY"));
					}
				}
				e.set("position", "x", e.get("magnify", "sx") + (e.get("magnify", "nx") * (e.get("magnify", "progress") / 100.0)));
				e.set("position", "y", e.get("magnify", "sy") + (e.get("magnify", "ny") * (e.get("magnify", "progress") / 100.0)));
				e.set("position", "width", e.get("magnify", "sw") + (e.get("magnify", "nw") * (e.get("magnify", "progress") / 100.0)));
				e.set("position", "height", e.get("magnify", "sh") + (e.get("magnify", "nh") * (e.get("magnify", "progress") / 100.0)));

				if (e.hasComponent(Lemonade.Components.circle)) {
					e.set("circle", "radius", e.get("magnify", "csr") + (e.get("magnify", "cr") * e.get("magnify", "progress") / 100.0));
					e.set("circle", "offsetX", e.get("magnify", "cx") - (e.get("magnify", "nx") * e.get("magnify", "progress") / 100.0));
					e.set("circle", "offsetY", e.get("magnify", "cy") - (e.get("magnify", "ny") * e.get("magnify", "progress") / 100.0));
				}

				e.set("magnify", "progress", e.get("magnify", "progress") + e.get("magnify", "speed"));
				if (e.get("magnify", "progress") > 100)
					e.set("magnify", "progress", 100);
			} else if (e.get("magnify", "progress") > 0 && e.get("magnify", "sx") !== undefined) {
				e.set("magnify", "progress", e.get("magnify", "progress") - e.get("magnify", "speed"));

				e.set("position", "x", e.get("magnify", "sx") + (e.get("magnify", "nx") * (e.get("magnify", "progress") / 100.0)));
				e.set("position", "y", e.get("magnify", "sy") + (e.get("magnify", "ny") * (e.get("magnify", "progress") / 100.0)));
				e.set("position", "width", e.get("magnify", "sw") + (e.get("magnify", "nw") * (e.get("magnify", "progress") / 100.0)));
				e.set("position", "height", e.get("magnify", "sh") + (e.get("magnify", "nh") * (e.get("magnify", "progress") / 100.0)));

				if (e.hasComponent(Lemonade.Components.circle)) {
					e.set("circle", "radius", e.get("magnify", "csr") + (e.get("magnify", "cr") * e.get("magnify", "progress") / 100.0));
					e.set("circle", "offsetX", e.get("magnify", "cx") - (e.get("magnify", "nx") * e.get("magnify", "progress") / 100.0));
					e.set("circle", "offsetY", e.get("magnify", "cy") - (e.get("magnify", "ny") * e.get("magnify", "progress") / 100.0));
				}
			}
		}, SYSTEM_LOGIC);
	Lemonade.Component.addComponent("cover", {
			opacity: 0.5,
			color: '#000000',
			offsetX: 0,
			offsetY: 0,
			width: 0,
			height: 0,
		},
		function(e) {
			if (e.hasComponent("visible") === false || e.get("visible", "isVisible") === false)
				return;

			var oldFill = Lemonade.Canvas.context.fillStyle;
			var oldAlph = Lemonade.Canvas.context.globalAlpha;

			Lemonade.Canvas.context.fillStyle = e.get("cover", "color");
			Lemonade.Canvas.context.globalAlpha = e.get("cover", "opacity");

			var pos = Lemonade.getEntityPosition(e);
			if (e.hasComponent(Lemonade.Components.circle) === false)
				Lemonade.Canvas.context.fillRect(pos.x + e.get("cover", "offsetX"), pos.y + e.get("cover", "offsetY"), pos.w + e.get("cover", "width"), pos.h + e.get("cover", "height"));
			else {
				Lemonade.Canvas.context.beginPath();
				Lemonade.Canvas.context.arc(pos.x + e.get("circle", "offsetX"), pos.y + e.get("circle", "offsetY"), e.get("circle", "radius"), 0, 2 * Math.PI);
				Lemonade.Canvas.context.closePath();
				Lemonade.Canvas.context.fill();
			}

			Lemonade.Canvas.context.fillStyle = oldFill;
			Lemonade.Canvas.context.globalAlpha = oldAlph;
		}, SYSTEM_RENDER);

	Lemonade.Component.addComponent("border", { // rectangle border
		color: '#00aa00',
		visible: true,
		offsetX: 0,
		offsetY: 0,
		width: 0,
		height: 0
	}, function(entity) {
		if (entity.get("border", "visible") === false)
			return;
		if (entity.hasComponent("visible") === false || entity.get("visible", "isVisible") === false)
			return;

		Lemonade.Canvas.context.save();
		var pos = Lemonade.getEntityPosition(entity);

		if (entity.get("border", "width") !== 0)
			pos.w = entity.get("border", "width");
		if (entity.get("border", "height") !== 0)
			pos.h = entity.get("border", "height");

		pos.x += entity.get("border", "offsetX");
		pos.y += entity.get("border", "offsetY");

		Lemonade.Canvas.context.beginPath();
		Lemonade.Canvas.context.strokeStyle = entity.get("border", "color");
		Lemonade.Canvas.context.lineWidth = "1";
		Lemonade.Canvas.context.rect(pos.x, pos.y, pos.w, pos.h);
		Lemonade.Canvas.context.stroke();
		Lemonade.Canvas.context.closePath();

		Lemonade.Canvas.context.restore();
	}, SYSTEM_RENDER);
	Lemonade.Component.addComponent("line", {
		endPointX: 0,
		endPointY: 0,
		width: 1
	}, function(e) {
		var startX = 0;
		var startY = 0;
		var endX = e.get("line", "endPointX");
		var endY = e.get("line", "endPointY");

		if (e.hasComponent("position")) {
			startX = e.get("position", "x");
			startY = e.get("position", "y");
		}

		Lemonade.Canvas.context.beginPath();
		Lemonade.Canvas.context.lineWidth = e.get("line", "width") + "";
		Lemoande.Canvas.context.moveTo(startX, startY);
		Lemonade.Canvas.context.lineTo(endX, endY);
		Lemonade.Canvas.context.stroke();
	}, SYSTEM_RENDER);
	Lemonade.Component.addComponent("circle", {
		color: "#000000",
		radius: 10,
		offsetX: 0,
		offsetY: 0,
		fill: false,
		distance: 2 * Math.PI,
		start: 0
	}, function(entity) {

		if (entity.hasComponent("visible") === false || entity.get("visible", "isVisible") === false)
			return;
		Lemonade.Canvas.context.save();

		var pos = Lemonade.getEntityPosition(entity);

		Lemonade.Canvas.context.beginPath();
		Lemonade.Canvas.context.strokeStyle = entity.get("circle", "color");
		Lemonade.Canvas.context.fillStyle = entity.get("circle", "color");
		Lemonade.Canvas.context.lineWidth = "1";
		Lemonade.Canvas.context.arc(pos.x + entity.get("circle", "offsetX"), pos.y + entity.get("circle", "offsetY"), entity.get("circle", "radius"), entity.get("circle", "start"), entity.get("circle", "distance"), false);
		if (entity.get('circle', 'fill') === true)
			Lemonade.Canvas.context.fill();
		else
			Lemonade.Canvas.context.stroke();

		Lemonade.Canvas.context.closePath();

		Lemonade.Canvas.context.restore();
	}, SYSTEM_RENDER);
	// Requires the collision component to operate as intended, must be last component added in the render systems, because it is drawn over everything else.
	Lemonade.Component.addComponent("tooltip", {
		information: "",
		visible: true,
		background: true,
		backgroundColor: "#ffffff",
		fontStyle: "Courier New",
		fontSize: "20",
		x: 0,
		y: 0,
		mouseActivate: true,
		bringToFront: true,
		oldIndex: -1,
	}, function(entity) {
		if (entity.get("tooltip", "visible") === false)
			return;

		if (entity.get("tooltip", "mouseActivate") === true) {
			if (Lemonade.Event.eventExists(EVENT_COLLIDE + 'mouse', entity.id, true, true) === true) {
				var x = Lemonade.mouse.x;
				var y = Lemonade.mouse.y;
				entity.set("tooltip", "x", x - 32);
				entity.set("tooltip", "y", y - 16);
				if (entity.get("tooltip", "bringToFront") === true) {
					if (entity.get("tooltip", "oldIndex") < 0)
						entity.set("tooltip", "oldIndex", Lemonade.getEntityIndex(entity.id));
					Lemonade.bringEntityToFront(entity.id);
				}
			} else {
				if (entity.get("tooltip", "oldIndex") >= 0) {
					Lemonade.bringEntityTo(entity.id, entity.get("tooltip", "oldIndex"));
					entity.set("tooltip", "oldIndex", -1);
				}
				return;
			}
		}

		Lemonade.Canvas.context.save();

		var info = [];
		var information = entity.get("tooltip", "information");
		// Splice lines from the information
		var longest = 0;
		for (var i = 0; i < information.length; i++) {
			if (information[i] == '|') {
				if (entity.get("tooltip", "x") + (0.6 * entity.get("tooltip", "fontSize") * i) > 1080) {
					entity.set("tooltip", "x", 1080 - 0.6 * entity.get("tooltip", "fontSize") * i - 1)
				}
				info.push(information.substr(0, i));
				information = information.slice(i + 1);
				i = 0;
			}
			if (0.6 * entity.get("tooltip", "fontSize") * (i + 1) > longest)
				longest = 0.6 * entity.get("tooltip", "fontSize") * (i + 1);
		}
		if (information.length > 0) {
			if (entity.get("tooltip", "x") + (0.6 * entity.get("tooltip", "fontSize") * information.length) > 1080)
				entity.set("tooltip", "x", 1080 - 0.6 * entity.get("tooltip", "fontSize") * information.length - 1)
			info.push(information.substr(0, information.length));
			if (0.6 * entity.get("tooltip", "fontSize") * information.length > longest)
				longest = 0.6 * entity.get("tooltip", "fontSize") * information.length;
			information = information.slice(information.length);
		}
		if (entity.get("tooltip", "y") + info.length * entity.get("tooltip", "fontSize") > 720)
			entity.set("tooltip", "y", 720 - info.length * entity.get("tooltip", "fontSize"));

		if (entity.get("tooltip", "background") === true) {
			// if(UI_TOOLTIP_USEBACKGROUND === false){
			Lemonade.Canvas.context.fillStyle = entity.get("tooltip", "backgroundColor");
			Lemonade.Canvas.context.fillRect(entity.get("tooltip", "x"), entity.get("tooltip", "y"), longest, info.length * entity.get("tooltip", "fontSize"));
			/*}else{
			    if(entity.get("tooltip", "y") + 20 + info.length * entity.get("tooltip", "fontSize") > 720)
			        entity.set("tooltip", "y", 720 - 20 - info.length * entity.get("tooltip", "fontSize"));
			    if(entity.get("tooltip", "x") + 20 + (0.6 * entity.get("tooltip", "fontSize") * information.length) > 1080)
			        entity.set("tooltip", "x", 1080- 20 - 0.6 * entity.get("tooltip", "fontSize") * information.length -1)
			    Lemonade.Repository.addImage(UI_DEFAULT_BACK_IMAGE, UI_DEFAULT_BACK_IMAGE, 32, 32).draw(
			        entity.get("tooltip", "x") - 20, entity.get("tooltip", "y") - 20,
			        longest + 40,
			        info.length * entity.get("tooltip", "fontSize") + 40
			    );
			}*/
		}

		Lemonade.Canvas.context.textBaseline = 'top';
		Lemonade.Canvas.context.font = entity.get("tooltip", "fontSize") + "px " + entity.get("tooltip", "fontStyle");
		Lemonade.Canvas.context.fillStyle = "#000000";
		for (var i = 0; i < info.length; i++) {
			var t = info[i];
			Lemonade.Canvas.context.fillText(t, entity.get("tooltip", "x"), entity.get("tooltip", "y") + i * entity.get("tooltip", "fontSize"));
		}

		Lemonade.Canvas.context.restore();
	}, SYSTEM_RENDER);
};

Lemonade.Factory = {};

Lemonade.Factory.TextInput = function TextInput(inputBoxColor, maxText, mask, defaultValue, fontSize, inputBoxFont, posX, posY, label, colorHighlight, useBackGround, backImage){

    this.textValue = defaultValue || "";
    this.maskText = mask || false;
    this.maxText = maxText || 64;
    
    this.inputBoxColor = inputBoxColor || '#000000';
    this.colorHighlight = colorHighlight || '#aaaaaa';

    if(useBackGround === undefined)
        useBackGround = true;

    this.mx = 0;
    this.my = 0;
    if(useBackGround === true){
        this.mx = 16;
        this.my = 10;
    }

    this.label = label;

    this.selected = false;

    this.bkEnt = new Lemonade.Entity();
    this.bkEnt.addComponent(Lemonade.Components.visible);
    this.bkEnt.addComponent(Lemonade.Components.rectangle);
    this.bkEnt.addComponent(Lemonade.Components.color);
    this.bkEnt.set("color","red", "#ffffff");
    this.bkEnt.addComponent(Lemonade.Components.position);
    this.bkEnt.set("position", "x", posX || 0);
    this.bkEnt.set("position", "y", posY || 0);
    this.bkEnt.set("position","width", this.maxText * (fontSize || 20));
    this.bkEnt.set("position","height", (fontSize || 20));

    if(this.label !== undefined)
    {
        this.lbEnt = new Lemonade.Entity();
        this.lbEnt.addComponent(Lemonade.Components.visible);
        this.lbEnt.addComponent(Lemonade.Components.collide);

        this.lbEnt.addComponent(Lemonade.Components.label);
        this.lbEnt.set("label", "style", (fontSize || "20") + "px " + (inputBoxFont || "Georgia"));
        this.lbEnt.set("label", "text", this.label);

        this.lbEnt.addComponent(Lemonade.Components.color);
        this.lbEnt.set("color","red", inputBoxColor || "#000000");

        this.lbEnt.addComponent(Lemonade.Components.position);
        this.lbEnt.set("position","width", this.label.length * (fontSize || 20));
        this.lbEnt.set("position","height", (fontSize || 20));
        this.lbEnt.set("position", "x", (posX || 0) - this.lbEnt.get("position", "width") * 0.6);
        this.lbEnt.set("position", "y", posY || 0);
    }

    this.e = new Lemonade.Entity();
    this.e.addComponent(Lemonade.Components.visible);
    this.e.addComponent(Lemonade.Components.collide);

    this.e.addComponent(Lemonade.Components.label);
    this.e.set("label", "style", (fontSize || "20") + "px " + (inputBoxFont || "Georgia"));

    this.e.addComponent(Lemonade.Components.color);
    this.e.set("color","red", inputBoxColor || "#000000");

    this.e.addComponent(Lemonade.Components.update);
    this.e.set("update","update", function(e, d){
        if(d.maskText === false)
            e.set("label","text", d.textValue);
        else if(e.get("label","text").length !== d.textValue.length)
        {
            var t="";
            for(var i=0;i<d.textValue.length;i++)
            {
                t+="O";
            }
            e.set("label","text", t);
        }
        if(Lemonade.mouse.leftPressed === true)
        {
            if(Lemonade.Event.eventExists(EVENT_COLLIDE + 'mouse', e.id, true, true) === true)
            {
                d.selected = true;
            }else
                d.selected = false;
        }

        if(d.selected === true)
        {
            e.set("color","red", d.colorHighlight || '#aaaaaa');
            d.textValue += Lemonade.keyboard.typed;
            if(d.textValue.length > d.maxText)
                d.textValue = d.textValue.substr(0,d.maxText);

            if(Lemonade.Event.eventExists(EVENT_KEYDOWN + Lemonade.Keyboard.keyCode.backspace, true, false)){
                d.textValue = d.textValue.substr(0,d.textValue.length - 1);
                Lemonade.keyboard.resetKeys();
            }
        }else
            e.set("color","red", d.inputBoxColor);

    });
    this.e.set("update","data", this);

    this.e.addComponent(Lemonade.Components.position);
    this.e.set("position", "x", posX || 0);
    this.e.set("position", "y", posY || 0);
    this.e.set("position","width", this.maxText * (fontSize || 20));
    this.e.set("position","height", (fontSize || 20));

    this.e.addComponent(Lemonade.Components.border);
    this.e.set("border", "color", "#000000");
    this.e.set("border", "offsetX", -2);
    this.e.set("border", "offsetY", -2);
    this.e.set("border", "width", this.e.get("position","width")+4);
    this.e.set("border", "height", this.e.get("position","height")+4);

    this.setPosition = function(x,y)
    {
        this.e.set("position", "x", x);
        this.e.set("position", "y", y);
        this.bkEnt.set("position", "x", x - this.mx);
        this.bkEnt.set("position", "y", y - this.my);
        if(this.label !== undefined){
            this.lbEnt.set("position", "x", x);
            this.lbEnt.set("position", "y", y);
        }
    };

    this.getEntity = function()
    {
        return this.e;
    };

    this.addEntity = function()
    {
        Lemonade.addEntity(this.bkEnt);
        Lemonade.addEntity(this.e);
        if(this.label !== undefined)
            Lemonade.addEntity(this.lbEnt);
    };
    
    this.removeEntity = function() {
    	Lemonade.removeEntity(this.bkEnt.id);
    	Lemonade.removeEntity(this.e.id);
        if(this.label !== undefined)
            Lemonade.removeEntity(this.lbEnt.id);
    };

    this.getValue = function()
    {
        return this.textValue;
    };

    if(useBackGround === false)
    {
        this.e.addComponent(Lemonade.Components.border);
        this.e.set("border", "color", "#000000");
        this.e.set("border", "offsetX", -2);
        this.e.set("border", "offsetY", -2);
        this.e.set("border", "width", this.e.get("position","width")+4);
        this.e.set("border", "height", this.e.get("position","height")+4);


        this.bkEnt = new Lemonade.Entity();
        this.bkEnt.addComponent(Lemonade.Components.visible);
        this.bkEnt.addComponent(Lemonade.Components.rectangle);
        this.bkEnt.addComponent(Lemonade.Components.color);
        this.bkEnt.set("color","red", "#ffffff");
        this.bkEnt.addComponent(Lemonade.Components.position);
        this.bkEnt.set("position", "x", posX || 0);
        this.bkEnt.set("position", "y", posY || 0);
        this.bkEnt.set("position","width", this.name.length * (fontSize || 20));
        this.bkEnt.set("position","height", (fontSize || 20));
    }else{
        this.bkEnt = new Lemonade.Entity();
        this.bkEnt.addComponent(Lemonade.Components.visible);
        //this.bkEnt.addComponent(Lemonade.Components.rectangle);
        this.bkEnt.addComponent(Lemonade.Components.image);
        this.bkEnt.set("image","image", Lemonade.Repository.addImage(backImage, backImage, 32, 32));
        this.bkEnt.addComponent(Lemonade.Components.position);
        this.bkEnt.set("position", "x", posX -this.mx || 0);
        this.bkEnt.set("position", "y", posY -this.my || 0);
        this.bkEnt.set("position","width", this.mx*2 + this.maxText * (fontSize || 20));
        this.bkEnt.set("position","height", 2*this.my + (fontSize || 20));
    }

    return this;
};

Lemonade.doNothing = function(entity) {};

Lemonade.animateImage = function(entity) {
	if (entity.hasComponent(Lemonade.Components.image) === true) {
		entity.set("animation", "currentFrame", entity.get("animation", "currentFrame") + entity.get("animation", "speed"));
		if (Math.floor(entity.get("animation", "currentFrame")) >= entity.get("animation", "maxFrames")) {
			entity.set("animation", "currentFrame", 0)
		}
		entity.set("image", "sprite", Math.floor(entity.get("animation", "currentFrame")));
	}
};

Lemonade.updateEntity = function(entity) {
	entity.get("update", "update")(entity, entity.get("update", "data"));
};
Lemonade.renderEntity = function(entity) {
	entity.get("render", "render")(entity, entity.get("render", "data"));
	Lemonade.render(entity);
};

// This is the render function that is called when webgl is in use. Only for 2d objects and components.
Lemonade.render3D = function(entity) {

	var color = {
		r: 255,
		g: 255,
		b: 255,
		a: 255
	};

	var position = Lemonade.getEntityPosition(entity);

	if (entity.hasComponent(Lemonade.Components.color)) {
		color.r = entity.get('color', 'red');
		color.g = entity.get('color', 'green');
		color.b = entity.get('color', 'blue');
		color.a = entity.get('color', 'alpha');
	}
	var vertexArray = [ttn(position.x, FLAG_WIDTH), ttn(position.y, FLAG_HEIGHT),
		ttn(position.x + position.w, FLAG_WIDTH), ttn(position.y, FLAG_HEIGHT),
		ttn(position.x + position.w, FLAG_WIDTH), ttn(position.y + position.h, FLAG_HEIGHT),
		ttn(position.x, FLAG_WIDTH), ttn(position.y + position.h, FLAG_HEIGHT),

		//Now the Colors
		color.r / 255, color.g / 255, color.b / 255,
		color.r / 255, color.g / 255, color.b / 255,
		color.r / 255, color.g / 255, color.b / 255,
		color.r / 255, color.g / 255, color.b / 255
	];
	var texCoord = [0, 0,
		1, 0,
		1, 1,
		0, 1
	];
	var texCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoord), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, Lemonade.Graphics.threed.buffer.getVertexBuffer(vertexArray));
	gl.vertexAttribPointer(Lemonade.Graphics.threed.shader._position, 2, gl.FLOAT, false, 4 * (2), 0);

	if (Lemonade.Graphics.threed.shader._uv !== undefined && entity.hasComponent(Lemonade.Components.image) && entity.get("image", "image") !== undefined) {
		if (entity.get("image", "image").getWebGLTexture() !== false) {
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, entity.get("image", "image").getWebGLTexture());
		}
	}
	if (Lemonade.Graphics.threed.shader._color !== undefined) {
		gl.vertexAttribPointer(Lemonade.Graphics.threed.shader._color, 3, gl.FLOAT, false, 4 * (3), 4 * (2 * 4));
	}
	if (Lemonade.Graphics.threed.shader._uv !== undefined) {
		gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
		gl.vertexAttribPointer(Lemonade.Graphics.threed.shader._uv, 2, gl.FLOAT, false, 4 * (2), 0);
	}

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Lemonade.Graphics.threed.buffer.getFaceBuffer([0, 1, 2, 2, 3, 0]));
	gl.drawElements(gl.TRIANGLES, 2 * 3, gl.UNSIGNED_SHORT, 0);
	gl.flush();

	// WORKING ON MAKING THIS WEBGL COMPATIBLE YOU GOT THE KNOWLEDGE TO. SO JUST DO IT

	return undefined;
};

Lemonade.render = function(entity) {
	if (entity.get("visible", "isVisible") === false)
		return;
	if (Lemonade.Graphics.threed.enabled === true) {
		return Lemonade.render3D(entity);
	}
	Lemonade.Canvas.context.save();
	var color = {
		isColor: false,
	};
	var position = Lemonade.getEntityPosition(entity);
	if (entity.hasComponent(Lemonade.Components.color)) {
		color.r = entity.get('color', 'red');
		color.g = entity.get('color', 'green');
		color.b = entity.get('color', 'blue');
		color.a = entity.get('color', 'alpha');
		color.isColor = true;
		if (color.isColor === true) {
			if (typeof color.r == 'string')
				Lemonade.Canvas.context.fillStyle = color.r;
			else
				Lemonade.Canvas.context.fillStyle = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
		} else
			Lemonade.Canvas.context.fillStyle = "#000000";
	}
	if (Lemonade.showCollisionRects === true && entity.hasComponent(Lemonade.Components.collide)) {
		Lemonade.Canvas.context.fillStyle = "#ff0ff0";
		Lemonade.Canvas.context.fillRect(position.x - 1, position.y - 1, position.w + 2, position.h + 2);
	}
	if (entity.hasComponent(Lemonade.Components.image) && entity.get("image", "image") !== undefined) {
		Lemonade.Canvas.context.translate(position.x + entity.get("image", "image").originX, position.y + entity.get("image", "image").originY);
		Lemonade.Canvas.context.rotate(entity.get('image', 'rotation'));
		var scx = 1;
		var scy = 1;
		if (entity.get('image', 'flipH') == true)
			scx = -1;
		if (entity.get('image', 'flipV') == true)
			scy = -1;
		Lemonade.Canvas.context.scale(scx, scy);
		entity.get('image', 'image').draw(-entity.get("image", "image").originX, -entity.get("image", "image").originY, position.w * entity.get('image', 'scale') * entity.get('image', 'scaleX'), position.h * entity.get('image', 'scale') * entity.get('image', 'scaleY'), entity.get('image', 'sprite')); //position.x,position.y,position.w,position.h);
	}
	if (entity.hasComponent(Lemonade.Components.image) && entity.get("image", "imagedata") !== undefined) {
		Lemonade.Canvas.context.translate(position.x + position.w / 2, position.y + position.h / 2);
		Lemonade.Canvas.context.rotate(entity.get('image', 'rotation'));
		var scx = 1;
		var scy = 1;
		if (entity.get('image', 'flipH') == true)
			scx = -1;
		if (entity.get('image', 'flipV') == true)
			scy = -1;
		Lemonade.Canvas.context.scale(scx, scy);
		Lemonade.Canvas.context.putImageData(entity.get("image", "imagedata"), position.x, position.y, 0, 0, position.w * entity.get('image', 'scale') * entity.get('image', 'scaleX'), position.h * entity.get('image', 'scale') * entity.get('image', 'scaleY'));
	}
	if (entity.hasComponent(Lemonade.Components.rectangle)) {
		if (entity.get('rectangle', 'fill') === true)
			Lemonade.Canvas.context.fillRect(position.x, position.y, position.w, position.h);
		else {
			Lemonade.Canvas.context.beginPath();
			Lemonade.Canvas.context.lineWidth = 1;
			Lemonade.Canvas.context.rect(position.x, position.y, position.w, position.h);
			Lemonade.Canvas.context.stroke();
			Lemonade.Canvas.context.closePath();
		}

	}
	if (entity.hasComponent(Lemonade.Components.label)) {
		Lemonade.Canvas.context.textBaseline = entity.get('label', 'baseline');

		Lemonade.Canvas.context.font = entity.get('label', 'style');

		if (entity.get('label', 'wrap') === true && position.w > 0) {
			var info = [];
			var information = entity.get("label", "text");
			// Splice lines from the information
			var longest = 0;
			for (var i = 0; i < information.length; i++) {
				if (information[i] == '|') {
					info.push(information.substr(0, i));
					information = information.slice(i + 1);
					i = 0;
					continue;
				}
				if (i * .6 * entity.get("label", "fontHeight") > position.w) {
					info.push(information.substr(0, i));
					information = information.slice(i);
					i = 0;
				}
				if (0.6 * entity.get("label", "fontHeight") * (i + 1) > longest)
					longest = 0.6 * entity.get("label", "fontHeight") * (i + 1);
			}
			if (information.length > 0) {
				info.push(information.substr(0, information.length));
				information = information.slice(information.length);
			}
			/*
			      var info = entity.get('label', 'text');
			      var lines = 0;
			      for(var i=1;i<info.length;i++)
			      {
			        if(i * entity.get('label', 'fontWidth') > position.w || info.substr(i, i+1) == '|')
			        {
			          Lemonade.Canvas.context.fillText(info.substr(0,i-1), position.x, position.y + lines* entity.get('label', 'fontHeight'));
			          info = info.slice(i-1, info.length);
			          lines++;
			          i = 0;
			        }/*else if(info.substr(i,i+1) == '|>')
			        {
			          Lemonade.Canvas.context.fillText(info.substr(0,i), position.x, position.y + lines* entity.get('label', 'fontHeight'));
			          info = info.slice(i+1, info.length);
			          lines++;
			          i = 0;
			        }
			      }*/
			for (var jj = 0; jj < info.length; jj++)
				Lemonade.Canvas.context.fillText(info[jj], position.x, position.y + jj * entity.get('label', 'fontHeight'));
		} else
			Lemonade.Canvas.context.fillText(entity.get('label', 'text'), position.x, position.y);
	}
	Lemonade.Canvas.context.restore();
	for (var i = 0; i < Lemonade.touch.touchPos.length; i++) {
		Lemonade.Canvas.context.fillRect(Lemonade.touch.touchPos[i].x, Lemonade.touch.touchPos[i].y, 32, 32);
	}
};
/*
    the update loop of the engine. Called every frame for logic.
*/
Lemonade.checkCollision = function(entity) {
	var c = Lemonade.Collision.getCollisionObject(entity);
	var items;
	var len;
	var ents = [];
	items = Lemonade.Collision.QuadTree.retrieve(c);
	len = items.length;
	c.isColliding = false;
	for (var j = 0; j < len; j++) {
		var item;
		item = items[j];
		if (c.id == item.id)
			continue;

		//if(c.isColliding === true && item.isColliding === true)
		//continue;

		/*if(!c.isColliding){
		  c.isColliding = colliding;
		}
		if(!item.isColliding){
		  item.isColliding = colliding;
		}*/
		if (Lemonade.CollisionDetection(c.x, c.y, c.width, c.height, item.x, item.y, item.width, item.height) === true) {
			Lemonade.Event.triggerEvent(EVENT_COLLIDE + c.id, item.id);
			Lemonade.Event.triggerEvent(EVENT_COLLIDE + item.id, c.id);
			item.isColliding = true;
		}
	}
};

// Delta time not used yet.
Lemonade.logicLoop = function(dt) {

	if (Lemonade.loadingScreen !== undefined) {
		var la = 0;
		var li = 0;
		var ls = 0;
		for (var i = 0; i < Lemonade.loadingScreen.imagesNeeded.length; i++) {
			if (Lemonade.Repository.getImage(Lemonade.loadingScreen.imagesNeeded[i]) !== undefined &&
				Lemonade.arrayContains(Lemonade.loadedImages, Lemonade.loadingScreen.imagesNeeded[i])){
				li++;
			} else
				break; // Want all the images to be loaded.
		}
		for (var i = 0; i < Lemonade.loadingScreen.soundsNeeded.length; i++) {
			if (Lemonade.Repository.getSound(Lemonade.loadingScreen.soundsNeeded[i]) !== undefined &&
				Lemonade.arrayContains(Lemonade.loadedSounds, Lemonade.loadingScreen.soundsNeeded[i])) {
				ls++;
				
			 } else
				break; // Want all the images to be loaded.
		}
		for (var i = 0; i < Lemonade.loadingScreen.assetsNeeded.length; i++) {
			if (Lemonade.Repository.getAsset(Lemonade.loadingScreen.assetsNeeded[i]) !== undefined &&
				Lemonade.arrayContains(Lemonade.loadedAssets, Lemonade.loadingScreen.assetsNeeded[i])) {
				la++;
			} else
				break; // Want all the images to be loaded.
		}

		Lemonade.loadingScreen.update();
		if (Lemonade.loadingScreen.assetsNeeded.length <= la &&
			Lemonade.loadingScreen.imagesNeeded.length <= li &&
			Lemonade.loadingScreen.soundsNeeded.length <= ls) {
			Lemonade.loadingScreen = undefined;
			Lemonade.loadedAssets = [];
			Lemonade.loadedImages = [];
			Lemonade.loadedSounds = [];
			console.log("Success in loading !!!");
		}
		return;
	}

	Lemonade.Event.clearEvents();
	Lemonade.keyboard.updateKeys();

	Lemonade.Collision.QuadTree.clear();

	Lemonade.Collision.QuadTree.insert({
		isColliding: false,
		id: 'mouse',
		x: Lemonade.mouse.x,
		y: Lemonade.mouse.y,
		width: Lemonade.mouse.width,
		height: Lemonade.mouse.height
	});
	if (Lemonade.countTouchAsMouse == true) {
		for (var i = 0; i < Lemonade.touch.touchPos.length; i++)
			Lemonade.Collision.QuadTree.insert({
				isColliding: false,
				id: 'mouse',
				x: Lemonade.touch.touchPos[i].x,
				y: Lemonade.touch.touchPos[i].y,
				width: Lemonade.touch.touchWidth,
				height: Lemonade.touch.touchHeight
			});
	} else {
		for (var i = 0; i < Lemonade.touch.touchPos.length; i++)
			Lemonade.Collision.QuadTree.insert({
				isColliding: false,
				id: 'touch' + Lemonade.touch.touchPos[i].id,
				x: Lemonade.touch.touchPos[i].x,
				y: Lemonade.touch.touchPos[i].y,
				width: Lemonade.touch.touchWidth,
				height: Lemonade.touch.touchHeight
			});
	}
	// Start with adding, if necessary to the quadtree collision detection.
	for (var j = 0; j < Lemonade.EntityHandler.entities.length; j++) {
		if (Lemonade.EntityHandler.entities[j] === undefined || Lemonade.EntityHandler.entities[j] === null)
			continue;
		if (Lemonade.EntityHandler.entities[j].hasComponent(Lemonade.Components.collide))
			Lemonade.Collision.QuadTree.insert(Lemonade.Collision.getCollisionObject(Lemonade.EntityHandler.entities[j]));
	}
	for (var j = 0; j < Lemonade.EntityHandler.entities.length; j++) {
		if (Lemonade.EntityHandler.entities[j] === undefined || Lemonade.EntityHandler.entities[j] === null)
			continue;
		// Here we check to see if the entity should be killed. If so, kill it and move on.
		if (Lemonade.EntityHandler.entities[j].hasComponent(Lemonade.Components.kill) || Lemonade.EntityHandler.entities[j] === undefined || Lemonade.EntityHandler.entities[j] === null) {
			Lemonade.removeEntity(Lemonade.EntityHandler.entities[j].id);
			j--;
		} else {
			for (var cName in Lemonade.EntityHandler.entities[j].components) {
				if (Lemonade.isComponentDisabled(cName) === false && Lemonade.Systems.logicSystems[cName] !== undefined) {
					for(var i =0;i<Lemonade.Systems.logicSystems[cName].length;i++)
						Lemonade.Systems.logicSystems[cName][i].componentProcess(Lemonade.EntityHandler.entities[j]);
				}
			}
		}
	}

	Lemonade.keyboard.typed = "";

	// Lemonade.mouse.wheeldx = 0;
	// Lemonade.mouse.wheeldy = 0;
};
// Delta time not used yet.
Lemonade.renderLoop = function(dt) {
	Lemonade.FPS.updateFPS();
	if (Lemonade.FPS.isDelaying === true)
		return;

	// If we are using webgl, there is stuff we need to do.
	if (Lemonade.Graphics.threed.enabled === true) {
		gl.viewport(0.0, 0.0, gl.viewportWidth, gl.viewportHeight);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}

	if (Lemonade.loadingScreen !== undefined) {
		Lemonade.loadingScreen.render();
		return;
	}

	/*for (var j = 0; j < Lemonade.EntityHandler.entities.length; j++) {
	    if (Lemonade.EntityHandler.entities[j].hasComponent(Lemonade.Components.keeporder)) {
	        var index = Lemonade.EntityHandler.entities[j].get("keeporder", "order");
	        if (index >= 0)
	            Lemonade.bringEntityTo(Lemonade.EntityHandler.entities[j].id, index);
	        else
	            Lemonade.bringEntityToFront(Lemonade.EntityHandler.entities[j].id);
	        continue;
	    }
	}*/
	for (var j = 0; j < Lemonade.EntityHandler.entities.length; j++) {
		if (Lemonade.EntityHandler.entities[j] == undefined || Lemonade.EntityHandler.entities[j] == null)
			continue;
		for(var cName in Lemonade.EntityHandler.entities[j].components) {
			if (Lemonade.isComponentDisabled(cName) === false && Lemonade.Systems.renderSystems[cName] !== undefined)
				for(var i=0;i<Lemonade.Systems.renderSystems[cName].length;i++)
					Lemonade.Systems.renderSystems[cName][i].componentProcess(Lemonade.EntityHandler.entities[j]);
		}
	}
	loopRender();
};
Lemonade.tweenLoop = function(dt) {
	for (var i = 0; i < Lemonade.tweenList.tweens.length; i++) {
		var tween = Lemonade.tweenList.tweens[i];
		if (tween.timer === true)
			if (tween.startTime <= -1) {
				tween.startTime = Lemonade.Timer.getCurrentTime();
			}
		tween.doAction();
		if ((tween.timer === false && tween.curTicks >= tween.ticks) || (tween.timer === true && tween.ticks / Lemonade.Timer.timeInc <= Lemonade.Timer.getCurrentTime() - tween.startTime)) {
			Lemonade.tweenList.removeTween(tween.key, true);
			i--;
		}
	}
};

var loopRender = function() {};
/*
    The method that starts the gears in the engine.
    Some initialization should be called before this though.
    TODO Make a simplified initialize method for the engine
*/
/* Interval way
Lemonade.run = function() {
  Lemonade.Debug.log("Lemonade Engine V" + Lemonade.version, DEBUG_NOTICE);
  setInterval(function() {
    if (Lemonade.running === false)
      return;
    window.requestAnimationFrame(function() {
      if (Lemonade.autoClear === true && Lemonade.running === true)
        Lemonade.Canvas.context.clearRect(0, 0, Lemonade.Canvas.canvasWidth, Lemonade.Canvas.canvasHeight);
      Lemonade.renderLoop();
    });
    //console.log(Lemonade.Event.events.length);
  }, 1);
  setInterval(function(){
    if(Lemonade.running === false)
      return;
    Lemonade.logicLoop();
    loop();
  }, 1);
  setInterval(function(){
    if(Lemonade.running === false)
      return;
    Lemonade.tweenLoop();
  }, 1);
};*/
/*/ Timeout Way /*/
Lemonade.aa = function() {
	if (Lemonade.running === false)
		return;
	window.requestAnimationFrame(function() {
		if (Lemonade.autoClear === true && Lemonade.running === true && Lemonade.Graphics.threed.enabled === false)
			Lemonade.Canvas.context.clearRect(0, 0, Lemonade.Canvas.canvasWidth, Lemonade.Canvas.canvasHeight);
		Lemonade.renderLoop();
	});
	//console.log(Lemonade.Event.events.length);
	setTimeout(Lemonade.aa, 1);
};
Lemonade.bb = function() {
	if (Lemonade.running === false)
		return;
	Lemonade.logicLoop();
	loop();
	setTimeout(Lemonade.bb, 1);
};
Lemonade.cc = function() {
	if (Lemonade.running === false)
		return;
	Lemonade.tweenLoop();
	setTimeout(Lemonade.cc, 1);
};
Lemonade.dd = function() {
	Lemonade.Timer.incTime();
	setTimeout(Lemonade.dd, Lemonade.Timer.timeInc);
};
Lemonade.run = function() {
	Lemonade.Debug.log("Lemonade Engine V" + Lemonade.version, DEBUG_NOTICE);
	setTimeout(Lemonade.aa, 1);
	setTimeout(Lemonade.bb, 1);
	setTimeout(Lemonade.cc, 1);
	setTimeout(Lemonade.dd, Lemonade.Timer.timeInc);
};