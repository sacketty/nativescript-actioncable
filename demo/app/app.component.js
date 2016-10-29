"use strict";
var core_1 = require("@angular/core");
require("nativescript-actioncable");
var AppComponent = (function () {
    function AppComponent() {
        this.counter = 16;
        global.ActionCable.startDebugging();
        global.cable = global.ActionCable.createConsumer(AppComponent.URL);
        this.room = subscribe();
    }
    Object.defineProperty(AppComponent.prototype, "message", {
        get: function () {
            if (this.counter > 0) {
                return this.counter + " taps left";
            }
            else {
                return "Hoorraaay! \nYou are ready to start building!";
            }
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.onTap = function () {
        this.counter--;
        this.room.speak("Counters left : " + this.counter);
    };
    AppComponent.prototype.onUnsubscribe = function () {
        //console.log('should unsubscribe....');
        global.cable.subscriptions.remove(this.room);
        delete (this.room);
    };
    //static URL : string = "ws://echo.websocket.org";
    AppComponent.URL = "wss://kash-abriva.ngrok.io/cable";
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
function subscribe() {
    var room = global.cable.subscriptions.create("MessagesChannel", {
        connected: function () {
            console.log("connected to MessageChannel");
        },
        diconnected: function () {
            console.log('diconnected from MessageChannel');
        },
        received: function (data) {
            console.log("received data " + JSON.stringify(data));
        }
    });
    room.speak = function (message) {
        return room.perform('speak', { message: message });
    };
    return room;
}
//# sourceMappingURL=app.component.js.map