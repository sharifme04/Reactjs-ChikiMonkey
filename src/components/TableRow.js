// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

const TableRow = ({task}:Object) => (
      <tr>
        <td>{task.id}</td>
        <td>{task.priority}</td>
        <td>{task.categoryId}</td>
        <td><Link to={`details/${task.id}`}>{task.name}</Link></td>
        <td><Link to={`subtasks/details/${task.id}`}><button type="button" className="btn btn-info"> Subtask Details {task.id}</button></Link></td>
        <td><Link to={`tasks/${task.id}`}><button type="button" className="btn btn-primary"> Edit {task.id}</button></Link></td>
      </tr>
    );

export default TableRow;
