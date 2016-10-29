import { Component} from "@angular/core";
require("nativescript-actioncable");

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public counter: number = 16;
    room: any;
    static URL : string = "ws://echo.websocket.org";

    constructor(){
        global.ActionCable.startDebugging();
        global.cable = global.ActionCable.createConsumer(AppComponent.URL);
        this.room = subscribe();
    }

    public get message(): string {
        if (this.counter > 0) {
            return this.counter + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }
    
    public onTap() {
        this.counter--;
        this.room.speak("Counters left : " + this.counter);
    }

    public onUnsubscribe(){
        console.log('should unsubscribe....');
    }
     
}


function subscribe(){

    var room = global.cable.subscriptions.create("MessagesChannel", {
        connected: ()=>{
            console.log("connected to MessageChannel");
        },
        diconnected: ()=>{
            console.log('diconnected from MessageChannel');
        },
        received: (data)=>{
            console.log("received data " + JSON.stringify(data));
        }
    })
    room.speak = (message)=> {
        return room.perform('speak', {message: message});
    }
    return room;
}
