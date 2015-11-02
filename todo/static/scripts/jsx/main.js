
/* [TODO APP] */
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: []};
  },

  updateItems: function(newItem) {
    var allItems = this.state.items.concat([newItem]);
    this.setState({items: allItems});
    this.updateCount();
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

var TodoFooter = React.createClass({
  render: function() {
    return (
      <div className='row'>
        <div className='col-sm-2 left'>
          <span>{this.props.items.length} items left</span>
        </div>
        <div className='col-sm-6 right'>
          <a href='#'>Mark all as complete</a>
        </div>
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
                   type='text' ref='item' onChange={this.onChange} value={this.state.item} />
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