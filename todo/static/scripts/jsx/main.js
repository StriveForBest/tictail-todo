
/* [TODO APP] */
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: []};
  },

  updateItems: function(newItem) {
    var allItems = this.state.items.concat([newItem]);
    this.setState({items: allItems});
  },

  render: function() {
    return (
      <div>
        <TodoForm onFormSubmit={this.updateItems}/>
        <TodoList items={this.state.items}/>
        <TodoFooter items={this.state.items}/>
      </div>
    );
  }
});

var MarkAll = React.createClass({
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
      <div className='col-sm-6 text-right'>
        <a href='#'>Mark all as complete</a>
      </div>
    )
  }
})

var TodoFooter = React.createClass({
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
      <div className='row'>
        <div className='col-sm-2'>
          <span>{updateCount()} items left</span>
        </div>
        <MarkAll>{this.props.items}</MarkAll>
      </div>
    )
  }
})

/* [TODO LIST] */
var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return (
        <TodoListItem>{itemText}</TodoListItem>
      );
    };
    return (
      <div className='row'>
        <div className='form-group col-sm-8'>
          <ul className='list-group'>{this.props.items.map(createItem)}</ul>
        </div>
      </div>
    );
  }
});


/* [TODO LISTITEM] */
var TodoListItem = React.createClass({
  render: function() {
    return (
      <li className='list-group-item'>
        <div className='checkbox'>
          <label>
            <input type='checkbox'/>
            {this.props.children}
          </label>
        </div>
      </li>
    );
  }
});


/* [TODO FORM] */
var TodoForm = React.createClass({
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
      <form onSubmit={this.handleSubmit}>
        <div className='row'>
          <div className='form-group col-sm-6'>
            <input className='form-control input-normal' placeholder='What needs to be done?'
                   type='text' ref='item' onChange={this.onChange} value={this.state.item} required />
          </div>
          <input className='btn btn-default cols-sm-2' type='submit' value='Add Todo' />
        </div>
      </form>
    );
  }
});

React.render(
  React.createElement(TodoApp, null),
  document.getElementById('todo-wrapper')
);
