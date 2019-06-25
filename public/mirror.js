/**
 * @file Mirror Library for the Lemonade Engine. Requires Lemonade main engine.
 * @author Michael George
 * @version 5.26.2019
 */
/* global Lemonade, MIRROR_ADD_MIRROR, MIRROR_REMOVE_MIRROR, MIRROR_UPDATE_MIRROR, MIRROR_RESET_MIRROR, MIRROR_CHECK_MIRROR, MIRROR_LIST_MIRROR, MIRROR_GET_MIRROR, MIRROR_REMOVED, MIRROR_REQUEST_MIRROR, MIRROR_REMOVE_ALL, 
	MIRROR_CONFIRM_ALL, MIRROR_STATUS, MIRROR_ADD_MAP, MIRROR_CREATE_ROOM, MIRROR_JOIN_ROOM, MIRROR_VERIFY_ROOM, MIRROR_ID_NAME, MIRROR_SERVER_AUTHORITATIVE, MIRROR_IGNORE_FIELD,
	MIRROR_ROOM_NONE, MIRROR_AUTO_REPAIR, MIRROR_BROKEN_ERROR, MIRROR_SERVER, MIRROR_CLIENT, MIRROR_CHECK_FREQUENCY, DEBUG_MIN*/
/**
 * @global @desc Mirror command to add a mirror to either the client or server.
 */
MIRROR_ADD_MIRROR = 'add_mirror';
/**
 * @global @constant
 * @desc Mirror command to remove a mirror to either the client or server.
 */
MIRROR_REMOVE_MIRROR = 'remove_mirror';
/**
 * @global @constant
 * @desc Mirror command to update a mirror on either the client or server.
 */
MIRROR_UPDATE_MIRROR = 'update_mirror';
/**
 * @global @constant
 * @desc Mirror command to reset a mirror to have the needed values on the client or server.
 */
MIRROR_RESET_MIRROR = 'reset_mirror';
/**
 * @global @constant
 * @desc Mirror command to check a mirror's integrity on the client and server.
 */
MIRROR_CHECK_MIRROR = 'check_mirror';
/**
 * @global @constant
 * @desc Mirror command to tell the server to output to the console, a list of mirrors for the client connected.
 */
MIRROR_LIST_MIRROR = 'list_mirrors';
/**
 * @global @constant
 * @desc Mirror command to tell the server to send all mirrors to the client. Can be used on server as well.
 */
MIRROR_GET_MIRROR = 'get_mirrors';
/**
 * @global @constant
 * @desc Mirror command to ask the client / server if a mirror has been removed.
 */
MIRROR_REMOVED = 'removed_mirror';
/**
 * @global @constant
 * @desc Mirror command to request the recipient to send the requested mirror.
 */
MIRROR_REQUEST_MIRROR = 'request_mirror';
/**
 * @global @constant
 * @desc Mirror command to remove all mirrors on either the client or server.
 */
MIRROR_REMOVE_ALL = 'remove_all_mirror';
/**
 * @global @constant
 * @desc Mirror command to send and confirm the object keys of all mirrors on client / server
 */
MIRROR_CONFIRM_ALL = 'confirm_all_mirror';
/**
 * @global @constant
 * @desc Mirror command to send a console log command. 
 */
MIRROR_STATUS = 'status_update';

/**
 * @global @constant
 * @desc Mirror command to add a mirror map. 
 */
MIRROR_ADD_MAP = 'add_map_mirror';

/**
 * @global @constant
 * @desc Mirror command to create a mirror room
 */
MIRROR_CREATE_ROOM = 'create_mirror_room';
/**
 * @global @constant
 * @desc Mirror command to join a mirror room. 
 */
MIRROR_JOIN_ROOM = 'join_mirror_room';
/**
 * @global @constant
 * @desc Mirror command to verify the integrity of mirrors.
 */
MIRROR_VERIFY_ROOM = 'verify_mirror_room';

/**
 * @global @constant
 * @desc Constant for the field name where the mirror ID is stored on an object.
 */
MIRROR_ID_NAME = '_mirror_id';
/**
 * @global @constant
 * @desc Constant for where the determination of if the object is controlled by the server.
 */
MIRROR_SERVER_AUTHORITATIVE = '_mirror_authoritative';
/**
 * @global @constant
 * @desc Constant field name for the location of any ignored Mirror values.
 */
MIRROR_IGNORE_FIELD = '_mirror_ignore';

/**
 * @global @constant
 * @desc Constant used to describe a room that does not exist. (Rather than undefined or null)
 */
MIRROR_ROOM_NONE = 'no_room';

/**
 * @global
 * @desc Whether or not the Mirror should automatically repair broken mirrors.
 */
MIRROR_AUTO_REPAIR = true;
/**
 * @global @constant
 * @desc Error message if the mirror is not to be Auto repaired.
 */
MIRROR_BROKEN_ERROR = 'Mirror has been broken. Auto Repair disabled!';

/**
 * @global @constant
 * @desc Constant to declare connection type as Server.
 */
MIRROR_SERVER = 'server';
/**
 * @global @constant
 * @desc Constant to declare the connection type as a Client.
 */
MIRROR_CLIENT = 'client';

/**
 * @global
 * @desc How often the client / server should check integrity of mirrors.
 */
MIRROR_CHECK_FREQUENCY = 2500;

/**
 * @global
 * @desc The Main Mirror object, used for all of Mirror functions
 * @namespace Mirror
 */
Lemonade.Mirror = {};

/**
 * @type {?object}
 * @default undefined
 * @desc Used to keep track of the current active connection. Primarily used on Client side.
 */
Lemonade.Mirror.activeConnection = undefined;

/**
 * @type {?string}
 * @default undefined
 * @desc Keep track of the current Mirror room we are in. Used on Client side.
 */
Lemonade.Mirror.currentRoom = undefined;

/**
 * @type {string}
 * @default MIRROR_CLIENT
 * @desc This keeps track of our current connection type. Whether server, client or other.
 */
Lemonade.Mirror.connectionType = MIRROR_CLIENT;

