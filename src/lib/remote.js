/**
 * Created by imac on 1/19/2017 AD.
 */
var socket;
var drag;
var syncInput = true;
var touchDrag;
var touchCoordinate = {};
var startTime = new Date().getTime();
var elementIndex = 0;
var htmlChanged = false;
var Remote = {};
var host = 'http://localhost:5100/usr_events';
var SlyOption = {};
var remoteContainerId = "remote-container";
(function () {
 
    Remote.startPublic = function () {
        window.isRemote = false;
        socket = io.connect(host);
        addMutationObserver();
    }

    Remote.startSubscript = function () {
        console.log("startSubscript")
        window.isRemote = true;
        socket = io.connect(host);
        $(`#${remoteContainerId}`).on("click", function(e){
            console.log(e)
            e.preventDefault()
        })

        startRemote();
        setTimeout(function () {
            getOrigin();
        }, 500)
    }


    Remote.stopPublic = function () {
        socket.disconnect();
        socket = null;
    }

    Remote.stopSubScript = function() {
        $(`#${remoteContainerId}`).unbind('click')
        socket.disconnect();
        socket = null;
    }

})();


function addMutationObserver() {

    startRemote();
    window.isRemote = false;
    var insertedNodes = [];
    var observer = new MutationObserver(function (mutations) {
        //
        // mutations.forEach(function (mutation) {
        //     for (var i = 0; i < mutation.addedNodes.length; i++)
        //         insertedNodes.push(mutation.addedNodes[i]);
        // })
        // console.log(insertedNodes);
        // if (!window.isRemote) {
        //     shareHTML();
        // }
        // var currentTime = new Date().getTime();
        // if( (currentTime - startTime) > 500 ){
        //     shareHTML();
        //     startTime = currentTime;
        //     htmlChanged = true;
        // }
        htmlChanged = true;
        setId();
    });

    if (!window.isRemote) {
        var config = {
            attributes: !0,
            childList: !0,
            characterData: !0,
            subtree: !0,
            attributeOldValue: !0

        };
        observer.observe(document, config);
    }

    setInterval(function () {
        if (htmlChanged){
            shareHTML();
            htmlChanged = false;
        }
    }, 1500)

}

function getOrigin() {
    if (socket != undefined ){
        socket.emit('html_sync_init');
    }

}

