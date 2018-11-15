// @flow
import * as React from 'react';
import axios from 'axios';

type State ={
  id:number,
  taskId:number,
  subtaskname : string,
  checklist:Boolean
};
type Props ={
  props:Object,
  subtask:Array<any>,
  match:any,
  history:any,
  getSubTaskInfo:Function
};

class SubtaskEdit extends React.Component<Props, State> {
  constructor(props:any) {
    super(props);
    (this:any).subtasksData = this.props.subtask.filter(subtask => subtask.id == this.props.match.params.id);
    this.state = {
      id:(this:any).subtasksData[0].id,
      taskId:(this:any).subtasksData[0].taskId,
      subtaskname:(this:any).subtasksData[0].item,
      checklist: (this:any).subtasksData[0].done
    };

    (this:any).handleInputChange = this.handleInputChange.bind(this);
    (this:any).handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event:Object) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(event:Object) {
    console.log(this.state.subtaskname);
    event.preventDefault();
    axios.patch('/subtasks/'+this.props.match.params.id,{
      item: this.state.subtaskname,
      done: this.state.checklist
    })
     .then((response) => {
       this.props.getSubTaskInfo();
       console.log( response.data);
     })
    .catch((error)=>{
       console.log(error);
    });
      this.props.history.push('/subtasks/details/'+this.state.taskId);
  }

  render() {
    return (
      <div className="container">
      <form onSubmit={this.handleSubmit}>
       <div className="form-group">
        <label>
          Name:
        </label>
          <input
            name="subtaskname"
            className="form-control"
            type="text"
            value={this.state.subtaskname}
            onChange={this.handleInputChange} />
        </div>
        <div className="checkbox">
         <label>
           <input
             name="checklist"
             type="checkbox"
             checked={this.state.checklist}
             onChange={this.handleInputChange} />
          </label>
         </div>
        <input type="submit" className="btn btn-info" value="Update" />
      </form>
      </div>
    );
  }

}

export default SubtaskEdit;