/**
 * @type {boolean}
 * @default true
 * @desc Whether or not to allow the Client Side to be able to update mirrors received from server.
 */
Lemonade.Mirror.allowClientUpdate = true;
/**
 * @type {boolean}
 * @default false
 * @desc Whether or not to allow the Server to update Mirrors received from client.
 */
Lemonade.Mirror.allowServerUpdate = false;
/**
 * @type {boolean}
 * @default false
 * @desc Whether or not to allow the Client to initiate create room requests.
 */
Lemonade.Mirror.allowClientCreateRoom = false;
/**
 * @type {boolean}
 * @default false
 * @desc Whether or not to allow the Client to join a room chosen from their end. Disabled to prevent affecting undesired variables.
 */
Lemonade.Mirror.allowClientJoinRoom = false;
/**
 * @type {boolean}
 * @default false
 * @desc Whether or not to allow the Client to add mirrors to the server from their end.
 */
Lemonade.Mirror.allowClientAddMirror = false;

/**
 * @type {number}
 * @default DEBUG_MIN
 * @desc The debug log level that should be used by the Mirror functions.
 */
Lemonade.Mirror.debugLogLevel = DEBUG_MIN;

/**
 * @type {object}
 * @default {}
 * @desc Keeps a hold of current mirrored objects. On server, this is the list for the NO_ROOM Mirrors.
 */
Lemonade.Mirror.mirroredObjects = {};

/**
 * @type {object}
 * @default {}
 * @desc Keeps track of rooms, as wel as the mirrors that exist within the room (and clients)
 */
Lemonade.Mirror.rooms = {};

/**
 * @type {object}
 * @default {}
 * @desc Keeps a handle on the maps within the Mirror library. Maps will lead to an array, to allow multiple maps.
 * @example
 * { MIRROR_ID: [ {ext: 'window.variableName', func: false } ] }
 */
Lemonade.Mirror.maps = {};

/**
 * @type {object}
 * @default [MIRROR_ID_NAME]
 * @desc Allows for variables to be ignored when computing a hash. The variable will still be sent to client / server however.
 */
Lemonade.Mirror.ignoredVariables = [MIRROR_ID_NAME];

/**
 * @desc Determines if the supplied mirror object, is server authoritative
 * @param {object} object - A mirror object to check against.
 * @returns {boolean} If the server is authoritative
 */
Lemonade.Mirror.isAuthoritative = function(object) {
	// If object is undefined, will obviously not be authoritative with server.
	if(object === undefined)
		return false;
	// If the server authoritative value is undefined, not authoritative.
	if(object[MIRROR_SERVER_AUTHORITATIVE] === undefined)
		return false;
	// If the value IS defined, but false, then not authoritative.
	if(object[MIRROR_SERVER_AUTHORITATIVE] === false)
		return false;
	// All fails, means we are authoritative.
	return true;
};

/**
 * @desc Connects to the hostname supplied. The Server value is for if we are the server, which should be the Client Socket. And add the necessary listeners.
 * @param {string} hostname - The hostname of the server we are connecting to. Including Port.
 * @param {object} server - If we are server, then this should be the Client Socket.
 * @memberOf Mirror
 * @namespace Mirror.Connection
 */
