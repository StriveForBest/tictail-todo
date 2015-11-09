'use strict';

var React = require('react');


var TodoListItem = React.createClass({
  handleCheck: function(event) {
    var isChecked = this.refs._checkbox.checked;
    this.props.onItemChange({id: this.props.children.id, completed: isChecked});
  },

  render: function() {
    return (
      <li className='list-group-item'>
        <div className='checkbox'>
          <label>
            <input type='checkbox' checked={this.props.children.completed}
                   ref='_checkbox' onChange={this.handleCheck} />
            {this.props.children.body}
          </label>
        </div>
      </li>
    );
  }
});

module.exports = TodoListItem;