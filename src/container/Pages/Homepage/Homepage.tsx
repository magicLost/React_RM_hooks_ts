import React, {useEffect, useMemo} from 'react';
import classes from './Homepage.module.scss';
import commonClasses from '../../../commonClasses.module.scss';
//import HomepageController from './Controller/HomepageController';
//import ThreeSectionsPageClasses from './Model/ThreeSectionsPageClasses';
import { usePage } from '../../../hooks/Page/page';
import Modal from '../../../component/Modal/Modal';
import Feedback from '../../Forms/Feedback/Feedback';
import MainContent from './Content/MainContent/MainContent';
import PortfolioContent from './Content/PortfolioContent/PortfolioContent';
import Contacts from '../Partial/Contacts/Contacts';
import HomepageController from './Controller/HomepageController';
import {IThreeSectionClasses} from "./../types";
//import ControlsFeature from '../../ControlsFeature/ControlsFeature';
//import {toolbarItemsArray, mainPresentationItemsControls} from './../../../data/homepage_data';


const Homepage = () => {

    const { 
        controller, 
        activeSectionIndex, 
        isShowModal,
        sectionsClasses, 
        createdSections, 
        modalChildrenType, 
        modalType, 
        hiddenFields } = usePage("HOMEPAGE", classes, commonClasses, 1, 0, 3);

    console.log("render homepage", activeSectionIndex);

    return (
        
        <>
        
            <header>
                
                <button onClick={controller.onIncreaseIndex}>Next</button>
                <button onClick={controller.onDecreaseIndex}>Prev</button>

                <button onClick={(controller as HomepageController).onShowFeedbackForm}>Feedback form</button>

                <hr />

            </header>

            <main>

                <section
                    className={sectionsClasses.mainSectionClasses}
                    style={(activeSectionIndex !== 1) ? { display: 'none'} : undefined}
                >

                    <MainContent />

                </section>

                { createdSections[0] &&
                    <section
                        className={(sectionsClasses as IThreeSectionClasses).leftSectionClasses}
                        style={(activeSectionIndex !== 0) ? { display: 'none'} : undefined}
                    >

                        <PortfolioContent 
                            showFeedBackFormHandler={(id: string) => {console.log("photo_id = ", id)}}
                        />

                    </section>
                }

            </main>

            <footer>

                { createdSections[2] &&
                    <div
                        className={sectionsClasses.contactsSectionClasses}
                        style={(activeSectionIndex !== 2) ? { display: 'none'} : undefined}
                    >

                        <Contacts />

                    </div>
                }

            </footer>

            <Modal
                show={isShowModal}
                onClose={controller.onHideModal}
                type={modalType}
            >

                {useMemo(() => {

                    if(modalChildrenType === "FEEDBACK" || modalChildrenType === "WANNA_THE_SAME"){

                        return <Feedback 
                            url={"http://public.local/feedback"}
                            successOkButtonClickHandler={() => {console.log("successOkButtonClickHandler");}}
                            hiddenFields={hiddenFields}
                            isCallMe={false}
                        />
                    }else if(modalChildrenType === "CALL_ME"){

                        return <Feedback 
                            url={"http://public.local/feedback"}
                            successOkButtonClickHandler={() => {console.log("successOkButtonClickHandler");}}
                            hiddenFields={hiddenFields}
                            isCallMe={true}
                        />
                    }
                }, [isShowModal, modalChildrenType])}

                

            </Modal>
        
        </>
            
    );
    
};

export default Homepage;
        