Lemonade.Mirror.connect = function(hostname, server){
	// First check to see that our active connection has not been defined.
	// If it has, and the server has not sent a client socket to this function, log it.
	if(Lemonade.Mirror.activeConnection !== undefined && server === undefined) {
		// Log that we are already connected to a server.
		Lemonade.Debug.log('Already connected to a server! Disconnect first.', Lemonade.Mirror.debugLogLevel);
		return;
	}
	// Check to see if server has been defined. If it has, let's set the active Connection to it.
	if(server !== undefined)
		// Set our active connection to the client socket provided.
		Lemonade.Mirror.activeConnection = server;
	else {
		// Set the activeConnection to the result of connecting to the server of hostname.
		Lemonade.Mirror.activeConnection = io.connect(hostname, {transports: ['websocket'], upgrade: false});
	}
	
	/**
	 * @desc Here we specify what to do when we are told to add a mirror from the other end.
	 * @param {string} id - The ID of the mirror to be added.
	 * @param {object} object - The mirror object itself.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_ADD_MIRROR, function(id, object){
		// Let the log know we are adding a mirror, as well as the ID of the mirror.
		Lemonade.Debug.log('Adding mirror, ' + id, Lemonade.Mirror.debugLogLevel);
		// Now we run the method we have for handling the mirror message, and store result on if it was a good add or not.
		var good = Lemonade.Mirror.addMirrorMessage(id, object, this);
		// Log whether the mirror was added or not, depending on result of Good.
		Lemonade.Debug.log(good ? 'Mirror added.' : 'Did not add mirror.', Lemonade.Mirror.debugLogLevel);
	});

	/**
	 * @desc When the command to Remove a mirror is received.
	 * @param {string} id - The ID of the mirror that is to be removed.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_REMOVE_MIRROR, function(id){
		// Log to let know we are removing a mirror.
		Lemonade.Debug.log('Removing mirror, ' + id, Lemonade.Mirror.debugLogLevel);
		// Send to our dedicated function of handling mirrors to remove.
		Lemonade.Mirror.removeMirrorMessage(id, this);
		// Log to indicate the mirror had been removed.
		Lemonade.Debug.log('Mirror removed.', Lemonade.Mirror.debugLogLevel);
	});
	
	/**
	 * @desc What to do when we receive an add map command.
	 * @param {string} id - The ID of the mirror the map will apply to.
	 * @param {string} map - The location that the mirror will be mapped to.
	 * @param {boolean} isFunc - Whether or not, the map should be run as a function.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_ADD_MAP, function(id, map, isFunc){
		// Send the received information to our dedicated addMap function.
		Lemonade.Mirror.addMap(id, map, isFunc);
	});

	/**
	 * @desc What to do when we receive a command to update a mirror.
	 * @param {string} id - The ID of the mirror we will be updating.
	 * @param {object} toUpdate - The object containing variables we will update.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_UPDATE_MIRROR, function(id, toUpdate){
		// First, check to see that this action is permitted on Client / Server
		// If we are a client, and allowClientUpdate is false, then we return.
		if(Lemonade.Mirror.connectionType === MIRROR_CLIENT && !Lemonade.Mirror.allowClientUpdate)
			return;
		// If we are a server, and allowServerUpdate is false, then we return
		//		Check to see that the variable is authoritative as well
		if(Lemonade.Mirror.connectionType === MIRROR_SERVER && !Lemonade.Mirror.allowServerUpdate && 
			Lemonade.Mirror.isAuthoritative(Lemonade.Mirror.getMirrorList(this)[id]) !== false)
			return;
		// Indicate that we are updating the mirror
		Lemonade.Debug.log('Updating mirror, ' + id, Lemonade.Mirror.debugLogLevel);
		try{
			// Run our Update Mirror Message, and if fails go to Catch
			Lemonade.Mirror.updateMirrorMessage(id, toUpdate, this);
		} catch(e){
			// If we failed with the update, initiate a command to check if it has been removed.
			this.emit(MIRROR_REMOVED, id);
		}
		// Log that we have updated the mirror (whether successful or not)
		Lemonade.Debug.log('Mirror updated.', Lemonade.Mirror.debugLogLevel);
	});
	
	/**
	 * @desc Output a status message received from the other end to the console.
	 * @param {string} msg - Message to be displayed in the console.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_STATUS, function(msg){
		// Log at our default log level
		Lemonade.Debug.log(msg, Lemonade.Mirror.debugLogLevel);
	});
	
	/**
	 * @desc What to do when we receive a reset command.
	 * @param {string} id - The ID of the mirror to reset.
	 * @param {object} toReset - The object to compare against when resetting our Mirror.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_RESET_MIRROR, function(id, toReset){
		// Log that we are resetting the mirror.
		Lemonade.Debug.log('Resetting mirror, ' + id, Lemonade.Mirror.debugLogLevel);
		try{
			// Send to our dedicated reset mirror function
			Lemonade.Mirror.resetMirrorMessage(id, toReset, this);
		} catch(e){
			// If it fails, emit the command to check if the mirror has been removed?
			this.emit(MIRROR_REMOVED, id);
		}
		// Log that the mirror has been reset, regardless of results.
		Lemonade.Debug.log('Mirror reset.', Lemonade.Mirror.debugLogLevel);
	});
	
	/**
	 * @desc What to do when we receive the REMOVE_ALL command for mirrors.
	 * @param {boolean} readd - Whether or not we should initiate a get command to readd our mirrors.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_REMOVE_ALL, function(readd){
		// If we are the server, NEVER allow a remove all command to work.
		if(Lemonade.Mirror.connectionType === MIRROR_SERVER)
			return;
		// Indicate that we are removing all mirrors.
		Lemonade.Debug.log('Removing all mirrors..', Lemonade.Mirror.debugLogLevel);
		// Get a list of our Mirrors (will get in current Room)
		var mirList = Lemonade.Mirror.getMirrorList();
		// Loop through our mirrors and delete them.
		for(var key in mirList){
			delete mirList[key];
		}
		// Indicate that all mirrors have been removed successfully.
		Lemonade.Debug.log('All mirrors removed.', Lemonade.Mirror.debugLogLevel);
		
		// If we have set to readd, emit our GET_MIRROR command to tell the other end to send all the mirrors they have.
		if(readd === true) {
			this.emit(MIRROR_GET_MIRROR);
		}
	});
	
	/**
	 * @desc What to do when we receive a get all mirrors command.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_GET_MIRROR, function(){
		// First, get our current room, based on the Socket connection, and set our Room name to be NO_ROOM by default.
		var t_room = Lemonade.Mirror.getRoom(this), room_name = MIRROR_ROOM_NONE;
		// If the room we got is defined, replace the room name with the one we got.
		if(t_room !== undefined)
			room_name = t_room.roomName;
		// Log that a request has been received.
		Lemonade.Debug.log('Request for mirrors from room: ' + room_name, Lemonade.Mirror.debugLogLevel);
		// Loop through all of our Mirrors and emit them back to the other end.
		for(var key in Lemonade.Mirror.getMirrorList(this)) {
			this.emit(MIRROR_ADD_MIRROR, key, Lemonade.Mirror.applyIgnoreField(Lemonade.Mirror.getMirrorList(this)[key]));
		}
		// Log that all the mirrors have been sent.
		Lemonade.Debug.log('Sent mirrors.', Lemonade.Mirror.debugLogLevel);
	});

	/**
	 * @desc What to do when we receive a request for a mirror.
	 * @param {string} id - The ID of the mirror we are requesting.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_REQUEST_MIRROR, function(id){
		// Send the requested mirror.
		this.emit(MIRROR_RESET_MIRROR, id, Lemonade.Mirror.getMirrorList(this)[id]);
	});

	/**
	 * @desc What should be done when this side is asked if the Mirror has been removed.
	 * @param {string} id - The ID of the mirror we are looking for.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_REMOVED, function(id){
		// Only runs if we are the server.
		if(Lemonade.Mirror.connectionType === MIRROR_SERVER) {
			// If the mirror does exist, we issue an update mirror command with the mirror.
			if(Lemonade.Mirror.getMirrorList(this)[id] !== undefined) {
				this.emit(MIRROR_UPDATE_MIRROR, id, Lemonade.Mirror.getMirrorList(this)[id]);
			} else {
				// If the mirror does not exist, we issue a remove mirror command.
				this.emit(MIRROR_REMOVE_MIRROR, id);
			}
		}
	});

	/**
	 * @desc How it should be handled if we are confirming mirror lists.
	 * @param {object} expectedList - Mirror list either being sent for confirmation, or received.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_CONFIRM_ALL, function(expectedList){
		// If recieved by client, simply send back the list of our mirrors. Just the IDs should suffice.
		if(Lemonade.Mirror.connectionType === MIRROR_CLIENT) {
			// Get a current key list of mirros we have.
			var currentList = Object.keys(Lemonade.Mirror.getMirrorList(this));
			// Whether we should do a full reset or not.
			var toRemove = [];
			var toAdd = [];
			// If we are the server, we compare the lists
			// First compare to see if there is one on the server, that is not on the client.
			for(var k1 in currentList) { /// List of what we have currently on the server
				var found = false;
				for(var k2 in expectedList) {/// expectedList in this case, is the ones the client has.
					if(currentList[k1] == expectedList[k2]) {
						found = true;
						break;
					}
				}
				// If we don't find a key, we do a reset.
				if(!found) {
					toRemove.push(k1);
					break;
				}
			}
			// Now we check to see if there is one on the client, that is not on the server.
			for(var k1 in expectedList) {
				var found = false;
				for(var k2 in currentList) {
					if(currentList[k1] == expectedList[k2]) {
						found = true;
						break;
					}
				}
				// If we don't find a key, we do a reset.
				if(!found) {
					toAdd.push(k1);
					break;
				}
			}
			// If there was a key that was not found on either server or client, do a remove all, with true set, so that it readds as well.
			if(toAdd.length > 0){
				for(var k3 in toAdd) {
					this.emit(MIRROR_REQUEST_MIRROR, toAdd[k3]);
				}
			}
			if(toRemove.length > 0){
				for(var k3 in toRemove) {
					Lemonade.Mirror.removeMirrorMessage(toRemove[k3], this);
				}
			}
		} else if (Lemonade.Mirror.connectionType === MIRROR_SERVER) {
			this.emit(MIRROR_CONFIRM_ALL, Object.keys(Lemonade.Mirror.getMirrorList(this)));
		}
	});

	/**
	 * @desc How we should handle the Check Mirror command.
	 * @param {string} id - Mirror ID that we are checking.
	 * @param {string} checkHash - The generated Hash on the other end.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_CHECK_MIRROR, function(id, checkHash){
		// First we check if it is undefined here.
		if(Lemonade.Mirror.getMirrorList(this)[id] === undefined) {
			// If it doesn't exist, we send the remove command to the other end.
			this.emit(MIRROR_REMOVE_MIRROR, id);
			// Log that the mirror doesn't exist, and return.
			Lemonade.Debug.log('Mirror doesn\'t exist, ' + id + ', removing.', Lemonade.Mirror.debugLogLevel);
			return;
		}
		// Keep track of our checkMirrorMessage result in good.
		var good = Lemonade.Mirror.checkMirrorMessage(id, checkHash, this);
		// Check to see if the server is authoriative for the mirror.
		var author = Lemonade.Mirror.isAuthoritative(Lemonade.Mirror.getMirrorList(this)[id]);
		// If We are set to auto repair, and it is not good, and we are authoritative, repair it.
		if(MIRROR_AUTO_REPAIR && !good && author === true) {
			Lemonade.Debug.log('Repairing mirror...', Lemonade.Mirror.debugLogLevel);
			// Tell the other end to repaid.
			this.emit(MIRROR_RESET_MIRROR, id, Lemonade.Mirror.applyIgnoreField(Lemonade.Mirror.getMirrorList(this)[id]));
			Lemonade.Debug.log('Mirror repaired.', Lemonade.Mirror.debugLogLevel);
			// If it is not good, and we are not authoritative, send a request for the mirror.
		} else if(!good && author === false) {
			Lemonade.Debug.log('Fixing mirror...', Lemonade.Mirror.debugLogLevel);
			this.emit(MIRROR_REQUEST_MIRROR, id);
			Lemonade.Debug.log('Fix mirror requested.', Lemonade.Mirror.debugLogLevel);
		} else if(!good) {
			// Otherwise, we throw our broken mirror error.
			throw MIRROR_BROKEN_ERROR;
		}
	});

	/**
	 * @desc Mainly for the server, when listing mirrors.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_LIST_MIRROR, function(){
		// Get the current room of the one requesting, otherwise default to our NON ROOM
		var t_room = Lemonade.Mirror.getRoom(this), room_name = MIRROR_ROOM_NONE;
		if(t_room !== undefined)
			room_name = t_room.roomName;
		// Log that we are listing mirrors
		Lemonade.Debug.log('Listing mirrors in room: ' + room_name, Lemonade.Mirror.debugLogLevel);
		// Go through our mirror list and output each one as stringified JSON.
		for(var key in Lemonade.Mirror.getMirrorList(this)) {
			Lemonade.Debug.log('Mirror: ' + key + " - " + JSON.stringify(Lemonade.Mirror.getMirrorList(this)[key]), Lemonade.Mirror.debugLogLevel);
		}
	});

	/**
	 * @desc What to do when we receive the Create Room command.
	 * @param {string} roomName - Room that is to be created.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_CREATE_ROOM, function(roomName){
		// If we are the server, and we don't allow the client to create a room, return and do nothing.
		if(Lemonade.Mirror.allowClientCreateRoom === false && Lemonade.Mirror.connectionType === MIRROR_SERVER)
			return;
		// Otherwise, send to our dedicated CreateRoom function.
		Lemonade.Mirror.createRoom(roomName, this);
	});
	
	/**
	 * @desc How we should handle the JOIN ROOM command
	 * @param {string} roomName - Room that is to be joined.
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_JOIN_ROOM, function(roomName){
		// First check if we are a server, and if we allow the client to Join rooms on their own.
		if(Lemonade.Mirror.connectionType !== MIRROR_CLIENT && Lemonade.Mirror.allowClientJoinRoom === true 
				&& Lemonade.Mirror.createRoom(roomName, this) === false) {
			// Log that we are joining.
			Lemonade.Debug.log('Joining ' + roomName, Lemonade.Mirror.debugLogLevel);
			// Push our id onto the list of clients in the room.
			Lemonade.Mirror.rooms[roomName].clientList.push(this.id);
			return;
		}
		// If we are a client, and we received this, we proceed with joining the desired room.
		if(Lemonade.Mirror.connectionType === MIRROR_CLIENT) {
			// Log that we are joining.
			Lemonade.Debug.log('Joining ' + roomName, Lemonade.Mirror.debugLogLevel);
			// If the roomName is NONE ROOM, then we delete our currentRoom and leave it.
			if(roomName == MIRROR_ROOM_NONE) {
				Lemonade.Mirror.deleteRoom(Lemonade.Mirror.currentRoom);
				Lemonade.Mirror.currentRoom = undefined;
				return;
			}
			// If the roomName is undefined, as in, does not exist, we create the room.
			if(Lemonade.Mirror.rooms[roomName] === undefined)
				Lemonade.Mirror.createRoom(roomName, this);
			// Then we set our current room to be the roomname.
			Lemonade.Mirror.currentRoom = roomName;
			
			// We output a new getMirror command, to get the updated list for our new room.
			this.emit(MIRROR_GET_MIRROR);
		}
	});

	/** 
	 * @desc How we handle verifying with the server / client that the correct room has been set.
	 * @param {string} roomName - The room that we (the client) are in
	 * @memberOf Mirror.Connection
	 */
	Lemonade.Mirror.activeConnection.on(MIRROR_VERIFY_ROOM, function(roomName){
		// First we get the room of our local, to see where we should be.
		var t_room = Lemonade.Mirror.getRoom(this);
		// If the room is not defined
		if(t_room == undefined) {
			// If we are not in a defined room, however, the room we received is not proper, reset and join.
			if(roomName != MIRROR_ROOM_NONE){
				this.emit(MIRROR_STATUS, 'Not in the right room.');
				this.emit(MIRROR_JOIN_ROOM, MIRROR_ROOM_NONE);
			}
		} else {
			// If our received room is not the same as our local room (server) tell them to get in the right room.
			if(roomName != t_room.roomName) {
				this.emit(MIRROR_STATUS, 'Not in the right room.');
				this.emit(MIRROR_JOIN_ROOM, t_room.roomName);
			}
		}
		// If all fails, means we are already in the proper room.
	});
};

