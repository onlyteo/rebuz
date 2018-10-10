import axios from 'axios';

import { Event } from "../../models";

export enum GetEventActionType {
    LOADING = '[events] GET LOADING',
    SUCCESS = '[events] GET SUCCESS',
    ERROR = '[events] GET ERROR'
}

export enum FindEventsActionType {
    LOADING = '[events] FIND LOADING',
    SUCCESS = '[events] FIND SUCCESS',
    ERROR = '[events] FIND ERROR'
}

export interface GetEventLoadingAction { type: GetEventActionType.LOADING, loading: boolean }
export interface GetEventSuccessAction { type: GetEventActionType.SUCCESS, payload: Event }
export interface GetEventErrorAction { type: GetEventActionType.ERROR, error: any }

export interface FindEventsLoadingAction { type: FindEventsActionType.LOADING, loading: boolean }
export interface FindEventsSuccessAction { type: FindEventsActionType.SUCCESS, payload: Event[] }
export interface FindEventsErrorAction { type: FindEventsActionType.ERROR, error: any }

export type GetEventAction = GetEventLoadingAction | GetEventSuccessAction | GetEventErrorAction;
export type FindEventsAction = FindEventsLoadingAction | FindEventsSuccessAction | FindEventsErrorAction;

export type EventAction = GetEventAction | FindEventsAction;

const getEventLoading = (loading: boolean): GetEventLoadingAction => ({ type: GetEventActionType.LOADING, loading });
const getEventSuccess = (payload: Event): GetEventSuccessAction => ({ type: GetEventActionType.SUCCESS, payload });
const getEventError = (error: any): GetEventErrorAction => ({ type: GetEventActionType.ERROR, error });

const findEventsLoading = (loading: boolean): FindEventsLoadingAction => ({ type: FindEventsActionType.LOADING, loading });
const findEventsSuccess = (payload: Event[]): FindEventsSuccessAction => ({ type: FindEventsActionType.SUCCESS, payload });
const findEventsError = (error: any): FindEventsErrorAction => ({ type: FindEventsActionType.ERROR, error });

export function getEvent(id: string) {
    return (dispatch) => {
        dispatch(getEventLoading(true));
        return axios.get(`/api/events/${id}`)
            .then((response) => {
                return dispatch(getEventSuccess(response.data));
            })
            .catch((error) => {
                return dispatch(getEventError(error));
            });
    }
}

export function findEvents(id: string) {
    return (dispatch) => {
        dispatch(findEventsLoading(true));
        return axios.get(`/api/events?team=${id}`)
            .then((response) => {
                return dispatch(findEventsSuccess(response.data));
            })
            .catch((error) => {
                return dispatch(findEventsError(error));
            });
    }
}
