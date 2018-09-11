import axios from 'axios';

import { Question } from "../../models";

export enum GetQuestionActionType {
    LOADING = '[questions] GET LOADING',
    SUCCESS = '[questions] GET SUCCESS',
    ERROR = '[questions] GET ERROR'
}

export interface GetQuestionLoadingAction { type: GetQuestionActionType.LOADING, loading: boolean }
export interface GetQuestionSuccessAction { type: GetQuestionActionType.SUCCESS, payload: Question }
export interface GetQuestionErrorAction { type: GetQuestionActionType.ERROR, error: any }

export type GetQuestionAction = GetQuestionLoadingAction | GetQuestionSuccessAction | GetQuestionErrorAction;

const getQuestionLoading = (loading: boolean): GetQuestionLoadingAction => ({ type: GetQuestionActionType.LOADING, loading });
const getQuestionSuccess = (payload: Question): GetQuestionSuccessAction => ({ type: GetQuestionActionType.SUCCESS, payload });
const getQuestionError = (error: any): GetQuestionErrorAction => ({ type: GetQuestionActionType.ERROR, error });

export function getQuestion(id: string) {
    return (dispatch) => {
        dispatch(getQuestionLoading(true));
        return axios.get(`/api/questions/${id}`)
            .then((response) => {
                return dispatch(getQuestionSuccess(response.data));
            })
            .catch((error) => {
                return dispatch(getQuestionError(error));
            });
    }
}