import CarouselController from '../../CarouselController';
import {CarouselOpacityState} from "../../../../../hooks/Carousels/Carousel/types";
import CastTranslateXToOpacity from '../Model/CastTranslateXToOpacity';
import CalcTranslateX from '../../CalcTranslateX';


class CarouselOpacityController extends CarouselController {

    setState: React.Dispatch<((prevState: CarouselOpacityState) => CarouselOpacityState) | CarouselOpacityState> | null = null;
    cast: CastTranslateXToOpacity;

    constructor(
        calc: CalcTranslateX, 
        increaseActiveIndex: () => void | undefined,
        decreaseActiveIndex: () => void | undefined,
        cast: CastTranslateXToOpacity
    ){
        super(calc, increaseActiveIndex, decreaseActiveIndex);
        this.cast = cast;
    }

    protected onPointerDown(pageX: number, pageY: number){

        this.calc.onPointerDown(pageX, pageY);
        this.cast.onPointerDown();

        if(this.setState === null) throw new Error("No setState");
    
        this.setState((prevState: CarouselOpacityState) => {

            return {...prevState, isTranslated: true};

        }); 
    }

    protected onPointerMove(pageX: number, pageY: number){

        this.calc.onPointerMove(pageX, pageY, this.activeIndex, this.itemsLength);
    
        if(this.setState === null) throw new Error("No setState");

        this.setState((prevState: CarouselOpacityState) => {

            if(prevState.translateX !== this.calc.translateX){
                return {
                    ...prevState, 
                    translateX: this.calc.translateX,
                    opacity: this.cast.calcOpacityByTranslateX(this.calc.translateX)
                };
            }else{
                return prevState;
            }

        });
    }

    protected onPointerUp(){

        if(this.setState === null) throw new Error("No setState");

        this.setState((prevState: CarouselOpacityState) => {

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
                isTranslated: false, 
                translateX: 0,
                opacity: 1
            };

        });
    }

}

export default CarouselOpacityController;