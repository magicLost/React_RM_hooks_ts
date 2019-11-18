import { useState, useEffect, useRef } from "react";
import PageController from "./../../container/SPages/Controller/PageController";

export type PageState = {
  visibleSectionNumber: number;
  lastYScroll: number;
  isInit: boolean;
  initScrollValue: number;
};

export const usePage = (numberOfHiddenSections: number) => {
  const controllerRef: React.MutableRefObject<PageController | null> = useRef(
    null
  );

  const refs: React.MutableRefObject<null | HTMLElement>[] = [];

  //eslint-disable-next-line
  for (let i = 0; i < numberOfHiddenSections; i++) {
    //eslint-disable-next-line
    refs[i] = useRef(null);
  }

  const [state, setState] = useState(
    (): PageState => {
      controllerRef.current = new PageController(numberOfHiddenSections);
      //const docScroll = document ? document.documentElement.scrollTop : 0;
      const docScroll = 0;
      return {
        visibleSectionNumber: 0,
        lastYScroll: docScroll,
        isInit: true,
        initScrollValue: docScroll
      };
    }
  );

  if (controllerRef.current === null) throw new Error("No controller");

  controllerRef.current.setState = setState;
  controllerRef.current.refs = refs;

  useEffect(() => {
    if (controllerRef.current === null) throw new Error("No controller");

    window.addEventListener("scroll", controllerRef.current.onWindowScroll);

    return () => {
      if (controllerRef.current === null) throw new Error("No controller");

      window.removeEventListener(
        "scroll",
        controllerRef.current.onWindowScroll
      );
    };
  }, []);

  useEffect(() => {
    if (controllerRef.current === null) throw new Error("No controller");

    controllerRef.current.onUseEffect(state);
  }, [state.lastYScroll, state.visibleSectionNumber]);

  return {
    //setState: setState,
    refs: refs,
    visibleSectionNumber: state.visibleSectionNumber
  };
};

export default usePage;
