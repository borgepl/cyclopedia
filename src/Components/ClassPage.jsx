import React from "react";
import { getRandomUser } from "../Utility/api";
import Instructor from "./Instructor";

class ClassPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            instructor: undefined,
            studentList: [],
            studentCount: 0,
            hideInstructor: false
        }
    }

    componentDidMount = async() => {
        console.log("Component Did Mount");
        if (JSON.parse(localStorage.getItem("cyclopediaState"))) {
            this.setState(JSON.parse(localStorage.getItem("cyclopediaState")));
        } else {
        
            const response = await getRandomUser();
            console.log(response);
            this.setState((prevState) => {
            return {
                instructor : {
                    name: response.data.first_name + " " + response.data.last_name,
                    email: response.data.email,
                    phone: response.data.phone_number,
                    avatar: response.data.avatar
                }
            };
            });
        }
    }

    componentDidUpdate = async(prevProps, prevState) => {
        console.log("Component Did Update");
        localStorage.setItem("cyclopediaState", JSON.stringify(this.state));
        if (this.state.studentCount > prevState.studentCount) {
            const response = await getRandomUser();
            this.setState((prevState) => {
                return {
                    studentList: [
                        ...prevState.studentList, {
                            name: response.data.first_name + " " + response.data.last_name
                        }
                    ]
                }
            })
        } else if (this.state.studentCount < prevState.studentCount) {
            this.setState((prevState) => {
                return {
                    studentList: []
                }
            })
        }
    }

    componentWillUnmount() {
        console.log("Component will Mount");
    }

    handleAddStudent = () => {
        this.setState((prevState) => {
            return {
                studentCount: prevState.studentCount+1
            }
        });
    }

    handleRemoveAllStudent = () => {
        this.setState((prevState) => {
            return {
                studentCount: 0
            }
        });
    }

    handleHideClick = () => {
        this.setState((prevState) => {
            return {
                hideInstructor: (!prevState.hideInstructor)
            }
        });
    }

    render() {
        console.log("Render Component");
        return(
            <div className="p-3">
                <span className="h4 text-success pe-2">Instructor</span>
                <i className={`bi ${this.state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"}  
                    btn btn-success btn-sm`}
                    onClick={this.handleHideClick}></i>
                <br/>
                {this.state.instructor && (
                    <Instructor hide={this.state.hideInstructor} instructor={this.state.instructor}/>
                )}
                <div className="pt-2">
                    <span className="h4 text-success">Students</span>
                    <div>Students count : {this.state.studentCount}</div>
                    <button className="btn btn-success btn-sm"
                    onClick={this.handleAddStudent}>Add Student</button>
                    <button className="btn btn-danger btn-sm ms-2"
                    onClick={this.handleRemoveAllStudent}>Remove All Students</button>
                    
                    {this.state.studentList.map((student,index) => {
                        return (
                            <div key={index}>
                                - {student.name}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

}

export default ClassPage;