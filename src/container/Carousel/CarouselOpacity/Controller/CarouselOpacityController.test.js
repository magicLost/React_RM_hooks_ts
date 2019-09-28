import CarouselOpacityController from "./CarouselOpacityController";


let controller = null;
let calc = null;
let cast = null;

describe("CarouselOpacityController", () => {

    beforeEach(() => {
        
        calc = {};
        cast = {};
        
        controller = new CarouselOpacityController(calc, cast);

        controller.state = {};
        controller.setState = (callback) => { controller.state = callback({test: "hello"})};
    
    });

    
    describe("MAIN LISTENERS", () => {
        
        describe("onPointerDown", () => {
    
            test("Call calc.onPointerDown and set state", () => {
            
                calc.onPointerDown = jest.fn();
                cast.onPointerDown = jest.fn();

                controller.onPointerDown(45, 44);

                expect(calc.onPointerDown).toHaveBeenNthCalledWith(1, 45, 44);
                expect(cast.onPointerDown).toHaveBeenNthCalledWith(1);

                expect(controller.state).toEqual({test: "hello", isTranslated: true});
            
            });
    
        });

        describe("onPointerMove", () => {
    
            test("Call calc.onPointerMove and set state", () => {
            
                //this.calc.onPointerMove(pageX, pageY, this.activeIndex, this.itemsLength);
                controller.activeIndex = 3;
                controller.itemsLength = 5;

                calc.translateX = 26;
                calc.onPointerMove = jest.fn();
                cast.calcOpacityByTranslateX = jest.fn();

                controller.setState = (callback) => { controller.state = callback({test: "hello", translateX: 25})};

                controller.onPointerMove(46, 44);

                expect(calc.onPointerMove).toHaveBeenNthCalledWith(1, 46, 44, 3, 5);
                expect(cast.calcOpacityByTranslateX).toHaveBeenNthCalledWith(1, 26);

                expect(controller.state).toEqual({test: "hello", translateX: 26});
            
            });
    
        });

        describe("onPointerUp", () => {
    
            test("Call increaseActiveIndex/decreaseActiveIndex if not isYScroll and isEnougthDist, calc.onPointerUp and set state", () => {           

                calc.onPointerUp = jest.fn();

                calc.isYScroll = false;
                calc.isEnougthDist = jest.fn();
                calc.isEnougthDist.mockReturnValue(true);
                calc.isIndexIncrease = jest.fn();
                calc.isIndexIncrease.mockReturnValue(true);

                controller.increaseActiveIndex = jest.fn();
                controller.decreaseActiveIndex = jest.fn();

                controller.onPointerUp();

                expect(calc.onPointerUp).toHaveBeenNthCalledWith(1);
                expect(calc.isEnougthDist).toHaveBeenNthCalledWith(1);
                expect(calc.isIndexIncrease).toHaveBeenNthCalledWith(1);
                expect(controller.increaseActiveIndex).toHaveBeenNthCalledWith(1);


                expect(controller.state).toEqual({
                    test: "hello", 
                    translateX: 0,
                    opacity: 1,
                    isTranslated: false
                });
            });
        });
    });
});