/**
 * @desc Quick easy method to send / emit a command to the other end. Relies on activeConnection being set.
 * @param {string} arguments - Any amount of arguments can be used, as they are applied to the emit function.
 * @memberOf Mirror
 */
Lemonade.Mirror.send = function() {
	// If our connection is defined, send whatever arguments we received.
	if(Lemonade.Mirror.activeConnection !== 'undefined') {
		Lemonade.Mirror.activeConnection.emit.apply(Lemonade.Mirror.activeConnection, arguments);
	}
};

/**
 * @dec Easily add a new emition listener to the active connection.
 * @param {string} command - String of the command to add a listener for.
 * @param {function} listener - Function that should be run as the listener, when the command is received.
 * @memberOf Mirror
 */
Lemonade.Mirror.addListener = function(command, listener) {
	if(Lemonade.Mirror.connectionType !== MIRROR_CLIENT || Lemonade.Mirror.activeConnection === undefined)
		return;
	Lemonade.Mirror.activeConnection.on(command, listener);
};

/**
 * @desc Generate a randomized ID. Used primarily for Mirror Ids.
 * @returns {string} String of the ID that was generated.
 * @memberOf Mirror
 */
Lemonade.Mirror.generateID = function(){
	return (+new Date()).toString(16) +
		(Math.random() * 1000000000 | 0).toString(16);
};

