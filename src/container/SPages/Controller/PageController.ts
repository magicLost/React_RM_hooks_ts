import { useRef } from "react";
import { PageState } from "./../../../hooks/Page/spage";
import {
  isInViewport,
  isEndOfPageOnScroll
} from "../../../helper/isInViewport";

class PageController {
  numberOfHiddenSections: number;

  refs: React.MutableRefObject<null | HTMLElement>[] = [];

  setState: React.Dispatch<
    ((prevState: PageState) => PageState) | PageState
  > | null = null;

  constructor(numberOfHiddenSections: number) {
    this.numberOfHiddenSections = numberOfHiddenSections;
  }

  onUseEffect = (state: PageState) => {
    console.log("Use effect");

    //initScroll === lastYScroll
    if (!state.isInit) return;

    if (this.setState === null) throw new Error("No setState");

    if (state.lastYScroll !== state.initScrollValue) {
      this.setState({ ...state, isInit: false });
      return;
    }

    console.log("Use effect calc");

    if (state.visibleSectionNumber < this.numberOfHiddenSections - 1) {
      if (isInViewport(this.refs[state.visibleSectionNumber].current))
        this.setState({
          ...state,
          visibleSectionNumber: state.visibleSectionNumber + 1
        });
    } else if (state.visibleSectionNumber === this.numberOfHiddenSections - 1) {
      if (isInViewport(this.refs[state.visibleSectionNumber].current)) {
        this.setState({
          ...state,
          visibleSectionNumber: state.visibleSectionNumber + 1
        });
        window.removeEventListener("scroll", this.onWindowScroll);
      }
    }
  };

  onWindowScroll = (event: Event) => {
    //event.pageX;

    if (this.setState === null) throw new Error("No setState");

    this.setState(
      (prevState: PageState): PageState => {
        if (document.documentElement.scrollTop > prevState.lastYScroll) {
          let newVisibleSectionNumber = prevState.visibleSectionNumber;

          if (isEndOfPageOnScroll()) {
            if (newVisibleSectionNumber === this.numberOfHiddenSections - 1)
              window.removeEventListener("scroll", this.onWindowScroll);
            newVisibleSectionNumber += 1;
          }

          return {
            ...prevState,
            lastYScroll: document.documentElement.scrollTop,
            visibleSectionNumber: newVisibleSectionNumber
          };
        }

        return prevState;
      }
    );

    console.log("PAGE SCROLL", isEndOfPageOnScroll());

    //if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)
  };
}

export default PageController;
