'use strict';

var $ = require('jquery');
var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');

var TodoForm = require('./components/TodoForm.jsx');
var TodoList = require('./components/TodoList.jsx');
var TodoFooter = require('./components/TodoFooter.jsx');


var TodoApp = React.createClass({
  getInitialState: function() {
    return {tasks: []};
  },

  componentDidMount: function() {
    this.loadItemsFromServer();
    setInterval(this.loadItemsFromServer, this.props.pollInterval);
  },

  loadItemsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({tasks: data.tasks});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleItemSubmit: function(item) {
    // display new item before talking to server
    var items = this.state.tasks;
    var newItems = items.concat([item]);
    this.setState({tasks: newItems});

    // send to the server
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      type: 'post',
      data: JSON.stringify(item, null, '\t'),
      success: function(data) {
        console.log('created task ', data.task.body);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleItemChange: function(item) {
    var that = this;

    // send to the server
    $.ajax({
      url: this.props.url + '/' + item.id,
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      type: 'put',
      data: JSON.stringify(item),
      success: function(data) {
        // TODO:: handle it as a state on the Item level
        _.findWhere(that.state.tasks, {'id': item.id}).completed = item.completed;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>
        <TodoForm onItemSubmit={this.handleItemSubmit} />
        <TodoList onItemChange={this.handleItemChange} tasks={this.state.tasks} />
        <TodoFooter tasks={this.state.tasks} />
      </div>
    );
  }
});

ReactDOM.render(
  <TodoApp url='/todo/api/v1.0/tasks' pollInterval='2000' />,
  document.getElementById('todo-wrapper')
);
