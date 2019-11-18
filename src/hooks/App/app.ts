import { useState, useRef } from "react";
import AppController from "../../AppController";

export interface AppState {
  isShowFooter: boolean;
  isShowModalFromLeft: boolean;
  isShowModalFromTop: boolean;
}

export const useApp = () => {
  const controllerRef: React.MutableRefObject<AppController | null> = useRef(
    null
  );

  const [state, setState] = useState(
    (): AppState => {
      controllerRef.current = new AppController();

      return {
        isShowFooter: false,
        isShowModalFromLeft: false,
        isShowModalFromTop: false
      };
    }
  );

  if (controllerRef.current === null) throw new Error("No controller");

  controllerRef.current.setState = setState;

  return {
    controller: controllerRef.current,
    state: state
  };
};
