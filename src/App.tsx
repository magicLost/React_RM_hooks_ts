import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import Feedback from './container/Forms/Feedback/Feedback';
//import Modal from './component/Modal/Modal';
import Homepage from './container/Pages/Homepage/Homepage';
//import Test from './component/Test/Test';



function App() {
  return (
    <>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}

        <Homepage /> 
        {/* <Test />  */}

        {/*   <Modal
              show={true}
              backdropClickHandler={() => {console.log("backdropClickHandler");}}
          >

            <Feedback 
                url={"http://public.local/feedback"}
                successOkButtonClickHandler={() => {console.log("successOkButtonClickHandler");}}
                hiddenFields={[]}
            />

          </Modal> */}

    </>
  );
}

export default App;
