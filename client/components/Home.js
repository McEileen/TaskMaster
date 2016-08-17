/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs */

import React from 'react';
import axios from 'axios';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    // const authorization = `JWT ${localStorage.getItem('token')}`;
    this.state = { task: [] };
  }

  componentWillMount() {
    axios.get('//localhost:9001/api/tasks', { headers: { authorization: this.state.authorization } })
    .then((rsp) => {
      this.setState({ task: rsp.data.content });
    });
  }

  create(e) {
    e.preventDefault();
    const name = this.refs.name.value;
    const category = this.refs.category.value;
    const due = this.refs.due.value;
    axios.post('http://localhost:9001/api/tasks', { name, category, due }, { headers: { authorization: this.state.authorization } })
   .then((rsp) => {
     this.setState({ task: [...this.state.task, rsp.data.content.task] });
   });
  }


  render() {
    return (
      <div>

        <h1>Task</h1>

        <div className="row">
          <div className="col-xs-3">
           <form>
             <div className="form-group">
               <label htmlFor="name">Name</label>
               <input ref="name" type="text" className="form-control" id="name" />
             </div>

             <div className="form-group">
               <label htmlFor="category">Category</label>
               <input ref="category" type="text" className="form-control" id="category" />
             </div>


             <div className="form-group">
               <label htmlFor="due">Due</label>
               <input ref="due" type="text" className="form-control" id="due" />
             </div>

             <button onClick={this.create} type="submit" className="btn btn-default">Create</button>
           </form>
         </div>
         <div className="col-xs-9">
         </div>
       </div>

       <div className="row">
         <div className="col-xs-3">
           <table className="table table-striped">
             <thead>
               <tr>
                 <th>Task</th>
               </tr>
             </thead>
             <tbody>

               {this.state.task.map(t => (
                 <tr key={t._id}>
                   <td>{t.name}</td>
                   <td>{t.category}</td>
                   <td>{t.due}</td>
                   <td>{t.isComplete}</td>
                 </tr>
               ))}

             </tbody>
           </table>
         </div>
         <div className="col-xs-9"></div>
       </div>

     </div>
   );
 }
}
