import React, { useState } from "react";
import axios from 'axios'
import OurContext from "./ourContext";


const OurState = (props) => {
    const host = "http://127.0.0.1:7000"
    const token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5YTQ3OTYyNjhhMWJkY2VmMDNhMGY1In0sImlhdCI6MTcwNDYxMTUxMH0.EGybdIUtFASSZ34n4YGPb_E8YiHAfo28n-EhyUJRlvc"
    const [Note, setNote] = useState([]);
    const [AddedNote, setAddedNote] = useState({});

    // GET USER API CALL 📌
    const AddNote = async (noteData) =>{
        try {
        const response = await axios({
                    method: "post",
                    url:`${host}/api/note/addnote/${token}`,
                    data: noteData,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            const data = await response.data;
            setAddedNote(data.saved_user_note);
            return data;

        } catch (error) {
            console.log("AddNote error********");
            console.log(error);
        }
    }
    const GetAllNote = async (noteData) =>{
        try {
        const response = await axios({
                    method: "get",
                    url:`${host}/api/note/getallnote/${token}`,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            const data = await response.data.user_notes;
            setNote(data);
            console.log(data);
            return data;

        } catch (error) {
            console.log("AddNote error********");
            console.log(error);
        }
    }
    const DeleteNote = async (id) =>{
        try {
            // console.log(id);
        const response = await axios({
                    method: "delete",
                    url:`${host}/api/note/deletenote/${id}/${token}`,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            const data = await response.data;
            setAddedNote(data.deleted_note);
            console.log(data);
            return data;

        } catch (error) {
            console.log("DeleteNote error********");
            console.log(error);
        }
    }
        
    return <OurContext.Provider value={{AddNote, GetAllNote,AddedNote, Note, DeleteNote}}>
        {props.children}
    </OurContext.Provider>
}

export default OurState;