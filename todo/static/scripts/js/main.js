(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/* [TODO APP] */
var TodoApp = React.createClass({displayName: "TodoApp",
  getInitialState: function() {
    return {items: []};
  },

  updateItems: function(newItem) {
    var allItems = this.state.items.concat([newItem]);
    this.setState({items: allItems});
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(TodoForm, {onFormSubmit: this.updateItems}), 
        React.createElement(TodoList, {items: this.state.items}), 
        React.createElement(TodoFooter, {items: this.state.items})
      )
    );
  }
});

var MarkAll = React.createClass({displayName: "MarkAll",
  handleMarkAllReadClick: function(event) {
    event.preventDefault();
    console.log('Marked all as complete');
    $('input[type="checkbox"]').prop('checked', true);
  },

  componentDidMount: function() {
    // TODO:: there should be a better way
    this.getDOMNode().children[0].addEventListener('click', this.handleMarkAllReadClick);
  },

  render: function() {
    return (
      React.createElement("div", {className: "col-sm-6 text-right"}, 
        React.createElement("a", {href: "#"}, "Mark all as complete")
      )
    )
  }
})

var TodoFooter = React.createClass({displayName: "TodoFooter",
  render: function() {
    var updateCount = function() {
      var count;
      var $remainingTasks = $('input[type="checkbox"]:not(:checked)');
      // TODO:: make it pretty, preferrably with no jquery
      if (!!$remainingTasks.length) {
        count = $remainingTasks.length + 1
      } else {
        count = 0;
      }

      return count;
    };
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-sm-2"}, 
          React.createElement("span", null, updateCount(), " items left")
        ), 
        React.createElement(MarkAll, null, this.props.items)
      )
    )
  }
})

/* [TODO LIST] */
var TodoList = React.createClass({displayName: "TodoList",
  render: function() {
    var createItem = function(itemText) {
      return (
        React.createElement(TodoListItem, null, itemText)
      );
    };
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "form-group col-sm-8"}, 
          React.createElement("ul", {className: "list-group"}, this.props.items.map(createItem))
        )
      )
    );
  }
});


/* [TODO LISTITEM] */
var TodoListItem = React.createClass({displayName: "TodoListItem",
  render: function() {
    return (
      React.createElement("li", {className: "list-group-item"}, 
        React.createElement("div", {className: "checkbox"}, 
          React.createElement("label", null, 
            React.createElement("input", {type: "checkbox"}), 
            this.props.children
          )
        )
      )
    );
  }
});


/* [TODO FORM] */
var TodoForm = React.createClass({displayName: "TodoForm",
  getInitialState: function() {
    return {item: ''};
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state.item);
    this.setState({item: ''});

    ReactDOM.findDOMNode(this.refs.item).focus();
    return;
  },

  onChange: function(event) {
    this.setState({item: event.target.value});
  },

  render: function() {
    return (
      React.createElement("form", {onSubmit: this.handleSubmit}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "form-group col-sm-6"}, 
            React.createElement("input", {className: "form-control input-normal", placeholder: "What needs to be done?", 
                   type: "text", ref: "item", onChange: this.onChange, value: this.state.item, required: true})
          ), 
          React.createElement("input", {className: "btn btn-default cols-sm-2", type: "submit", value: "Add Todo"})
        )
      )
    );
  }
});

React.render(
  React.createElement(TodoApp, null),
  document.getElementById('todo-wrapper')
);


},{}]},{},[1])