function startRemote() {

    socket.once("connect", function () {
        console.log("user event connect");
    });

// Listen to user input events (keyboard and mouse events)
    $(document).on('input', function (e) {
        if (syncInput ) {
            emitEvent('input message');
        }
        syncInput = true;

    }).on('mousedown', function (e) {
        drag = false;
        // console.log("mousedown: ("+event.pageX+", "+event.pageY+")");
        emitMouseEvent('mouse down');

    }).on('mousemove', function (e) {
        drag = true;
        // emitMouseEvent('mouse moved');
        // console.log("mousemove: ("+event.pageX+", "+event.pageY+")");

    }).on('mouseup', function (e) {
        // console.log("mouseup: ("+event.pageX+", "+event.pageY+")");
        if (drag == false) {
            emitMouseEvent('mouse clicked');
        }
        else if (drag == true) {
            emitMouseEvent('mouse dragged');
        }
    }).on('change', function (e) {
        // if (syncInput ) {
        //     emitEvent('input message');
        // }
        // syncInput = true;
    }).on('keydown', function (e) {
        var keyCode = e.keyCode;
        console.log(keyCode);
        if (keyCode == 9){// Tab
            emitKeyEvent(keyCode);
        }
    })

  function emitEvent(eventName) {

        var input_type = $(event.target).attr('type');
        switch (input_type){
            case "text":
            {
                $(event.target).attr("value", event.target.value);
            }
            break;
            case "radio":
            {

                // var model =  $(event.target).attr("ng-reflect-model");
                // var value =  $(event.target).attr("ng-reflect-value");
                // if (model == value){
                //     $(event.target).attr("checked", true);
                // }
                // else{
                //     $(event.target).attr("checked", false);
                // }
            }
                break;
            default:
                break;
        }

        socket.emit('usr_event', {
            eventName: eventName,
            domIdLen: event.target.id.length,
            domId: event.target.id,
            domVal: event.target.value
        });
    };

    function emitMouseEvent(eventName) {
        var data =   {
            eventName: eventName,
            domIdLen: event.target.id.length,
            domId: event.target.id,
            domVal: event.target.value,
            x: event.pageX,
            y: event.pageY
        }
        socket.emit('usr_event', data);


    };

    function emitKeyEvent(keyCode) {
        var data =   {
            eventName: "keydown",
            keyCode: keyCode,
            domId: event.target.id,
            domVal: event.target.value,
            x: event.pageX,
            y: event.pageY
        }
        socket.emit('usr_event', data);

    }

    document.addEventListener('touchstart', function (event) {
        // console.log("touch start");

        // touchDrag = false;

        if (event.targetTouches.length === 1) {
            touchDrag = false;
        }

    }, false);

    document.addEventListener('touchmove', function (event) {
        // console.log(event.targetTouches);

        // touchDrag = true;

        if (event.targetTouches.length === 1) {
            touchDrag = true;

            var touch = event.targetTouches[0];
            touchCoordinate.x = touch.pageX;
            touchCoordinate.y = touch.pageY;

            socket.emit('usr_event', {
                eventName: 'touch move',
                x: touchCoordinate.x,
                y: touchCoordinate.y
            });
        }

        // var touchesData = [];

        // for (var i = 0; i < event.targetTouches.length; i++) {
        //   var touch = event.targetTouches[i];
        //   touchData = {
        //     domId   : touch.target.id,
        //     domVal  : touch.target.value,
        //     x       : touch.pageX,
        //     y       : touch.pageY
        //   };
        //   touchesData.push(touchData);
        // }

        // socket.emit('touchmove', touchesData);

    }, false);

    document.addEventListener('touchend', function (event) {
        // console.log("touch end");

        if (touchDrag == false) {
            console.log("TOUCH TAP");

        }
        else if (touchDrag == true) {
            console.log("TOUCH DRAGGED");

            socket.emit('usr_event', {
                eventName: 'touch dragged',
                x: touchCoordinate.x,
                y: touchCoordinate.y
            });
        }

    }, false);


    socket.on("usr_event_receive", function (msg) {
        var str = JSON.stringify(msg);
        console.log(str);
        var eventName = msg.eventName;
        var id = msg.domId;
        var element = (id !== undefined && id !== "") ? document.getElementById(id) : null;
        switch (eventName) {
            case "mouse clicked": {
                console.log("click"+ id);
                console.log("element", element);

                if (element != null) {
                    $(element).trigger("click");
                }

                break;
            }
            case "mouse moved": {
                // if (element != null) {
                //     $(element).trigger("click");
                // }
                break;
            }
            case "input message": {
                if (element != null) {
                    $(element).val(msg.domVal);

                    syncInput = false;
                    var evt = document.createEvent('Event');
                    evt.initEvent('input', true, false);
                    element.dispatchEvent(evt)

                }
                break;
            }
            case "keydown": {
                var keyCode = msg.keyCode;

                if (keyCode != undefined && keyCode == 9){
                    // var press = jQuery.Event("keypress");
                    // press.ctrlKey = false;
                    // press.which = keyCode;
                    // $(window.document).trigger(press);
                    //
                    // if(!window.isRemote){
                    //     shareHTML();
                    // }
                }

                break;
            }
                break;
            default:
                break;
        }
    })

    socket.on("html_sync_receive", function (msg) {
        var path = window.location.href;
        if (path.indexOf("remote") !== -1) {
            console.log("html_sync_receive");
            console.log("start decode", new Date().toLocaleString());
            var decodedString = atob(msg.html);
            decodedString = decodeURI(decodedString);
            let remoteContainer = $(`#${remoteContainerId}`)
            remoteContainer.html(decodedString)
        
            if (msg.focusedId != undefined){

                $("#" + msg.focusedId).focus();
                var val = $("#" + msg.focusedId).val();
                $("#" + msg.focusedId).val(val);
            }
        }
    });

    socket.on("html_sync_init", function () {
        console.log("html_sync_init");
        shareHTML();
    });
}


function shareHTML() {
    if (socket != undefined ){
        console.log("sync");
        var html = takeSnapshot();
        var focusedId = $(document.activeElement).attr('id');
        socket.compress(true).emit('html_sync', {
            html:  html,
            SlyOption: SlyOption,
            focusedId: focusedId
        });
    }
}

function takeSnapshot() {

    var screenshot = document.documentElement.cloneNode(true);

    var inputs = screenshot.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++) {
        if (inputs[i].type=="checkbox" ) {
            if (inputs[i].checked){
                inputs[i].setAttribute("checked", inputs[i].checked);
            }
            else{
                inputs[i].removeAttribute("checked");
            }
        }
        else {
            if (inputs[i].type=="radio") {
                if (inputs[i].checked){
                    inputs[i].setAttribute("checked", inputs[i].checked);
                }
                else{
                    inputs[i].removeAttribute("checked");
                }
            }
            else {
                inputs[i].setAttribute("value", inputs[i].value);
            }
        }
    }
    var selects = screenshot.getElementsByTagName("select");
    for(var i = 0; i < selects.length; i++) {
        // console.log("SELECT "+selects[i].name+" = "+selects[i].value);
    }
    var txtarea = screenshot.getElementsByTagName("textarea");
    for(var i = 0; i < txtarea.length; i++) {
        inputs[i].setAttribute("value", inputs[i].value);
    }

    var div_user_online =  screenshot.getElementsByClassName('user-online')[0];
    if(div_user_online != undefined) {
        div_user_online.classList.remove('slideDown')
    }

    screenshot = encodeURI(screenshot.innerHTML.replace(/\n\s+|\n/g, ""));
    var encodedString = btoa(screenshot);
    return encodedString;
}

function setId() {

    $('body *:not(script, style, noscript)').each(function( index ) {

        var element = $(this);
        if (element.attr('id') === undefined){
            element.attr('id', elementIndex);
            elementIndex++;
        }
    });
}

