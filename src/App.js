
import './App.css';

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  // Switch,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


// class App extends Component {
//   render() {
//     return (
//       <div>
        
//       </div>
//     );
//   }
// }

// export default App;

export default class App extends Component {
  // c = 'DarkRaider';
  pageSize = 5;
  apiKey = process.env.REACT_APP_NEWS_API;

  state =  {
    progress: 0
  }

  setProgress = (progress)=> {
    this.setState({progress: progress});
  }


  render() {
    return (
      <Router>
        <div>
          {/* Hello my first class based component {this.c} */}
          <NavBar/>
          {/* <News pageSize={5} country="in" category="general"/> */}
          {/* <Switch> */}
          <LoadingBar
          height={3}
          color='#f11946'
          progress={this.state.progress}
          // progress={progress}
          // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
          {/* <Route exact path="/" element={<News pageSize={5} country="in" category="general"/>}></Route> */}
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general"/>} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business"/>} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>} />
          <Route exact path="/general" element={<News  setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general"/>} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health"/>} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science"/>} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports"/>} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology"/>} />
        {/* </Switch> */}
        </Routes>
        </div>
      </Router>
    )
  }
}
{/* <Route path="/business"><News pageSize={5} country="in" category="general"/></Route>
<Route path="/entertainment"><News pageSize={5} country="in" category="general"/></Route>
<Route path="/general"><News pageSize={5} country="in" category="general"/></Route>
<Route path="/health"><News pageSize={5} country="in" category="general"/></Route>
<Route path="/science"><News pageSize={5} country="in" category="general"/></Route>
<Route path="/sports"><News pageSize={5} country="in" category="general"/></Route>
<Route path="/technology"><News pageSize={5} country="in" category="general"/></Route> */}
{/* <Route path="/"><News pageSize={5} country="in" category="general"/></Route> */}


// React Component Lifecycle

// The series of events that happen from the mounting of a React componet to its Unmounting
// 1. Mounting - Birth of your component
// 2. Update - Growth of your component
// 3. Unmount - Death of your component

// Methods in React Component Lifecycle
// 1. The render() method is used to render HTML of the component in react. This method is required for a class based component to render the DOM. It runs during the mounting and updating of your component. render() method should be pure ie you cannot modify state inside it!
// 2. The componentDidMount() method runs after the component output has been rendered to the DOM.
// 3. The componentDidUpdate() method is invoked as soon as the updating happens. The most common use case for the componentDidUpdate() method is updating the DOM in response to prop or state changes.
// 4. The componentWillUnmount() lifecycle method is called just before the component is unmounted and destroyed. Usually used to perform cleanups

// See  diagram of React lifecycle method diagram by wojtekmaj.pl also see it's web version.
// https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

// Hooks in React - Code with Harry

// What are React Hooks?
// 1. Features of Class based components in function based components
// 2. It allows you to use state and other React features without writing a class.
// 3. Hooks are the functions which "hook into" React state and lifecycle features from function components

// Commonly used React Hooks
// 1. useState
// 2. useEffect // used to replace componentDidMount if need to convert from class based to function based
// 3. useContext
// 4. useRef
