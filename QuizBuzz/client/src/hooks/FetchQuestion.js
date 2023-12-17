import { useEffect, useState } from 'react'
import data from '../database/data'
import { useDispatch } from 'react-redux'

// redux actions
import * as Action from '../redux/question_reducer'

// fetch question hook to api data and set value to store

export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({
        loading: false,
        apiData: [],
        serverError: null
    })
    useEffect(() => {
        setGetData(prev => ({ ...prev, loading: true }));

        // async function to fetch backend data
        (async () => {
            try {
                let question = await data;

                if (question.length > 0) {
                    setGetData(prev => ({ ...prev, loading: false }));
                    setGetData(prev => ({ ...prev, apiData: question }));

                    // dispatch an action
                    dispatch(Action.startExamAction(question))
                } else {
                    throw new Error('No Question Available')
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, loading: false }));
                setGetData(prev => ({ ...prev, serverError: error }));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
}

// moveAction Dispatch function
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction())
    } catch (error) {
        console.log(error)
    }
}
// PrevAction Dispatch function
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction())
    } catch (error) {
        console.log(error)
    }
}