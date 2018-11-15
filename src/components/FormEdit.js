// @flow
import * as React from 'react';
import axios from 'axios';

type State ={
  taskname:string,
  dueDate:any,
  priority : string,
  categoryId:number
};
type Props ={
  props:Object,
  tasks:Array<any>,
  match:any,
  history:any,
  getTaskInfo:Function
};

class FormEdit extends React.Component<Props, State> {
  constructor(props:any){
    super(props);
    (this:any).taskData = this.props.tasks.filter(task => task.id == this.props.match.params.taskIdEdit)

    this.state = {
      taskname: (this:any).taskData[0].name,
      priority: (this:any).taskData[0].priority,
      dueDate: (this:any).taskData[0].dueDate,
      categoryId: (this:any).taskData[0].categoryId
    };

    (this:any).handleInputChange = this.handleInputChange.bind(this);
    (this:any).handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event:Object) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event:Object) {
    event.preventDefault();
    axios.put('/tasks/'+this.props.match.params.taskIdEdit,{
      name: this.state.taskname,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      categoryId: this.state.categoryId,
    })
     .then((response) => {
       this.props.getTaskInfo();
       console.log( response.data)
     })
    .catch((error)=>{
       console.log(error);
    });
      this.props.history.push('/');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
       <div className="form-group">
        <label>
          Name:
        </label>
          <input
            name="taskname"
            className="form-control"
            type="text"
            value={this.state.taskname}
            onChange={this.handleInputChange} />
        </div>
        <div className="form-group">
        <label>
          priority:
        </label>
          <input
            name="priority"
            type="text"
            className="form-control"
            value={this.state.priority}
            onChange={this.handleInputChange} />
        </div>
        <div className="form-group">
           <label>
            categoryId:
            </label>
            <input
              name="categoryId"
              type="text"
              className="form-control"
              value={this.state.categoryId}
              onChange={this.handleInputChange} />
        </div>
        <div className="form-group">
            <label>
              dueDate:
            </label>
            <input
              name="dueDate"
              type="text"
              className="form-control"
              value={this.state.dueDate}
              onChange={this.handleInputChange} />
          </div>
          <input type="submit" className="btn btn-primary" value="Update" />
        </form>
    );
  }

}

export default FormEdit;
