import './sticky-footer.css';
import React, { PureComponent } from 'react';
import axios from 'axios';

export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: undefined,
      projectId: '',
      codename: '',
      url: '',
    };
  }

  render() {
    return (
      <div>
        <div className="container">
          <section id="app-content">
            <div className="row">
              <div className="col-xs-4">
                <div className="form-group">
                  <span>
                    Project id:
                  </span>
                  <input
                    className="form-control"
                    value={this.state.projectId}
                    onChange={this.onProjectIdChange}
                    title="projectId"
                  />
                  <span>
                    Item codename:
                  </span>
                  <input
                    className="form-control"
                    value={this.state.codename}
                    onChange={this.onCodenameChange}
                    title="codename"
                  />
                  <span>
                    Flow URL:
                  </span>
                  <input
                    className="form-control"
                    value={this.state.url}
                    onChange={this.onUrlChange}
                    title="url"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => this.sendRequest()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            {JSON.stringify(this.state.data)}
          </section>
        </div>
      </div>
    );
  }

  sendRequest = () => {
    axios.post('http://msflow.azurewebsites.net/api/v1/flow', {
      projectId: this.state.projectId,
      codename: this.state.codename,
      url: this.state.url,
    })
      .catch(error => console.log(error));
    axios.get('http://msflow.azurewebsites.net/api/v1/sample/' + this.state.projectId + '/' + this.state.codename)
      .then(response => {
        this.setState(() => ({
          data: response.data,
        }));
      })
      .catch(error => console.log(error));
    this.setState({
      projectId: '',
      codename: '',
      url: '',
    });
  };

  onProjectIdChange = (event) => {
    this.setState({
      projectId: event.currentTarget.value,
    });
  };

  onCodenameChange = (event) => {
    this.setState({
      codename: event.currentTarget.value,
    });
  };

  onUrlChange = (event) => {
    this.setState({
      url: event.currentTarget.value,
    });
  };
}
