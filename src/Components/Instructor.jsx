import React from "react";

class Instructor extends React.Component {


    componentDidMount() {
        console.log("Mount - Instructor")
    }

    componentDidUpdate() {
        console.log("Update - Instructor")
    }

    componentWillUnmount() {
        console.log("Will UnMount - Instructor")
    }

    render() {
        if (this.props.hide) return (<div></div>)
        else {
            return(
            
            <div>
                <div className="p-2">
                    <img src={this.props.instructor.avatar} alt=""
                         style={{width:"75px"}}
                         className="border border-black border-2 rounded">
                    </img>
                </div>
                        
                Name : {this.props.instructor.name}
                <br/>
                Email : {this.props.instructor.email}
                <br/>
                Phone : {this.props.instructor.phone}
                        
            </div>
        
            )
            }
    }
}

export default Instructor;