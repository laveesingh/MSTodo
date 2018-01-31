import React, { Component } from 'react'
import { Tasks } from '../api/tasks'

export default class Task extends Component {
  toggleChecked = () => {
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked }
    })
  }

  deleteTask = () => {
    Tasks.remove(this.props.task._id)
  }

  render() {
    let taskClassName = this.props.task.checked ? 'checked' : ''
    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteTask}>
          &times;
        </button>
        <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked}
        />
        <span className='text'>
          {this.props.task.text}
        </span>
      </li>
    )
  }
}