/**
 * @desc Get the mirror list for the client in it's current room.
 * @param {object} client - The active Connection with server / client. Expects socket.
 * @returns {object} A list of Mirrored objects in sockets room.
 * @memberOf Mirror
 */
Lemonade.Mirror.getMirrorList = function(client) {
	if(client === undefined || Lemonade.Mirror.connectionType === MIRROR_CLIENT) {
		return Lemonade.Mirror.getMirrorListByRoom(Lemonade.Mirror.currentRoom);
	}
	var t_room = Lemonade.Mirror.getRoom(client);
	if(t_room !== undefined)
		return t_room.mirroredObjects;
	return Lemonade.Mirror.mirroredObjects;
};

/**
 * @desc Get the mirror list based on the name of the room. Returns default mirrored objects if not found.
 * @param {string} room - Room name to get the mirrors of.
 * @returns {object} List of mirrored objects in room, or default mirrored objects.
 * @memberOf Mirror
 */
Lemonade.Mirror.getMirrorListByRoom = function(room) {
	if(room === undefined) {
		return Lemonade.Mirror.mirroredObjects;
	}
	var t_room = Lemonade.Mirror.rooms[room];
	if(t_room !== undefined)
		return t_room.mirroredObjects;
	return Lemonade.Mirror.mirroredObjects;
};

/**
 * @desc Add a map, that will be run on the update / addition of mirror with ID.
 * @param {string} id - Id of the mirror for the map to run.
 * @param {string} map - Dot notation of the object / function to use with the map.
 * @param {boolean} isFunc - Determines if the map should be run as a function or not.
 * @memberOf Mirror
 */
Lemonade.Mirror.addMap = function(id, map, isFunc){
	if(!Lemonade.Mirror.hasMap(id)) {
		Lemonade.Mirror.maps[id] = []
	}
	Lemonade.Mirror.maps[id].push({
		ext: map,
		func: isFunc
	});
};

/**
 * @desc Remove a map from the list of maps.
 * @param {string} id - Id of the mirror for which the map will be removed.
 * @memberOf Mirror
 */
Lemonade.Mirror.removeMap = function(id) {
	delete Lemonade.Mirror.maps[id];
};
/**
 * @desc Get if there is any maps existing for the mirror with ID.
 * @param {string} id - ID of the mirror to check for maps for.
 * @returns {boolean} If there is any maps existing for the mirror with ID.
 * @memberOf Mirror
 */
Lemonade.Mirror.hasMap = function(id){
	return typeof Lemonade.Mirror.maps[id] !== 'undefined';
};

/**
 * @desc Function to apply maps, if there are any, on a Mirror object.
 * @param {string} id - ID of the mirror to run maps on.
 * @returns {boolean} False if there are no maps, or no window object.
 * @memberOf Mirror
 */
