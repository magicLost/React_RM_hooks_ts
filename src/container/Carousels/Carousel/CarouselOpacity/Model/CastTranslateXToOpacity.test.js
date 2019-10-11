import CastTranslateXToOpacity from './CastTranslateXToOpacity';

let cast = null;

describe("CastTranslateXToOpacity", () => {

    beforeEach(() => {
        
        cast = new CastTranslateXToOpacity();

    
    });
    
    describe("calcOpacityByTranslateX - Calc opacity by document.width", () => {
        
        test("If width = 800, multiplier must to be ", () => {

            expect(cast.calcOpacityByTranslateX(400, 800)).toEqual(0.5);
        
        });
    });

});