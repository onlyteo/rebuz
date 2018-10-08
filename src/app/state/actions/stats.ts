import axios from 'axios';

import { Stats } from "../../models";

export enum FindStatsActionType {
    LOADING = '[stats] FIND LOADING',
    SUCCESS = '[stats] FIND SUCCESS',
    ERROR = '[stats] FIND ERROR'
}

export interface FindStatsLoadingAction { type: FindStatsActionType.LOADING, loading: boolean }
export interface FindStatsSuccessAction { type: FindStatsActionType.SUCCESS, payload: Stats[] }
export interface FindStatsErrorAction { type: FindStatsActionType.ERROR, error: any }

export type FindStatsAction = FindStatsLoadingAction | FindStatsSuccessAction | FindStatsErrorAction;

const findStatsLoading = (loading: boolean): FindStatsLoadingAction => ({ type: FindStatsActionType.LOADING, loading });
const findStatsSuccess = (payload: Stats[]): FindStatsSuccessAction => ({ type: FindStatsActionType.SUCCESS, payload });
const findStatsError = (error: any): FindStatsErrorAction => ({ type: FindStatsActionType.ERROR, error });

export function findStats(eventId: string) {
    return (dispatch) => {
        dispatch(findStatsLoading(true));
        return axios.get(`/api/stats?event=${eventId}`)
            .then((response) => {
                return dispatch(findStatsSuccess(response.data));
            })
            .catch((error) => {
                return dispatch(findStatsError(error));
            });
    }
}