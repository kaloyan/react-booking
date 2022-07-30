// Network request hook

import { useState, useEffect } from "react";
import * as netRequests from "../services/netRequest";
import { useDispatch } from "react-redux";
import { setSpinner } from "../features/slices/localSlice";
import { setResponse, delResponse } from "../features/slices/responsesSlice";
import { pushMessage } from "../features/slices/localSlice";

const delay = 500;

export const useRequest = (module, handle) => {
  const [request, setRequest] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!request) return;

    let beginRequest = true;

    setTimeout(() => {
      if (beginRequest) {
        dispatch(setSpinner(true));
      }
    }, delay);

    const [f, resolve, reject, ...params] = request;
    const func = netRequests[module][f];

    func(...params)
      .then((response) => {
        if (response?.response?.status) {
          reject(false);
          // throw error
          throw {
            error: response.response.data.message || "Server error",
          };
        } else {
          dispatch(setResponse({ handle, data: response }));
          resolve(true);
        }
      })
      .catch((err) => {
        dispatch(pushMessage({ text: err.error, type: "error" }));
      })
      .finally(() => {
        setRequest(null);
        beginRequest = false;
        reject(false);
        dispatch(setSpinner(false));
      });
  }, [request]);

  const slice = {};

  for (const func of Object.keys(netRequests[module])) {
    slice[func] = (...params) => {
      return new Promise((resolve, reject) => {
        setRequest([func, resolve, reject, ...params]);
      });
    };
  }

  slice.cleaner = () => dispatch(delResponse(handle));

  return slice;
};
