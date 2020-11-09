import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import * as schema from '../fixtures/values.schema.json'
import * as helmUIConfig from '../fixtures/helm-ui.json'
import HelmUI from 'helm-react-ui'
import './style.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      values: {}
    }
    this.setValues = this.setValues.bind(this);
  }

  setValues (values) {
    console.log('setting state')
    this.setState({ values: values })
  }

  render () {
    return (
      <div className="container mx-auto m-8">
        <HelmUI
          schema={schema.default}
          config={helmUIConfig.default}
          values={this.state.values}
          setValues={this.setValues}
        />
      </div>
    )
  }
}

export default hot(module)(App)
