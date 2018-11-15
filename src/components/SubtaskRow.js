// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

const SubtaskRow = ({subtask}:Object) =>(
      <tr>
        <td>{subtask.id}</td>
        <td>{subtask.taskId}</td>
        <td>{subtask.item}</td>
        <td><input type="checkbox" checked={subtask.done} disabled/></td>
        <td><Link to={`/subtasks/details/edit/${subtask.id}`}><button type="button" className="btn btn-info"> Edit Subtask {subtask.id}</button></Link></td>
      </tr>
    );

export default SubtaskRow;
