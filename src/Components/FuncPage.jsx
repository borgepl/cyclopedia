import React, { useEffect, useRef, useState } from "react";
import Instructor from "./Instructor";
import { getRandomUser } from "../Utility/api-user";

const FuncPage = () => {

    const [state, setState] = useState(() => {
        return {
            instructor: undefined,
            studentList: [],
            studentCount: 0,
            hideInstructor: false
        }
    });

    //const [totalRender, setTotalRender] = useState(0);

    const totalRender = useRef(0);

    const handleAddStudent = () => {
        setState((prevState) => {
            return {
                ...prevState,
                studentCount: prevState.studentCount+1
            }
        });
    }

    useEffect(() => {
        // console.log("This is called on EVERY render");
        //setTotalRender((prevState) => prevState+1) // infinite loop !!!!
        totalRender.current = totalRender.current+1;
        console.log("Render : " + totalRender.current);
    });

    useEffect(  () => {
        console.log("This is called on Initial/First/Mount");

        const getUser = async() => {

            const response = await getRandomUser();
            console.log(response);
            setState((prevState) => {
            return {
                ...prevState,
                instructor : {
                name: response.data.results[0].name.first + " " + response.data.results[0].name.last,
                email: response.data.results[0].email,
                phone: response.data.results[0].phone,
                avatar: response.data.results[0].picture.thumbnail
                }
            };
            })
        };
        getUser();
        
    }, [])

    useEffect(  () => {
        console.log("This is called when student is added");

        const getUser = async() => {

            const response = await getRandomUser();
            console.log(response);
            setState((prevState) => {
            return {
                ...prevState,
                studentList: [
                    ...prevState.studentList, {
                        name: response.data.results[0].name.first + " " + response.data.results[0].name.last,
                    }
                ]
            };
            })
        };
        if (state.studentList.length < state.studentCount) {
            getUser();
        } else if  (state.studentList.length > state.studentCount) {
            setState((prevState) => {
                return {
                    ...prevState,
                    studentList: []
                }
            })
        }
        
    }, [state.studentCount, state.studentList])

    const handleRemoveAllStudent = () => {
        setState((prevState) => {
            return {
                ...prevState,
                studentCount: 0
            }
        });
    }

    const handleHideClick = () => {
        setState((prevState) => {
            return {
                ...prevState,
                hideInstructor: (!prevState.hideInstructor)
            }
        });
    }

    return(
            <div className="p-3">
                <span className="h4 text-success pe-2">Instructor</span>
                <i className={`bi ${state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"}  
                    btn btn-success btn-sm`}
                    onClick={handleHideClick}></i>
                <br/>
                {state.instructor && (
                    <Instructor hide={state.hideInstructor} instructor={state.instructor}/>
                )}
                <div className="p-3">Render : {totalRender.current}</div>
                <div className="pt-2">
                    <span className="h4 text-success">Students</span>
                    <div>Students count : {state.studentCount}</div>
                    <button className="btn btn-success btn-sm"
                    onClick={handleAddStudent}>Add Student</button>
                    <button className="btn btn-danger btn-sm ms-2"
                    onClick={handleRemoveAllStudent}>Remove All Students</button>
                    
                    {state.studentList.map((student,index) => {
                        return (
                            <div className="row" key={index}>
                                <div>
                                    - {student.name}
                                </div> 
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    

}

export default FuncPage;