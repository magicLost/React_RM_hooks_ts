import React, {useEffect, useMemo} from 'react';
import classes from './Homepage.module.scss';
import commonClasses from '../../../commonClasses.module.scss';
//import HomepageController from './Controller/HomepageController';
//import ThreeSectionsPageClasses from './Model/ThreeSectionsPageClasses';
import { usePage } from '../../../hooks/page';
import Modal from '../../../component/Modal/Modal';
import Feedback from '../../Forms/Feedback/Feedback';
import ControlsFeature from '../../ControlsFeature/ControlsFeature';
import {toolbarItemsArray, mainPresentationItemsControls} from './../../../data/homepage_data';

const Homepage = () => {

    const {controller, activeSectionIndex, isShowForm, formType, hiddenFields} = usePage(
        "HOMEPAGE", classes, commonClasses, 1, 0
    );

    useEffect(() => {

        console.log("useEffect");

        controller.onDidMount();

        window.addEventListener('popstate', controller.onPopstate, false);

        return () => { window.removeEventListener('popstate', controller.onPopstate, false); };

    }, []);

    console.log("render homepage", activeSectionIndex);

    const mainSectionClasses = controller.getMainSectionClasses();

    //console.log(window.location.hash);

   /*  window.addEventListener('hashchange', (event: any) => {

        console.log("newURL = ", event.newURL);
        console.log("oldURL = ", event.oldURL);

        console.log(window.location.hash);
    }); */

    return (
        
        <>
        
            <header>
                
                <button onClick={controller.onIncreaseActiveIndex}>Next</button>
                <button onClick={controller.onDecreaseActiveIndex}>Prev</button>

                <button onClick={controller.onShowFeedbackForm}>Feedback form</button>

                <hr />

            </header>

            <main>

                <section
                    className={mainSectionClasses}
                    style={(activeSectionIndex !== 1) ? { display: 'none'} : undefined}
                >

                    <h3>Main section</h3>
                    <br />
                    <hr />
                    <br />
                    <ControlsFeature
                        items={toolbarItemsArray}
                        itemClickHandler={(event) => {console.log("ControlsFeature itemClickHandler")}}
                        config={{
                            type: "TEXT",
                            formType: "BOTTOM_HALF_CIRCLE",
                            isShowTitle: false,
                            isMainItemText: false,
                            mainDivStyle: { top: 0 },
                            mainItemStyle: { backgroundColor: "white" }
                        }}
                    />

                    <br />
                    <br />
                    <hr />
                    <br />

                    <ControlsFeature
                        items={mainPresentationItemsControls}
                        itemClickHandler={(event) => {console.log("ControlsFeature itemClickHandler")}}
                        config={{
                            type: "SVG",
                            formType: "CIRCLE",
                            isShowTitle: true,
                            isMainItemText: false,
                            mainDivStyle: { top: 0 },
                            mainItemStyle: { backgroundColor: "white" }
                        }}
                    />

                </section>

                { controller.created[0] &&
                    <section
                        className={controller.getLeftSectionClasses()}
                        style={(activeSectionIndex !== 0) ? { display: 'none'} : undefined}
                    >

                        <h3>Portfolio section</h3>

                    </section>
                }

            </main>

            <footer>

                { controller.created[2] &&
                    <div
                        className={controller.getContactsSectionClasses()}
                        style={(activeSectionIndex !== 2) ? { display: 'none'} : undefined}
                    >

                        <h3>Contact section</h3>

                    </div>
                }

            </footer>

            <Modal
                show={isShowForm}
                backdropClickHandler={controller.onHideForm}
            >

                {useMemo(() => {

                    if(formType === "FEEDBACK" || formType === "WANNA_THE_SAME"){

                        return <Feedback 
                            url={"http://public.local/feedback"}
                            successOkButtonClickHandler={() => {console.log("successOkButtonClickHandler");}}
                            hiddenFields={hiddenFields}
                            isCallMe={false}
                        />
                    }else if(formType === "CALL_ME"){

                        return <Feedback 
                            url={"http://public.local/feedback"}
                            successOkButtonClickHandler={() => {console.log("successOkButtonClickHandler");}}
                            hiddenFields={hiddenFields}
                            isCallMe={true}
                        />
                    }
                }, [isShowForm, formType])}

                

            </Modal>
        
        </>
            
    );
    
};

export default Homepage;
        