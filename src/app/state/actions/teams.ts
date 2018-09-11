import axios from 'axios';

import { Team } from "../../models";

export enum GetTeamActionType {
    LOADING = '[teams] GET LOADING',
    SUCCESS = '[teams] GET SUCCESS',
    ERROR = '[teams] GET ERROR'
}

export interface GetTeamLoadingAction { type: GetTeamActionType.LOADING, loading: boolean }
export interface GetTeamSuccessAction { type: GetTeamActionType.SUCCESS, payload: Team }
export interface GetTeamErrorAction { type: GetTeamActionType.ERROR, error: any }

export type GetTeamAction = GetTeamLoadingAction | GetTeamSuccessAction | GetTeamErrorAction;

const getTeamLoading = (loading: boolean): GetTeamLoadingAction => ({ type: GetTeamActionType.LOADING, loading });
const getTeamSuccess = (payload: Team): GetTeamSuccessAction => ({ type: GetTeamActionType.SUCCESS, payload });
const getTeamError = (error: any): GetTeamErrorAction => ({ type: GetTeamActionType.ERROR, error });

export function getTeam(id: string) {
    return (dispatch) => {
        dispatch(getTeamLoading(true));
        return axios.get(`/api/teams/${id}`)
            .then((response) => {
                return dispatch(getTeamSuccess(response.data));
            })
            .catch((error) => {
                return dispatch(getTeamError(error));
            });
    }
}