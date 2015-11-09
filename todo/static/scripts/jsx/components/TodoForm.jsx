'use strict';

var React = require('react');

var TodoForm = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var itemBody = this.refs._input.value.trim();
    if (!itemBody) {
      return;
    }

    this.props.onItemSubmit({body: itemBody});
    this.refs._input.value = '';
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='row'>
          <div className='form-group col-sm-6'>
            <input className='form-control input-normal' placeholder='What needs to be done?'
                   type='text' ref='_input' required />
          </div>
          <input className='btn btn-default cols-sm-2' type='submit' value='Add Todo' />
        </div>
      </form>
    );
  }
});

module.exports = TodoForm;