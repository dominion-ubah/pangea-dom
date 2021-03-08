import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <>
        <nav class="navbar navbar-dark bg-dark">
          <div class="container-fluid">
            <a className="navbar-brand mr-auto pl-md-5" href="/">
              <span className="pl-md-5 pl-5">Lumin</span>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
        <div class="collapse" id="navbarToggleExternalContent">
          <div class="bg-dark p-4">
            <h5 class="text-white h4">Collapsed content</h5>
            <span class="text-muted">Toggleable via the navbar brand.</span>
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
