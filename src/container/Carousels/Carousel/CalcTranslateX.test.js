import CalcTranslateX from "./calcTranslateX";

let calc = null;
let activeIndex = 4;
let itemsLength = 6;

describe("CalcTranslateX", () => {

    beforeEach(() => {
        
        calc = new CalcTranslateX();
        let activeIndex = 4;
        let itemsLength = 6;

    
    });

    describe("Public functions", () => {

        describe("onPointerDown", () => {

            test("set pageXStart, pageYStart, prevPageX, dist", () => {

                calc.dist = 345;

                calc.onPointerDown(23, 44);

                expect(calc.pageXStart).toEqual(23);
                expect(calc.pageYStart).toEqual(44);
                expect(calc.prevPageX).toEqual(23);
                expect(calc.dist).toEqual(0);

            })

        });

        describe("onPointerMove", () => {

            test("If isFirstMove = true it must call isYScrollFunc and set isFirstMove to false", () => {

                calc.isYScrollFunc = jest.fn();

                expect(calc.isFirstMove).toEqual(true);

                calc.onPointerMove(23, 44, activeIndex, itemsLength);

                expect(calc.isYScrollFunc).toHaveBeenNthCalledWith(1, 23, 44);

                expect(calc.isFirstMove).toEqual(false);

            });

            test("If not isYScroll - it must calc dist, translatX and set prevPageX to equal pageX", () => {

                calc.isYScrollFunc = jest.fn();
                calc.isYScrollFunc.mockReturnValue(false);

                calc.calcTranslateXOnMove = jest.fn();
                calc.calcTranslateXOnMove.mockReturnValue(23);

                calc.onPointerMove(23, 44, activeIndex, itemsLength);

                expect(calc.dist).toEqual(-23);

                expect(calc.calcTranslateXOnMove).toHaveBeenNthCalledWith(1, 23, activeIndex, itemsLength);

                expect(calc.translateX).toEqual(23);

                expect(calc.prevPageX).toEqual(23);

            })

        });

        describe("onPointerUp", () => {

            test("set isYScroll = false, isFirstMove = true, translateX = 0", () => {

                calc.isYScroll = true;
                calc.isFirstMove = false;
                calc.translateX = 345;

                calc.onPointerUp();

                expect(calc.isYScroll).toEqual(false);
                expect(calc.isFirstMove).toEqual(true);
                expect(calc.translateX).toEqual(0);

            })

        });

    });

    describe("Private functions", () => {

        //pageX - from 0(on the left corner of window)    
        describe("calcTranslateXOnMove", () => {
        
            describe("If activeIndex !== 0 || activeIndex !== itemsLength -1 - return pageX - prevPage", () => {

                test(" - return pageX - prevPageX", () => {
                
                    expect(calc.calcTranslateXOnMove(25, activeIndex, itemsLength)).toEqual(25);
        
                    expect(calc.calcTranslateXOnMove(-25, activeIndex, itemsLength)).toEqual(-25);
                    
                });

            });
            
            describe("If activeIndex === 0", () => {

                //the start of items list
                describe("calc.translateX > 0", () => {

                    beforeEach(() => {
            
                        calc.translateX = 10;
                        activeIndex = 0;
                        itemsLength = 6;
                    
                    });

                    test("If calc.translateX > this.offset it must return 0", () => {
        
                        calc.translateX = 40;

                        expect(calc.calcTranslateXOnMove(25, activeIndex, itemsLength)).toEqual(0);
                        
                    });

                    test("If calc.translateX > this.offset and if pageX < prevPageX it must return pageX - prevPageX", () => {
        
                        calc.translateX = 40;
                        calc.prevPageX = 35;

                        expect(calc.calcTranslateXOnMove(25, activeIndex, itemsLength)).toEqual(-10);
                        
                    });

                    test("If pageX > calc.prevPageX it must return 0.3", () => {
        
                        calc.prevPageX = 10;

                        expect(calc.calcTranslateXOnMove(25, activeIndex, itemsLength)).toEqual(0.3);
                        
                    });

                    test("If pageX < calc.prevPageX it must return pageX - prevPageX as usual", () => {
                    
                        calc.prevPageX = 35;

                        expect(calc.calcTranslateXOnMove(25, activeIndex, itemsLength)).toEqual(-10);
                        
                    });
        
                });

            });

            describe("activeIndex !== itemsLength -1", () => {

                //the end of an items list
                describe("calc.translateX < 0", () => {

                    beforeEach(() => {
            
                        calc.translateX = -10;
                        activeIndex = 5;
                        itemsLength = 6;
                
                    
                    });

                    test("If calc.translateX > this.offset it must return 0", () => {
        
                        calc.translateX = -40;
                        calc.prevPageX = 35;

                        expect(calc.calcTranslateXOnMove(25, activeIndex, itemsLength)).toEqual(0);
                        
                    });

                    test("If calc.translateX > this.offset and if pageX > prevPageX it must return pageX - prevPageX", () => {
        
                        calc.translateX = -40;
                        calc.prevPageX = 25;

                        expect(calc.calcTranslateXOnMove(35, activeIndex, itemsLength)).toEqual(10);
                        
                    });

                    test("If pageX > calc.prevPageX it must return 0.3", () => {
        
                        calc.prevPageX = 10;

                        expect(calc.calcTranslateXOnMove(5, activeIndex, itemsLength)).toEqual(-0.3);
                        
                    });

                    test("If pageX < calc.prevPageX it must return pageX - prevPageX as usual", () => {
                    
                        calc.prevPageX = 15;

                        expect(calc.calcTranslateXOnMove(25, activeIndex, itemsLength)).toEqual(10);
                        
                    });
        
                });
            });
        });
    });
});