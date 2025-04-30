import { useEffect, useState } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
function Dashboard() 
{
    const [tasks, setTasks]= useState([]);
    const [task, setTask] = useState({ No : 0,
                                       Assigned_To : "",
                                       status : "Not Started",
                                       Due_Date : "",
                                       Priority : "",
                                       Comments : ""});

    const [searchText, setSearchText] = useState("");

    const GetData = ()=>{
        axios.get("http://localhost:4444/task")
             .then((result)=>{
                setTasks(result.data);
             });
    }

    const ClearBoxes = ()=>{
        setTask({
            No : 0,
            Assigned_To : "",
            status : "Not Started",
            Due_Date : "",
            Priority : "",
            Comments : ""});
    }

    useEffect(()=>{
      GetData();
    }, []);

    const OnSearchTextChange = (args)=>{
        setSearchText(args.target.value);
    }

    const OnTextChange = (args)=>{
        var copy = {...task};
        copy[args.target.name] = args.target.value;
        setTask(copy);
    }

    const AddRecord =()=>{
        axios.post("http://localhost:4444/tasks", task)
             .then((result)=>
             {
                    if(result.data.affectedRows>0)
                    {
                        GetData();
                        ClearBoxes();
                    }
             })
    }

    const UpdateRecord =()=>{
        axios.put( `http://localhost:4444/task/${task.No}`,task)
             .then((result)=>{
            if(result.data.affectedRows>0)
            {
                GetData();
                ClearBoxes();
            }
            })

    }

     const Delete =(No)=>{
          axios.delete( `http://localhost:4444/task/${No}`)
               .then((result)=>{
                if(result.data.affectedRows>0)
                {
                    GetData();
                    ClearBoxes();
                }
            })
    }

    const Edit=(No)=>{
        for(let i =0;i<tasks.length ;i++)
        {
            if(tasks[i].No == No)
            {
                setTask(tasks[i]);
                break;
            }
        }
    }

    return (<div className="container">
                <br/><br/>
                <center>
                   <div className="table-responsive">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>Assigned To</td>
                                    <td>
                                        <input type="text"
                                            name="Assigned_To"
                                            value={task.Assigned_To}
                                            onChange={OnTextChange}/>
                                    </td>
                                </tr>

                                  <tr>
                                    <td>status</td>
                                    <td>
                                        <input type="text"
                                            name="status"
                                            value={task.status}
                                            onChange={OnTextChange}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Due_Date</td>
                                    <td>
                                        <input type="text"
                                            name="Due_Date"
                                            value={task.Due_Date}
                                            onChange={OnTextChange}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Priority</td>
                                    <td>
                                        <input type="text"
                                            name="Priority"
                                            value={task.Priority}
                                            onChange={OnTextChange}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Comments</td>
                                    <td>
                                        <input type="text"
                                            name="comments"
                                            value={task.Comments}
                                            onChange={OnTextChange}/>
                                    </td>
                                </tr>


                                

                                 <tr>
                                    <td colSpan={2}>
                                       <button className="btn btn-primary" onClick={AddRecord}>Add Task</button>
                                        {" "}

                                       <button className="btn btn-info" onClick={ClearBoxes}>Clear</button>
                                        {" "}
                                        <button className="btn btn-success" onClick={UpdateRecord}>Update</button>
                                    </td>
                                </tr>
                            </tbody>
                         </table>
                   </div>
                </center>
                <hr></hr>

                <center>
                  Search :   
                  <input type="text" value={searchText}
                        onChange={OnSearchTextChange}/>
                </center>
                <hr></hr>
                <div className="table-responsive">
                    <table className="table table-bordered text-center">
                        <tbody>
                            {
                                tasks.map((t)=>{
                                   if(t.Address.toLowerCase().includes(searchText.toLowerCase()))
                                   {
                                     return (<tr key={t.No}>
                                              <td>{t.No}</td>
                                              <td>{t.Assigned_To}</td>
                                              <td>{t.status}</td>
                                              <td>{t.Due_Date}</td>
                                              <td>{t.Priority}</td>
                                              <td>{t.Comments}</td>
                                              <td>
                                                <button className="btn btn-warning" 
                                                onClick={()=>{
                                                    Edit(t.No)
                                                }}>Edit</button>
                                              </td>

                                              <td>
                                                <button className="btn btn-danger" onClick={()=>{
                                                    Delete(t.No)
                                                }}>Delete</button>
                                              </td>
                                           </tr>)
                                   }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>);
}

export default Dashboard;