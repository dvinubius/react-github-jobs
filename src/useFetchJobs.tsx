import JobModel from "./models/job.model";
import SearchParams from "./models/search_params.model";
import { useReducer, useEffect } from "react";
import axios from "axios";

enum ActionType {
  MAKE_REQUEST,
  GET_DATA,
  ERROR,
  UPDATE_HAS_NEXT_PAGE,
}

type FetchJobsAction =
  | { type: ActionType.MAKE_REQUEST }
  | { type: ActionType.GET_DATA; payload: { jobs: JobModel[] } }
  | { type: ActionType.ERROR; payload: { error: any } }
  | {
      type: ActionType.UPDATE_HAS_NEXT_PAGE;
      payload: { hasNextPage: boolean };
    };

export interface FetchJobsState {
  loading: boolean;
  jobs: JobModel[];
  hasNextPage: boolean;
  error: any;
}

const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";
const reducer = (state: FetchJobsState, action: FetchJobsAction) => {
  switch (action.type) {
    case ActionType.MAKE_REQUEST:
      return { loading: true, jobs: [], error: null, hasNextPage: false };
    case ActionType.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ActionType.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    case ActionType.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage };
    default:
      return state;
  }
};

const useFetchJobs = (params: SearchParams, page: number): FetchJobsState => {
  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
    loading: true,
    error: null,
    hasNextPage: false,
  });

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
    dispatch({ type: ActionType.MAKE_REQUEST });
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken1.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: ActionType.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ActionType.ERROR, payload: { error: e } });
      });

    const cancelToken2 = axios.CancelToken.source();
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken2.token,
        params: { markdown: true, page: page + 1, ...params },
      })
      .then((res) => {
        dispatch({
          type: ActionType.UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 },
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ActionType.ERROR, payload: { error: e } });
      });

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);

  return state;
};

export default useFetchJobs;
