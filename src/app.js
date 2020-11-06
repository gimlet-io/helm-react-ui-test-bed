import React, { Component} from "react";
import {hot} from "react-hot-loader";
import * as schema from '../fixtures/values.schema.json'
import * as helmUIConfig from '../fixtures/helm-ui.json'
import HelmUI from 'helm-react-ui'
import './style.css';

class App extends Component{
  render(){
    return(
      <div className="container mx-auto m-8">
        <HelmUI
          schema={schema.default}
          config={helmUIConfig.default}
        />
      </div>
    );
  }
}

export default hot(module)(App);
