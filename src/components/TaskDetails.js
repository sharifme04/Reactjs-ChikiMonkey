// @flow
import * as React from 'react';

type State ={
/**/
};
type Props ={
  props:Object,
  task:Object,
  id:number,
  tasks: Array<any>,
  match: any,
  priority:string,
  name:string,
  categoryId:number
};

class TaskDetails extends React.Component<Props, State> {
  constructor(props:any){
    super(props);
    (this:any).taskData = this.props.tasks.filter(task => task.id == this.props.match.params.taskId)
  }

  render() {
    const task = (this:any).taskData[0];
    return (
      <div className="row">
        <div className="col-sm-offset-3 col-sm-6">
          <div className="panel panel-primary ">
            <div className="panel-heading ">
               <p className="text-center">Details {task.name}</p>
            </div>
            <div className="panel-body">
              <div className="text-center">
                <p>id: {task.id}</p>
                <p>userId: {task.userId}</p>
                <p>name: {task.name}</p>
                <p>dueDate: {task.dueDate}</p>
                <p>priority: {task.priority}</p>
                <p>categoryId: {task.categoryId}</p>
              </div>
            </div>
           </div>
         </div>
        </div>
    );
  }

}

export default TaskDetails;
