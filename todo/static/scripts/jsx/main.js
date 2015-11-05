// TODO: split into separate components files

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
        this.setState({tasks: data});
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
        this.setState({tasks: data});
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
})

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
})

var TodoList = React.createClass({
  render: function() {
    var that = this;
    var createItem = function(item) {
      return (
        // TODO:: find a better way
        <TodoListItem {...that.props} key={item.id}>{item}</TodoListItem>
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


var TodoListItem = React.createClass({
  handleCheck: function(event) {
    var isChecked = this.refs._checkbox.checked;
    this.props.onItemChange({id: this.props.children.id, completed: isChecked});
    return;
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


var TodoForm = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var itemBody = this.refs._input.value.trim();
    if (!itemBody) {
      return;
    }

    this.props.onItemSubmit({body: itemBody});
    this.refs.body.value = '';
    return;
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

ReactDOM.render(
  <TodoApp url='/todo/api/v1.0/tasks' pollInterval='2000' />,
  document.getElementById('todo-wrapper')
);
