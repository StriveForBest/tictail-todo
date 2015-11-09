'use strict';

var React = require('react');
var $ = require('jquery');


var MarkAll = React.createClass({
  handleMarkAllReadClick: function(event) {
    event.preventDefault();
    // TODO:: mainain state instead of one action, not RESTful :/
    var url = '/todo/api/v1.0/tasks/mark-all';
    $.ajax({
      // TODO:: get it from props.url
      url: url,
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      type: 'put',
      // data: JSON.stringify(),
      success: function(data) {
        this.setState({tasks: data.tasks});
        console.log('Marked all as complete');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className='col-sm-6 text-right'>
        <a onClick={this.handleMarkAllReadClick} href='#'>Mark all as complete</a>
      </div>
    )
  }
});

var TodoFooter = React.createClass({
  render: function() {
    var that = this;
    var getRemainingCount = function() {
      return that.props.tasks.filter(function(item) {
        return ! item.completed;
      }).length;
    };
    return (
      <div className='row'>
        <div className='col-sm-2'>
          <span>{getRemainingCount()} items left</span>
        </div>
        <MarkAll />
      </div>
    )
  }
});

module.exports = TodoFooter;