Lemonade.Mirror.applyMap = function(id) {
	// First check that a map for this id exists, and the window object exists
	if(typeof Lemonade.Mirror.maps[id] === 'undefined' || typeof window === 'undefined')
		return false;
	// Now, apply the map(s)
	for(var l in Lemonade.Mirror.maps[id]) {
		try{
			if(Lemonade.Mirror.maps[id][l].func === true)
				Lemonade.Data.retrieveWithExtension(window, Lemonade.Mirror.maps[id][l].ext)(Lemonade.Mirror.getMirrorList()[id]);
			else
				Lemonade.Data.setWithExtension(window, Lemonade.Mirror.maps[id][l].ext, Lemonade.Mirror.getMirrorList()[id]);
		} catch (e){
			console.log('Could not apply map for : ' + id);
		}
	}
};

/**
 * @desc Get the room of the client connected, based on socket ID.
 * @param {object} client - Socket object of the connection.
 * @returns {object} Room object based on socket client.
 * @memberOf Mirror
 */
Lemonade.Mirror.getRoom = function(client) {
	for(var roomKey in Lemonade.Mirror.rooms) {
		for(var clientKey in Lemonade.Mirror.rooms[roomKey].clientList) {
			if(client.id === Lemonade.Mirror.rooms[roomKey].clientList[clientKey])
				return Lemonade.Mirror.rooms[roomKey];
		}
	}
	return undefined;
};

/**
 * @desc Create the room if it doesn't exist, then join it.
 * @param {string} roomName - Room that will be joined.
 * @param {object} client - Socket object for the client.
 * @memberOf Mirror
 */
Lemonade.Mirror.joinRoom = function(roomName, client) {
	Lemonade.Mirror.createRoom(roomName, client);
	client.emit(MIRROR_JOIN_ROOM, roomName);
	if(Lemonade.Mirror.connectionType === MIRROR_CLIENT)
		Lemonade.Mirror.currentRoom = roomName;
};

/**
 * @desc Leave the room if it exists.
 * @param {string} roomName - Room that is to be left.
 * @param {object} client - Socket object for the client.
 * @returns {boolean} Whether the room was left properly or not.
 * @memberOf Mirror
 */
Lemonade.Mirror.leaveRoom = function(roomName, client) {
	if(client === undefined || client.id === undefined)
		return false;
	if(Lemonade.Mirror.rooms[roomName] !== undefined) {
		// Find and remove the client from the list in room
		for(var l in Lemonade.Mirror.rooms[roomName].clientList) {
			if(Lemonade.Mirror.rooms[roomName].clientList[l] == client.id) {
				// Remove the client from the room
				Lemonade.Mirror.rooms[roomName].clientList.splice(l, 1);
				return true;
			}
		}
	}
	return false;
};

/**
 * @desc Create a room if it does not exist. Or join the room for server.
 * @param {string} roomName - Room name that is to be created.
 * @param {object} client - Socket object for the client connection.
 * @return {boolean} False if there was an issue creating the room.
 * @memberOf Mirror
 */
Lemonade.Mirror.createRoom = function(roomName, client) {
	Lemonade.Debug.log('Room creating... ' + roomName, 10);
	if(client === undefined || client.id === undefined)
		return false;
	if(Lemonade.Mirror.rooms[roomName] !== undefined) {
		// Room already exists. If we are a server, we just add the client.
		if(Lemonade.Mirror.connectionType === MIRROR_SERVER) {
			Lemonade.Mirror.rooms[roomName].clientList.push(client.id);
			return true;
		}
		return false;
	}
	Lemonade.Mirror.rooms[roomName] = {
		roomName: roomName,
		mirroredObjects: {},
		clientList: []
	};
	Lemonade.Mirror.rooms[roomName].clientList.push(client.id);
	Lemonade.Debug.log('Room created!', 10);
};

/**
 * @desc Delete the room and mirrors in the room
 * @param {string} roomName - Room that is to be deleted.
 * @returns {boolean} if the deletion was successful.
 * @memberOf Mirror
 */
Lemonade.Mirror.deleteRoom = function(roomName){
	if(roomName === undefined)
		return false;
	delete Lemonade.Mirror.rooms[roomName];
	if(Lemonade.Mirror.connectionType === MIRROR_CLIENT) {
		Lemonade.Mirror.currentRoom = undefined;
		Lemonade.Mirror.activeConnection.emit(MIRROR_GET_MIRROR);
	}
	return true;
};

/**
 * @desc Add a mirror to the mirror list and send to server (if we are able to)
 * @param {object} toMirror - Object that will be mirrored.
 * @param {object} client - Socket object for the client.
 * @param {boolean} extraClient - If this is the server adding an object, should be false.
 * @memberOf Mirror
 */
Lemonade.Mirror.addMirror = function(toMirror, client, extraClient) {
	var t_id = Lemonade.Mirror.generateID();
	toMirror[MIRROR_ID_NAME] = t_id;

	Lemonade.Mirror.addMirrorMessage(t_id, toMirror, client, extraClient);

	if(Lemonade.Mirror.activeConnection !== undefined && Lemonade.Mirror.connectionType === MIRROR_CLIENT)
		Lemonade.Mirror.activeConnection.emit(MIRROR_ADD_MIRROR, t_id, toMirror);
	else if (client !== undefined && client.emit !== undefined) {
		client.emit(MIRROR_ADD_MIRROR, t_id, Lemonade.Mirror.applyIgnoreField(toMirror));
	}
};

/**
 * @desc Update a mirror object with the values specified.
 * @param {string} id - ID of the mirror that is to be updated.
 * @param {object} mirrorUpdate - Object that contains values of what to be updated.
 * @param {object} client - Socket object for the client connection.
 * @memberOf Mirror
 */
Lemonade.Mirror.updateMirror = function(id, mirrorUpdate, client) {
	if(Lemonade.Mirror.activeConnection !== undefined && Lemonade.Mirror.connectionType === MIRROR_CLIENT)
		Lemonade.Mirror.activeConnection.emit(MIRROR_UPDATE_MIRROR, id, mirrorUpdate);
	else if (client !== undefined) {
		client.emit(MIRROR_UPDATE_MIRROR, id, Lemonade.Mirror.applyIgnoreField(mirrorUpdate));
	}
}

