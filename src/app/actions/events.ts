import { Event } from "../models";

export enum ActionType {
    GET = '[events] GET',
    FIND = '[events] FIND'
}

export interface GetAction { type: ActionType.GET, payload: Event }
export interface FindAction { type: ActionType.FIND, payload: Array<Event> }

export function get(id: number): GetAction {
    return {
        type: ActionType.GET,
        payload: {
            id: 0,
            code: '',
            name: '',
            teams: []
        }
    }
}

export function find(code?: string): FindAction {
    return {
        type: ActionType.FIND,
        payload: []
    }
}

export type EventAction = GetAction | FindAction
