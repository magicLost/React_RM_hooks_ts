import CarouselController from './../../CarouselController';
import {CarouselTranslateState} from "./../../../../hooks/Carousel/types";

class CarouselTranslateController extends CarouselController {

    setState: React.Dispatch<((prevState: CarouselTranslateState) => CarouselTranslateState) | CarouselTranslateState> | null = null;

    protected onPointerDown = (pageX: number, pageY: number) => {

        this.calc.onPointerDown(pageX, pageY);

        if(this.setState === null) throw new Error("No setState");
    
        this.setState((prevState) => {

            return {...prevState, listStyle: {}, isTranslated: true};

        });
    
    };

    protected onPointerMove = (pageX: number, pageY: number) => {
    
        this.calc.onPointerMove(pageX, pageY, this.activeIndex, this.itemsLength);

        if(this.setState === null) throw new Error("No setState");
    
        this.setState((prevState) => {

            if(prevState.translateX !== this.calc.translateX){
                return {...prevState, translateX: this.calc.translateX};
            }else{
                return prevState;
            }

        });
    
    };
    
    protected onPointerUp = () => {

        if(this.setState === null) throw new Error("No setState");
    
        this.setState((prevState) => {

            //let listStyle = {};

            if(!this.calc.isYScroll && this.calc.isEnougthDist()){

                if(this.calc.isIndexIncrease()){

                    this.increaseActiveIndex();

                }else{

                    this.decreaseActiveIndex();

                }

            }

            this.calc.onPointerUp();

            return {
                ...prevState, 
                listStyle: {
                    transitionProperty: 'transform',
                    transitionDuration: '0.5s'
                }, 
                isTranslated: false, 
                translateX: 0};

        });
    
    };

}

export default CarouselTranslateController;