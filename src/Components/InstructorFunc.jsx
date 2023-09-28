import React from "react";

const InstructorFunc = (props) => {

        if (props.hide) return (<div></div>)
        else {
            return(
            
            <div>
                <div className="p-2">
                    <img src={props.instructor.avatar} alt=""
                         style={{width:"75px"}}
                         className="border border-black border-2 rounded">
                    </img>
                </div>
                        
                Name : {props.instructor.name}
                <br/>
                Email : {props.instructor.email}
                <br/>
                Phone : {props.instructor.phone}
                        
            </div>
        
            )
        }
}

export default InstructorFunc;