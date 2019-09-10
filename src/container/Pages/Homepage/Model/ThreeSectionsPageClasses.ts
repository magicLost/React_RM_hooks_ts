import { IPageClasses } from "../../interfaces";

class ThreeSectionsPageClasses implements IPageClasses 
{

    classes: any;
    commonClasses: any;

    mainSectionClasses: string;
    leftSectionClasses: string = '';
    contactsSectionClasses: string = '';

    constructor(classes: any, commonClasses: any){

        //console.log("ThreeSectionsPageClasses CONSTRUCTOR ", classes.Section);

        this.classes = classes;

        this.commonClasses = commonClasses;

        this.mainSectionClasses = classes.Section;

    }

    setClassesByActiveIndex = (activeIndex: number, prevIndex: number) => {

        switch(activeIndex){

            case 1:

                if(prevIndex === 0){

                    this.mainSectionClasses = [ this.classes.Section, this.commonClasses.AnimationMoveFromRightToCenter ].join(' ');
                    this.leftSectionClasses = this.classes.Section;
                    this.contactsSectionClasses = this.classes.Section;

                }else{

                    this.mainSectionClasses = [ this.classes.Section, this.commonClasses.AnimationMoveFromLeftToCenter ].join(' ');
                    this.leftSectionClasses = this.classes.Section;
                    this.contactsSectionClasses = this.classes.Section;

                }

                break;

            case 0:

                this.mainSectionClasses = this.classes.Section;
                this.leftSectionClasses = [ this.classes.Section, this.commonClasses.AnimationMoveFromLeftToCenter ].join(' ');
                this.contactsSectionClasses = this.classes.Section;
                break;

            case 2:
                this.mainSectionClasses = this.classes.Section;
                this.leftSectionClasses = this.classes.Section;
                this.contactsSectionClasses = [ this.classes.Section, this.commonClasses.AnimationMoveFromRightToCenter ].join(' ');
                break;

            default: throw new Error("no implementation for index == " + activeIndex);

        }

    }

}

export default ThreeSectionsPageClasses;