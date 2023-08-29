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
    this.state = { ...props.formData };
    console.log(this.state)
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
    const { repository, tag } = this.state;
    return (
      <>
      <div class="form-group field field-object">
        <fieldset id="root">
          <legend id="root__title">Image</legend>
          <p id="root__description" class="field-description">The image to deploy</p>
          <div class="form-group field field-string">
            <label class="control-label" for="root_repository">Repository<span class="required">*</span></label>
            <input class="form-control" id="root_repository" label="Repository" required="" placeholder="" type="text" list="examples_root_repository" value={repository}/>
            <datalist id="examples_root_repository"><option value="nginx"></option></datalist>
          </div>
          <div class="form-group field field-string">
            <label class="control-label" for="root_tag">Tag<span class="required">*</span></label>
            <input class="form-control" id="root_tag" label="Tag" required="" placeholder="" type="text" list="examples_root_tag" value={tag}/>
            <datalist id="examples_root_tag"><option value="latest"></option><option value="1.19.3"></option></datalist>
          </div>
        </fieldset>
      </div>

      <div>
        <fieldset>
          <legend class="text-base font-semibold leading-6 text-gray-900">Image options</legend>

          <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
            {/* <!-- Active: "border-indigo-600 ring-2 ring-indigo-600", Not Active: "border-gray-300" --> */}
            <label class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
              <input type="radio" name="project-type" value="Newsletter" class="sr-only" aria-labelledby="project-type-0-label" aria-describedby="project-type-0-description-0 project-type-0-description-1" />
              <span class="flex flex-1">
                <span class="flex flex-col">
                  <span id="project-type-0-label" class="block text-sm font-medium text-gray-900">Static image tag</span>
                  <span id="project-type-0-description-0" class="mt-1 flex items-center text-sm text-gray-500">If you want to deploy a specific version of an existing image</span>
                </span>
              </span>
              {/* <!-- Not Checked: "invisible" --> */}
              <svg class="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              {/* <!--
                Active: "border", Not Active: "border-2"
                Checked: "border-indigo-600", Not Checked: "border-transparent"
              --> */}
              <span class="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
            </label>

            {/* <!-- Active: "border-indigo-600 ring-2 ring-indigo-600", Not Active: "border-gray-300" --> */}
            <label class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
              <input type="radio" name="project-type" value="Existing Customers" class="sr-only" aria-labelledby="project-type-1-label" aria-describedby="project-type-1-description-0 project-type-1-description-1" />
              <span class="flex flex-1">
                <span class="flex flex-col">
                  <span id="project-type-1-label" class="block text-sm font-medium text-gray-900">Dynamic image tag</span>
                  <span id="project-type-1-description-0" class="mt-1 flex items-center text-sm text-gray-500">If CI builds an image and tags it with the git hash, tag or other dynamic identifier</span>
                </span>
              </span>
              {/* <!-- Not Checked: "invisible" --> */}
              <svg class="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              {/* <!--
                Active: "border", Not Active: "border-2"
                Checked: "border-indigo-600", Not Checked: "border-transparent"
              --> */}
              <span class="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
            </label>

            {/* <!-- Active: "border-indigo-600 ring-2 ring-indigo-600", Not Active: "border-gray-300" --> */}
            <label class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
              <input type="radio" name="project-type" value="Trial Users" class="sr-only" aria-labelledby="project-type-2-label" aria-describedby="project-type-2-description-0 project-type-2-description-1" />
              <span class="flex flex-1">
                <span class="flex flex-col">
                  <span id="project-type-2-label" class="block text-sm font-medium text-gray-900">Automatic image building</span>
                  <span id="project-type-2-description-0" class="mt-1 flex items-center text-sm text-gray-500">If you want Gimlet to build an image from source code</span>
                </span>
              </span>
              {/* <!-- Not Checked: "invisible" --> */}
              <svg class="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              {/* <!--
                Active: "border", Not Active: "border-2"
                Checked: "border-indigo-600", Not Checked: "border-transparent"
              --> */}
              <span class="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
            </label>

                        {/* <!-- Active: "border-indigo-600 ring-2 ring-indigo-600", Not Active: "border-gray-300" --> */}
            <label class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
              <input type="radio" name="project-type" value="Trial Users" class="sr-only" aria-labelledby="project-type-2-label" aria-describedby="project-type-2-description-0 project-type-2-description-1" />
              <span class="flex flex-1">
                <span class="flex flex-col">
                  <span id="project-type-2-label" class="block text-sm font-medium text-gray-900">Using a Dockerfile</span>
                  <span id="project-type-2-description-0" class="mt-1 flex items-center text-sm text-gray-500">If there is a Dockerfile in your source code and want Gimlet to build it</span>
                </span>
              </span>
              {/* <!-- Not Checked: "invisible" --> */}
              <svg class="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              {/* <!--
                Active: "border", Not Active: "border-2"
                Checked: "border-indigo-600", Not Checked: "border-transparent"
              --> */}
              <span class="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
            </label>

          </div>
        </fieldset>
        <input value={repository} onChange={this.onChange('repository')} />
        <input value={tag} onChange={this.onChange('tag')} />
      </div>
      </>
    );
  }
}
