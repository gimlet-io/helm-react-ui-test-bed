import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
// import * as schema from '../fixtures/namespaces/values.schema.json'
// import * as helmUIConfig from '../fixtures/namespaces/helm-ui.json'
import * as schema from '../fixtures/onechart/values.schema.json'
import * as helmUIConfig from '../fixtures/onechart/helm-ui.json'
import HelmUI from 'helm-react-ui'
import './style.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      values: {
        vars: {
          myvar: "myvalue",
          myvar2: "myvalue2",
        }
      },
      nonDefaultValues: {}
    }
    this.setValues = this.setValues.bind(this);
  }

  validationCallback (errors) {
    if (errors) {
      console.log(errors);
    }
  };

  setValues (values, nonDefaultValues) {
    this.setState({ values: values, nonDefaultValues: nonDefaultValues })
  }

  render () {

    const CustomDescription = (props) => {
      const {description} = props
      return (
        <p className="text-sm text-gray-500">{description}</p>
      )
    }

    const CustomTitle = (props) => {
      const {title} = props
      return (
        <label className="block text-sm font-medium leading-5 text-gray-700">
          {title} hello
        </label>
      )
    }

    const customFields = {
      DescriptionField: CustomDescription,
      TitleField: CustomTitle,
      imageWidget: ImageWidget,
    }

    return (
      <div>
        <div className="fixed bottom-0 right-0">
          <span className="inline-flex rounded-md shadow-sm m-8">
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-red-700 transition ease-in-out duration-150"
              onClick={() => {console.log(this.state.values); console.log(this.state.nonDefaultValues)}}
            >
              Log the YAML
            </button>
          </span>
        </div>
        <div className="container mx-auto m-8">
          <HelmUI
            schema={schema.default}
            config={helmUIConfig.default}
            values={this.state.values}
            setValues={this.setValues}
            validate={true}
            validationCallback={this.validationCallback}
            fields={customFields}
          />
        </div>
      </div>
    )
  }
}

export default hot(module)(App)

// Define a custom component for handling the root position object
class ImageWidget extends Component {
  constructor(props) {
    super(props);
    console.log(props)

    const strategy = this.extractStrategyFromValue(props.formData)

    this.state = {
      strategy: strategy,
      ...props.formData
    };
    console.log(this.state)
  }

  extractStrategyFromValue(formData) {
    const hasVariable = false
    const pointsToBuiltInRegistry = false
    const hasDockerfile = false

    if (!hasVariable) {
      return "static"
    } else {
      if (!pointsToBuiltInRegistry) {
        return "dynamic"
      } else {
        if (hasDockerfile) {
          return "dockerfile"
        } else {
          return "buildpacks"
        }
      }
    }
  }

  onChange(name) {
    return (event) => {
      console.log(event.target.value)
      this.setState(
        {
          [name]: event.target.value,
        },
        () => this.props.onChange(this.state)
      );
    };
  }

  render() {
    const { strategy, repository, tag, dockerfile } = this.state;
    return (
      <>
      <div className="form-group field field-object">
        <fieldset id="root">
          <legend id="root__title">Image</legend>
          <p id="root__description" className="field-description">The image to deploy</p>
          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-4 px-2">
            <div 
              className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${strategy === "static" ? "border-indigo-600" : ""}`}
              onClick={() => this.setState({strategy: "static"})}
              >
              <span className="flex flex-1">
                <span className="flex flex-col">
                  <span id="project-type-0-label" className="block text-sm font-medium text-gray-900 select-none">Static image tag</span>
                  <span id="project-type-0-description-0" className="mt-1 flex items-center text-sm text-gray-500 select-none">If you want to deploy a specific version of an existing image</span>
                </span>
              </span>
              <svg className={`absolute top-0 right-0 m-4 h-5 w-5 text-indigo-600 ${strategy === "static" ? "" : "hidden"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
            </div>

            <div
              className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${strategy === "dynamic" ? "border-indigo-600" : ""}`}
              onClick={() => this.setState({strategy: "dynamic"})}
              >
              <span className="flex flex-1">
                <span className="flex flex-col">
                  <span id="project-type-0-label" className="block text-sm font-medium text-gray-900 select-none">Dynamic image tag</span>
                  <span id="project-type-0-description-0" className="mt-1 flex items-center text-sm text-gray-500 select-none">If CI builds an image and tags it with the git hash, tag or other dynamic identifier</span>
                </span>
              </span>
              <svg className={`absolute top-0 right-0 m-4 h-5 w-5 text-indigo-600 ${strategy === "dynamic" ? "" : "hidden"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
            </div>

            <div
              className={`relative pr-8 flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${strategy === "buildpacks" ? "border-indigo-600" : ""}`}
              onClick={() => this.setState({strategy: "buildpacks"})}
              >
              <span className="flex flex-1">
                <span className="flex flex-col">
                  <span id="project-type-0-label" className="block text-sm font-medium text-gray-900 select-none">Automatic image building</span>
                  <span id="project-type-0-description-0" className="mt-1 flex items-center text-sm text-gray-500 select-none">If you want Gimlet to build an image from source code</span>
                </span>
              </span>
              <svg className={`absolute top-0 right-0 m-4 h-5 w-5 text-indigo-600 ${strategy === "buildpacks" ? "" : "hidden"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
            </div>

            <div
              className={`relative pr-8 flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${strategy === "dockerfile" ? "border-indigo-600" : ""}`}
              onClick={() => this.setState({strategy: "dockerfile"})}
              >
              <span className="flex flex-1">
                <span className="flex flex-col">
                  <span id="project-type-0-label" className="block text-sm font-medium text-gray-900 select-none">Using a Dockerfile</span>
                  <span id="project-type-0-description-0" className="mt-1 flex items-center text-sm text-gray-500 select-none">If there is a Dockerfile in your source code and want Gimlet to build it</span>
                </span>
              </span>
              <svg className={`absolute top-0 right-0 m-4 h-5 w-5 text-indigo-600 ${strategy === "dockerfile" ? "" : "hidden"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
            </div>

          </div>
          <div className="form-group field field-string">
            <label className="control-label" for="root_repository">Repository<span className="required">*</span></label>
            <input className="form-control" id="root_repository" label="Repository" required="" placeholder="" type="text" list="examples_root_repository" value={repository} onChange={this.onChange('repository')} />
            <datalist id="examples_root_repository"><option value="nginx"></option></datalist>
          </div>
          <div className="form-group field field-string">
            <label className="control-label" for="root_tag">Tag<span className="required">*</span></label>
            <input className="form-control" id="root_tag" label="Tag" required="" placeholder="" type="text" list="examples_root_tag" value={tag}  onChange={this.onChange('tag')}/>
            <datalist id="examples_root_tag"><option value="latest"></option><option value="1.19.3"></option></datalist>
          </div>
        </fieldset>
      </div>
      </>
    );
  }
}
