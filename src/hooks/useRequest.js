// Network request hook

import { useState, useEffect } from "react";
import * as netRequests from "../services/netRequest";
import { useDispatch } from "react-redux";
import { setResponse, delResponse } from "../features/slices/responsesSlice";
import { pushMessage, setSpinner } from "../features/slices/localSlice";

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
          resolve(response);
        }
      })
      .catch((err) => {
        dispatch(pushMessage({ text: err.error, type: "error" }));
        reject(false);
      })
      .finally(() => {
        setRequest(null);
        beginRequest = false;
        dispatch(setSpinner(false));
      });
  }, [request]);

  const slice = {};
  slice.cleaner = () => dispatch(delResponse(handle));

  for (const func of Object.keys(netRequests[module])) {
    slice[func] = (...params) => {
      return new Promise((resolve, reject) => {
        setRequest([func, resolve, reject, ...params]);
      });
    };
  }

  return slice;
};
