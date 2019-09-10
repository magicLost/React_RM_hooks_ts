import {SomeClass} from "./Test";
import StaticTest from "./StaticTest";
import * as validators from './../../helper/Validation/validators';

describe("Is static testable", () => {

    test("Can we mock static class methods", () => {

        validators.isFile = jest.fn();

        const some = new SomeClass();

        some.someMethod();

        expect(validators.isFile).toHaveBeenCalledTimes(1);

    })

});