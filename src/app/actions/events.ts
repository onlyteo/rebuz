import { EventResponse } from "../models";

export enum FindEventsActionType {
    LOADING = '[events] FIND LOADING',
    SUCCESS = '[events] FIND SUCCESS',
    ERROR = '[events] FIND ERROR'
}

export interface FindEventsLoadingAction { type: FindEventsActionType.LOADING, loading: boolean }
export interface FindEventsSuccessAction { type: FindEventsActionType.SUCCESS, payload: EventResponse[] }
export interface FindEventsErrorAction { type: FindEventsActionType.ERROR, error: any }

export type FindEventsAction = FindEventsLoadingAction | FindEventsSuccessAction | FindEventsErrorAction;

const findEventsLoading = (loading: boolean): FindEventsLoadingAction => ({ type: FindEventsActionType.LOADING, loading });
const findEventsSuccess = (payload: EventResponse[]): FindEventsSuccessAction => ({ type: FindEventsActionType.SUCCESS, payload });
const findEventsError = (error: any): FindEventsErrorAction => ({ type: FindEventsActionType.ERROR, error });

export function findEvents(code: string) {
    return (dispatch) => {
        dispatch(findEventsLoading(true));
        return Api.get(`/api/find?code=${code}`)
            .then(response => {
                return dispatch(findEventsSuccess(response));
            })
            .catch((error) => {
                return dispatch(findEventsError(error));
            });
    }
}

declare const Api: {
    get: (url: string) => Promise<EventResponse[]>;
}