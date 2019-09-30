import React, {useState, useMemo} from 'react';
//import logo from './logo.svg';
import classes from './App.module.scss';
//import Feedback from './container/Forms/Feedback/Feedback';
//import Modal from './component/Modal/Modal';
import Homepage from './container/Pages/Homepage/Homepage';
import Scroller from './container/Scroller/Scroller';
import CarouselOpacity from './container/Carousel/CarouselOpacity/CarouselOpacity';
import CarouselTranslate from './container/Carousel/CarouselTranslate/CarouselTranslate';
import MainPresentation from './container/MainPresentation/MainPresentation';
import TextRender from './component/TextRender/TextRender';
//import Test from './component/Test/Test';
import {mainText} from "./data/homepage_data";


function App() {

  const [carouselTranslateActiveIndex, setCarouselTranslateActiveIndex] = useState(0);

  const [carouselActiveIndex, setCarouselActiveIndex] = useState(0);

  const items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  const getScrollerItems = (

    itemClass: string, 
    onItemClick: (target: any) => void | undefined, 
    numberOfActiveItems: number,
    itemRef: React.RefObject<HTMLLIElement> | null
  ): JSX.Element[] => {

    return items.map((value, index) => {

        //console.log("get scroller items", numberOfActiveItems, index);
        let isActive = ( index + 1 ) <= numberOfActiveItems;

        return (
            <li
                key={itemClass + index}
                className={itemClass}
                ref={itemRef}
                data-index={index}
            >
                <div className={classes.ScrollerItem}>
                    <button data-index={index} onClick={onItemClick}>{"Hello_" + index}</button>
                </div>
            </li>
        );
    });

  }

  const getCarouselOpacityItems = (
    itemClass: string, 
    getItemStyle: (isTranslated: boolean, opacity: number, activeIndex: number, index: number) => any, 
    isTranslated: boolean, 
    opacity: number,
    activeIndex: number): JSX.Element[] => 
  {

    return items.map((value, index) => {

      let style = getItemStyle(isTranslated, opacity, activeIndex, index);

      return (<li key={itemClass + index} style={style} className={itemClass}>

        <div className={classes.CarouselItem}>
          <h3>Carousel item - {index}</h3>
        </div>

      </li>);

    })

  }

  const getCarouselTranslateItems = (
    itemClass: string, 
    activeIndex: number): JSX.Element[] => 
  {

    return items.map((value, index) => {

      return (<li key={itemClass + index} className={itemClass}>

        <div className={classes.CarouselItem}>
          <h3>Carousel item - {index}</h3>
        </div>

      </li>);

    })

  }

  const increaseCarouselTranslateIndex = () => {
    console.log("increaseCarouselTranslateIndex");
    
    setCarouselTranslateActiveIndex(prevIndex => {  
      console.log("setState increaseCarouselTranslateIndex", prevIndex);
      return prevIndex + 1});
  }

  const decreaseCarouselTranslateIndex = () => {
    console.log("decreaseCarouselTranslateIndex")
    
    setCarouselTranslateActiveIndex(prevIndex => { 
      console.log("setState decreaseCarouselTranslateIndex", prevIndex);
      return prevIndex > 0 ? prevIndex - 1 : prevIndex});
  }

  const increaseCarouselIndex = () => {
    //console.log("increaseCarouselIndex", carouselActiveIndex, items.length);
    
    setCarouselActiveIndex(prevIndex => { return prevIndex + 1});
  }

  const decreaseCarouselIndex = () => {
    //console.log("decreaseCarouselIndex", carouselActiveIndex)
    
    setCarouselActiveIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : prevIndex);
  }

  console.log("render App", carouselTranslateActiveIndex);

  return (
    <>

      {useMemo(() => (
        <div className={classes.Section}>
          <MainPresentation />
        </div>
      ), [])}

      {useMemo(() => (<TextRender textToParse={mainText} />), [])}

      {useMemo(() => (
        <div className={classes.Section}>
           <Scroller
                items={items}
                type="hello"
                itemClickHandler={() => {console.log("hello")}}
                getItems={getScrollerItems}
            />
        </div>

      ),[])}
      
       
      {useMemo(() => (
        <div className={classes.Section}>
          <CarouselOpacity 
            items={items}
            itemsLength={items.length}
            getItems={getCarouselOpacityItems}
            activeIndex={carouselActiveIndex}
            increaseActiveIndex={increaseCarouselIndex}
            decreaseActiveIndex={decreaseCarouselIndex}
          />
        </div>
      ),[carouselActiveIndex])}
      

      {useMemo(() => (
        
        <div className={classes.Section}>
          <CarouselTranslate 
            items={items}
            getItems={getCarouselTranslateItems}
            activeIndex={carouselTranslateActiveIndex}
            increaseActiveIndex={increaseCarouselTranslateIndex}
            decreaseActiveIndex={decreaseCarouselTranslateIndex}
          />
        </div>
      ),[carouselTranslateActiveIndex])}
     

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}

        {/* <Homepage />  */}
        {/* <Test />  */}

        {/*   <Modal
              show={true}
              backdropClickHandler={() => {console.log("backdropClickHandler");}}
          >

            <Feedback 
                url={"http://public.local/feedback"}
                successOkButtonClickHandler={() => {console.log("successOkButtonClickHandler");}}
                hiddenFields={[]}
            />

          </Modal> */}

    </>
  );
}

export default App;