/**
 * @desc Sends a check mirror message to server, for validating the object.
 * @param {string} id - ID of the mirror to be checked
 * @param {object} client - Socket object of the connection.
 * @memberOf Mirror
 */
Lemonade.Mirror.checkMirror = function(id, client) {
	if(Lemonade.Mirror.connectionType === MIRROR_CLIENT)
		Lemonade.Mirror.activeConnection.emit(MIRROR_CHECK_MIRROR, id, Lemonade.Mirror.generateHash(Lemonade.Mirror.getMirrorList(client)[id]));
	else
		client.emit(MIRROR_CHECK_MIRROR, id, Lemonade.Mirror.generateHash(Lemonade.Mirror.getMirrorList(client)[id]));
};

/**
 * @desc Remove a mirror from mirror list by ID
 * @param {string} id - ID of the mirror to be removed.
 * @param {object} client - Socket object of the connection.
 * @memberOf Mirror
 */
Lemonade.Mirror.removeMirror = function(id, client){
	Lemonade.Mirror.removeMirrorMessage(id);
	if(Lemonade.Mirror.connectionType === MIRROR_CLIENT)
		Lemonade.Mirror.activeConnection.emit(MIRROR_REMOVE_MIRROR, id);
	else
		client.emit(MIRROR_REMOVE_MIRROR, id);
};
/**
 * @desc Returns if the passed hash matchs the local generated hash of the mirror object.
 * @param {string} id - Mirror ID to be checked against
 * @param {string} hash - Generated MD5 hash of the object.
 * @param {object} client - Socket object of the client connection
 * @returns {boolean} If the hash passed, matched the local generated hash of the mirror object.
 * @memberOf Mirror
 */
Lemonade.Mirror.checkMirrorMessage = function(id, hash, client){
	return Lemonade.Mirror.generateHash(Lemonade.Mirror.getMirrorList(client)[id]) == hash;
};

/**
 * @desc Generate an MD5 hash based on all values in the object. Minus ignoredVariables.
 * @param {object} object - Object to generate a Hash on.
 * @returns {string} MD5 hash of the object.
 * @memberOf Mirror
 */
Lemonade.Mirror.generateHash = function(object){
	var endStr = '';
	for(var key in object){
		var cont = true;
		// Check against global ignoredVariables
		for (var sk in Lemonade.Mirror.ignoredVariables) {
			if(key === Lemonade.Mirror.ignoredVariables[sk]) {
				cont = false;
				break;
			}
		}
		// Check to see if there are any to ignore specific to object
		if(typeof object[MIRROR_IGNORE_FIELD] !== 'undefined') {
			for (var sk in object[MIRROR_IGNORE_FIELD]) {
				if(key == object[MIRROR_IGNORE_FIELD][sk] || key == MIRROR_IGNORE_FIELD) {
					cont = false;
					break;
				}
			}
		}
		if(cont !== false)
			endStr += object[key];
	}
	return Lemonade.MD5(endStr);
};
/**
 * @desc Add an ignore field to an object. This will not be used with hashes, or passed when adding / updating.
 * @param {object} object - Object that will have the ignoreField added to.
 * @param {string} ignoreField - String name of the field to be ignored.
 * @returns {boolean} If the field was added properly.
 * @memberOf Mirror
 */
Lemonade.Mirror.addIgnoreField = function(object, ignoreField) {
	if(typeof object[MIRROR_IGNORE_FIELD] === 'undefined')
		object[MIRROR_IGNORE_FIELD] = [];
	object[MIRROR_IGNORE_FIELD].push(ignoreField);
	return true;
};
/**
 * @desc Get the resulting object with the IgnoredFields deleted from it.
 * @param {object} object - Object to clean up with ignoredFields
 * @returns {object} Object without the ignored fields.
 * @memberOf Mirror
 */
Lemonade.Mirror.applyIgnoreField = function(object) {
	if(typeof object[MIRROR_IGNORE_FIELD] === 'undefined')
		return object;
	var t_obj = Lemonade.clone(object);
	for (var sk in object[MIRROR_IGNORE_FIELD]) {
		if(typeof t_obj[object[MIRROR_IGNORE_FIELD][sk]] !== 'undefined') {
			delete t_obj[object[MIRROR_IGNORE_FIELD][sk]];
		}
	}
	// Get rid of the ignored list as well. To prevent client seeing what is blocked (reduce hack attempts?)
	delete t_obj[MIRROR_IGNORE_FIELD];

	return t_obj;
};
/**
 * @desc Function to add a mirror to the local storage.
 * @param {string} id - ID of the new mirror to add.
 * @param {object} toMirror - Object to be mirrored.
 * @param {object} client - Socket object of the client connection.
 * @param {object} extraClient - Socket object if we are adding a mirror object on server.
 * @returns {boolean} If the object was added successfully.
 * @memberOf Mirror
 */
Lemonade.Mirror.addMirrorMessage = function(id, toMirror, client, extraClient) {
	if(Lemonade.Mirror.allowClientAddMirror === false && Lemonade.Mirror.connectionType === MIRROR_SERVER && client !== false)
		return false;
	if(extraClient !== undefined)
		Lemonade.Mirror.getMirrorList(extraClient)[id] = toMirror;
	else
		Lemonade.Mirror.getMirrorList(client)[id] = toMirror;
	if(Lemonade.Mirror.hasMap(id)) {
		Lemonade.Mirror.applyMap(id);
	}
	return true;
};
/**
 * @desc Remove a mirror from local storage.
 * @param {string} id - ID of the mirror to be removed.
 * @param {object} client - Socket object of the client (used to get room mirror list)
 * @returns {boolean} If the mirror was removed successfully.
 * @memberOf Mirror
 */
Lemonade.Mirror.removeMirrorMessage = function(id, client) {
	Lemonade.Mirror.getMirrorList(client)[id] = undefined;
	delete Lemonade.Mirror.getMirrorList(client)[id];
	if(Lemonade.Mirror.hasMap(id)) {
		Lemonade.Mirror.applyMap(id);
	}
	return true;
};
/**
 * @desc Update a mirror (message from server)
 * @param {string} id - Id of the mirror to update.
 * @param {object} toUpdate - Object containing values to be updated.
 * @param {object} client - Socket object of the client connection.
 * @returns {boolean} if the mirror has been updated successfully.
 * @memberOf Mirror
 */
