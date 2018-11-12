// @flow
import * as React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import SubtaskRow from './SubtaskRow';
import SubtaskEdit from './SubtaskEdit';

type State ={
  subtask: Array<any>
};
type Props ={
  props:Object,
  subtaskOfTask:any,
  match:any
};

class Subtask extends React.Component<Props, State> {
  constructor(props:any) {
    super(props);
    this.state = {subtask:[]} ;

    (this:any).getSubTaskInfo = this.getSubTaskInfo.bind(this);
  }
  getSubTaskInfo(){
    axios.get('/subtasks')
     .then((response) => {
       this.setState({subtask: response.data})
     })
    .catch((error)=>{
       console.log(error);
    });
  }

  componentDidMount() {
    this.getSubTaskInfo();
   }

  render() {
      let subtaskOfTask = this.state.subtask
                .filter(subtask => subtask.taskId == this.props.match.params.taskId)
                .map(subtask=>
                   <SubtaskRow key={subtask.id} subtask={subtask}/>
                 )
    return (
      <div>
      <div className="container">
        <Switch>
          <Route exact path="/subtasks/details/:taskId" render={()=>(
            <div className="table-responsive">
            <table className="table table-default">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TaskId</th>
                  <th>Item</th>
                  <th>Done</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {subtaskOfTask}
              </tbody>
            </table>
            </div>
        )}/>
        <Route path="/subtasks/details/edit/:id" render={(props)=> (
            <SubtaskEdit getSubTaskInfo={this.getSubTaskInfo} {...this.state} {...props}/>
          )}/>
       </Switch>
      </div>
      </div>
    );
  }

}

export default Subtask;
