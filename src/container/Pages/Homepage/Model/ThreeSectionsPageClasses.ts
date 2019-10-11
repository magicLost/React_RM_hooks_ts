import { IPageClasses, IThreeSectionClasses } from "../../types";

class ThreeSectionsPageClasses implements IPageClasses<IThreeSectionClasses>
{

    defaultClasses: any;
    commonClasses: any;

    classes: IThreeSectionClasses;

    constructor(classes: any, commonClasses: any){

        //console.log("ThreeSectionsPageClasses CONSTRUCTOR ", classes.Section);

        this.defaultClasses = classes;

        this.commonClasses = commonClasses;

        this.classes = {
            mainSectionClasses: classes.Section,
            leftSectionClasses: '',
            contactsSectionClasses: ''
        };
    }

    setClassesByActiveIndex = (activeIndex: number, prevIndex: number) => {

        switch(activeIndex){

            case 1:

                if(prevIndex === 0){

                    this.classes.mainSectionClasses = [ this.defaultClasses.Section, this.commonClasses.AnimationMoveFromRightToCenter ].join(' ');
                    this.classes.leftSectionClasses = this.defaultClasses.Section;
                    this.classes.contactsSectionClasses = this.defaultClasses.Section;
                    
                }else{

                    this.classes.mainSectionClasses = [ this.defaultClasses.Section, this.commonClasses.AnimationMoveFromLeftToCenter ].join(' ');
                    this.classes.leftSectionClasses = this.defaultClasses.Section;
                    this.classes.contactsSectionClasses = this.defaultClasses.Section;
                }
                break;

            case 0:

                this.classes.mainSectionClasses = this.defaultClasses.Section;
                this.classes.leftSectionClasses = [ this.defaultClasses.Section, this.commonClasses.AnimationMoveFromLeftToCenter ].join(' ');
                this.classes.contactsSectionClasses = this.defaultClasses.Section;
                break;

            case 2:
                this.classes.mainSectionClasses = this.defaultClasses.Section;
                this.classes.leftSectionClasses = this.defaultClasses.Section;
                this.classes.contactsSectionClasses = [ this.defaultClasses.Section, this.commonClasses.AnimationMoveFromRightToCenter ].join(' ');
                break;

            default: throw new Error("no implementation for index == " + activeIndex);

        }

    }

}

export default ThreeSectionsPageClasses;