Lemonade.Mirror.updateMirrorMessage = function(id, toUpdate, client){
	for(var key in toUpdate) {
		Lemonade.Mirror.getMirrorList(client)[id][key] = toUpdate[key];
	}
	if(Lemonade.Mirror.hasMap(id)) {
		Lemonade.Mirror.applyMap(id);
	}
	return true;
};
/**
 * @desc Similar to update function, but will reset all values, and remove ones that don't exist.
 * @param {string} id - ID of the mirror to reset.
 * @param {object} toReset - Object to compare the mirror to.
 * @param {object} client - Socket object of the client connection.
 * @returns {boolean} if the mirror was reset properly.
 * @memberOf Mirror
 */
Lemonade.Mirror.resetMirrorMessage = function(id, toReset, client){
	for(var key in toReset) {
		Lemonade.Mirror.getMirrorList(client)[id][key] = toReset[key];
	}
	for(var key in Lemonade.Mirror.getMirrorList(client)[id]){
		if(toReset[key] === undefined) {
			delete Lemonade.Mirror.getMirrorList(client)[id][key]
		}
	}
	if(Lemonade.Mirror.hasMap(id)) {
		Lemonade.Mirror.applyMap(id);
	}
	return true;
};

/**
 * @global
 * @desc Server object to contain server related functions.
 * @namespace Mirror.Server
 */
Lemonade.Mirror.Server = {};
/**
 * @desc List of clients connected to server and some basic information.
 * @type {object}
 */
Lemonade.Mirror.Server.clients = {};
/**
 * @desc Object to contain serverinfo that should be synced with client.
 * @type {object}
 */
Lemonade.Mirror.Server.serverInfo = {connected: 0, _mirror_authoritative: true};
/**
 * @desc Basic initialization for the Mirror server.
 * @returns {boolean} If variables were set properly.
 */
Lemonade.Mirror.Server.init = function(){
	// Tell the Mirror Library that we are the server.
	Lemonade.Mirror.connectionType = 'server';
	// Add the server info to our mirrors to copy to clients.
	Lemonade.Mirror.Server.addMirror(serverInfo, undefined);
	
	return true;
};
/**
 * @desc Add a client to the servers client list.
 * @returns {object} Resulting client object.
 */
Lemonade.Mirror.Server.addClient = function(client) {
	// Add our default mirror commands
	Lemonade.Mirror.connect('', client);
	
	// If we disconnect, remove the client socket reference. And update Serverinfo.
	client.on('disconnect', function () {
		console.log('client disconnect...', client.id);
		
		delete Lemonade.Mirror.Server.clients[client.id];
		
		Lemonade.Mirror.Server.serverInfo.connected --;
	});
	
	// If we receive an error, let us know.
	client.on('error', function (err) {
		console.log('received error from client:', client.id);
		console.log(err);
	});
	
	
	// Tell the client they will need to reupdate their mirrors.
	client.emit(MIRROR_REMOVE_ALL, true);
	
	// Increment our connected clients.
	Lemonade.Mirror.Server.serverInfo.connected ++;
	
	Lemonade.Mirror.Server.clients[client.id] = {
		socket: client,
		id: client.id,
		room: undefined
	};
	
	return Lemonade.Mirror.Server.clients[client.id];
};

/**
 * @desc Server function for adding a mirror. Will send to all connected clients.
 * @param {object} mirror - Object to add as a mirror.
 * @param {object} client - Socket object of the client to add mirror for.
 * @param {boolean} authoritative - If the server should be authoritative of the mirror object or not.
 * @memberOf Mirror.Server
 */
Lemonade.Mirror.Server.addMirror = function (mirror, client, authoritative){
	if(authoritative === true || authoritative === undefined) {
		mirror[MIRROR_SERVER_AUTHORITATIVE] = true;
	}
	Lemonade.Mirror.addMirror(mirror, false, client);
	var clients = Lemonade.Mirror.Server.getClients(Lemonade.Mirror.getRoom(client));
	for(var cl in clients) {
		console.log('Adding for ' + cl + ", " + mirror[MIRROR_ID_NAME] + " : " + JSON.stringify(mirror));
		clients[cl].emit(MIRROR_ADD_MIRROR, mirror[MIRROR_ID_NAME], mirror);
	}
};


/**
 * @desc Get list of clients connected in room.
 * @param {string} room - Roomname to get clients in.
 * @returns {object} List of clients that are connected in room.
 * @memberOf Mirror.Server
 */
Lemonade.Mirror.Server.getClients = function (room){
	if(typeof io === 'undefined')
		return [];
	if(room === undefined) {
		return io.of('/').connected;
	}
	var ret = [];
	for(var client in room.clientList){
		for(var cl in io.of('/').connected){
			if(io.of('/').connected[cl].id === room.clientList[client])
				ret.push(io.of('/').connected[cl]);
		}
	}
	return ret;
};
/**
 * @desc Interval to ensure mirrors on server and client are the same.
 */
Lemonade.Mirror.checkInterval = setInterval(function(){
	if(Lemonade.Mirror.connectionType !== MIRROR_CLIENT || Lemonade.Mirror.activeConnection === undefined)
		return;
	for(var id in Lemonade.Mirror.getMirrorListByRoom(Lemonade.Mirror.currentRoom)){
		if(Lemonade.Mirror.getMirrorListByRoom(Lemonade.Mirror.currentRoom)[id] !== undefined)
			Lemonade.Mirror.checkMirror(id);
	}
	var curRoom = Lemonade.Mirror.currentRoom;
	if(curRoom === undefined)
		curRoom = MIRROR_ROOM_NONE;
	Lemonade.Mirror.activeConnection.emit(MIRROR_VERIFY_ROOM, curRoom);
	
	Lemonade.Mirror.activeConnection.emit(MIRROR_CONFIRM_ALL);
}, MIRROR_CHECK_FREQUENCY);

