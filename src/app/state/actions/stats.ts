import axios from 'axios';

import { Stats } from "../../models";

export enum FindStatsActionType {
    LOADING = '[stats] FIND LOADING',
    SUCCESS = '[stats] FIND SUCCESS',
    ERROR = '[stats] FIND ERROR'
}

export enum SaveStatsActionType {
    LOADING = '[stats] SAVE LOADING',
    SUCCESS = '[stats] SAVE SUCCESS',
    ERROR = '[stats] SAVE ERROR'
}

export enum RemoveStatsActionType {
    LOADING = '[stats] DELETE LOADING',
    SUCCESS = '[stats] DELETE SUCCESS',
    ERROR = '[stats] DELETE ERROR'
}

export interface FindStatsLoadingAction { type: FindStatsActionType.LOADING, loading: boolean }
export interface FindStatsSuccessAction { type: FindStatsActionType.SUCCESS, payload: Stats[] }
export interface FindStatsErrorAction { type: FindStatsActionType.ERROR, error: any }

export interface SaveStatsLoadingAction { type: SaveStatsActionType.LOADING, loading: boolean }
export interface SaveStatsSuccessAction { type: SaveStatsActionType.SUCCESS }
export interface SaveStatsErrorAction { type: SaveStatsActionType.ERROR, error: any }

export interface RemoveStatsLoadingAction { type: RemoveStatsActionType.LOADING, loading: boolean }
export interface RemoveStatsSuccessAction { type: RemoveStatsActionType.SUCCESS }
export interface RemoveStatsErrorAction { type: RemoveStatsActionType.ERROR, error: any }

export type FindStatsAction = FindStatsLoadingAction | FindStatsSuccessAction | FindStatsErrorAction;
export type SaveStatsAction = SaveStatsLoadingAction | SaveStatsSuccessAction | SaveStatsErrorAction;
export type RemoveStatsAction = RemoveStatsLoadingAction | RemoveStatsSuccessAction | RemoveStatsErrorAction;

export type StatsAction = FindStatsAction | SaveStatsAction | RemoveStatsAction;

const findStatsLoading = (loading: boolean): FindStatsLoadingAction => ({ type: FindStatsActionType.LOADING, loading });
const findStatsSuccess = (payload: Stats[]): FindStatsSuccessAction => ({ type: FindStatsActionType.SUCCESS, payload });
const findStatsError = (error: any): FindStatsErrorAction => ({ type: FindStatsActionType.ERROR, error });

const saveStatsLoading = (loading: boolean): SaveStatsLoadingAction => ({ type: SaveStatsActionType.LOADING, loading });
const saveStatsSuccess = (): SaveStatsSuccessAction => ({ type: SaveStatsActionType.SUCCESS });
const saveStatsError = (error: any): SaveStatsErrorAction => ({ type: SaveStatsActionType.ERROR, error });

const removeStatsLoading = (loading: boolean): RemoveStatsLoadingAction => ({ type: RemoveStatsActionType.LOADING, loading });
const removeStatsSuccess = (): RemoveStatsSuccessAction => ({ type: RemoveStatsActionType.SUCCESS });
const removeStatsError = (error: any): RemoveStatsErrorAction => ({ type: RemoveStatsActionType.ERROR, error });

export function findStats(eventId: string) {
    return (dispatch) => {
        const query = `event=${eventId}`;
        dispatch(findStatsLoading(true));
        return axios.get(`/api/stats?${query}`)
            .then((response) => {
                return dispatch(findStatsSuccess(response.data));
            })
            .catch((error) => {
                return dispatch(findStatsError(error));
            });
    }
}

export function saveStats(eventId: string, teamId: string, questionId: string) {
    const body = { event: eventId, team: teamId, question: questionId };
    return (dispatch) => {
        dispatch(saveStatsLoading(true));
        return axios.post('/api/stats', body)
            .then((response) => {
                return dispatch(saveStatsSuccess());
            })
            .catch((error) => {
                return dispatch(saveStatsError(error));
            });
    }
}

export function removeStats(eventId: string) {
    return (dispatch) => {
        const query = `event=${eventId}`;
        dispatch(removeStatsLoading(true));
        return axios.delete(`/api/stats?${query}`)
            .then((response) => {
                return dispatch(removeStatsSuccess());
            })
            .catch((error) => {
                return dispatch(removeStatsError(error));
            });
    }
}