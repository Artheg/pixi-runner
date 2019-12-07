export class EventManager {
    private listeners: {[key: string]: Function[]} = {};

    constructor() {

    }

    public addListener = (event: string, listener: Function) => {
        let listeners = this.listeners[event];
        if (!listeners) {
            listeners = this.listeners[event] = [];
        }
        listeners.push(listener);
    }

    public emit = (event: string) => {
        const listeners = this.listeners[event];
        if (!listeners) {
            return;
        }
        listeners.forEach((l) => {
            l();
        })
    }

    public removeListener = (event: string, listener: Function) => {
        let listeners = this.listeners[event];
        if (!listeners) {
            return;
        }
        const toRemove = listeners.find((a) => {
            a === listener;
        });
        listeners.splice(listeners.indexOf(toRemove), 1);
    }
}