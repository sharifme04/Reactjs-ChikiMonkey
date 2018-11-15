// @flow
import * as React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import TableRow from './components/TableRow';
import TaskDetails from './components/TaskDetails';
import FormEdit from './components/FormEdit';
import Subtask from './components/Subtask';
import './App.css';

type State ={
  search : string,
  tasks:  Array<any>
};
type Props ={
  props:Object
};

class App extends React.Component<Props, State> {
  constructor(props:any) {
    super(props);
    this.state = {tasks:[], search:""};

    (this:any).getTaskInfo = this.getTaskInfo.bind(this);
    (this:any).handleChange = this.handleChange.bind(this);
  }

  getTaskInfo(){
    axios.get('/tasks')
     .then((response) => {
       this.setState({tasks: response.data})
     })
    .catch((error)=>{
       console.log(error);
    });
  }

  componentDidMount() {
       this.getTaskInfo();
   }

 handleChange(event:Object){
    this.setState({ search : event.target.value });
  }
  render() {
    const {search} = this.state;
    let Tasks = this.state.tasks
     .filter(task=>{
       return task.name.toLowerCase().indexOf( search.toLowerCase() ) !== -1 || task.priority.toLowerCase().indexOf( search.toLowerCase() ) !== -1
     })
     .sort((x, y) =>{
        if (x.priority ==="high") {
          return 1;
        }
        if ( y.priority ==="high") {
          return -1;
        }
          return 0;
        })
      .reverse()
      .map(task=>
             <TableRow key={task.id} task={task}/>
           )
    return (
      <div>
        <div className="container">
        <h1>Reactjs App: api get edit details</h1>
        <hr/>
          <Switch>
            <Route exact path="/" render={()=>(
              <div>
              <div className="input-group">
                <input
                type="text"
                className="form-control"
                placeholder="Search by name and priority "
                name="search"
                onChange={this.handleChange}
                />
              </div>
              <div className="table-responsive">
              <table className="table table-default">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Priority</th>
                    <th>CategoryId</th>
                    <th>Name/Details</th>
                    <th>Subtask</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {Tasks}
                </tbody>
              </table>
              </div>
              </div>
          )}/>
           <Route  path="/details/:taskId" render={(props)=> (
               <TaskDetails {...this.state} {...props}/>
             )}/>

           <Route path="/tasks/:taskIdEdit" render={(props)=> (
               <FormEdit getTaskInfo={this.getTaskInfo} {...this.state} {...props}/>
             )}/>

           <Route path="/subtasks/details/:taskId" render={(props)=> (
               <Subtask {...this.state} {...props}/>
             )}/>
         </Switch>
        </div>
      </div>
    );
  }
}

export default App;
