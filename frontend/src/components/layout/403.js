import React, { Component } from "react";

export class NoPermission extends Component {
  render() {
    return (
      <div>
        <h3>
          No permission for <code>to access the path you clicked.</code>
        </h3>
      </div>
    );
  }
}
