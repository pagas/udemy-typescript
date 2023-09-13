import {Project} from "./types/ProjectTypes";

type StateListener<T> = (items:T[]) => void
export default class BaseState<T> {
    protected listeners: StateListener<T>[] = [];
    addListener(listenerFn:StateListener<T>) {
        this.listeners.push(listenerFn);
    }
}