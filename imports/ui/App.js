import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Tasks } from '../api/tasks'

import Task from './Task'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskText: ''
    }
  }

  changeTaskText = event => this.setState({ taskText: event.target.value })

  handleSubmit = () => {
    Tasks.insert({
      text: this.state.taskText,
      createdAt: new Date()
    })
    this.setState({ taskText: '' })
  }

  renderTasks() {
    return this.props.tasks.map(task => <Task key={task._id} task={task} />)
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
          <form className="new-task" onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.taskText}
              onChange={this.changeTaskText}
              placeholder="Type to add new tasks"
            />
          </form>
        </header>

        <ul>{this.renderTasks()}</ul>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
  }
})(App)
