'use strict';

var React = require('react');
var TodoListItem = require('./TodoListItem.jsx');

var TodoList = React.createClass({
  render: function() {
    var that = this;
    var createItem = function(item) {
      var tmpId = Math.random().toString(36).substr(2, 10);

      return (
        // TODO:: find a better way
        <TodoListItem {...that.props} key={tmpId}>{item}</TodoListItem>
      );
    };
    return (
      <div className='row'>
        <div className='form-group col-sm-8'>
          <ul className='list-group'>{this.props.tasks.map(createItem)}</ul>
        </div>
      </div>
    );
  }
});

module.exports = TodoList;