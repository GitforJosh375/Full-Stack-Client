import React, { useContext, useEffect} from 'react'
import '../App.css';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';



function CreatePost() {

  const { authState } = useContext(AuthContext);
  const initialValues = {
    title: "",
    postText: "",
  }

  useEffect(() => {
    if(!authState.status) {
      navigate("/login");
    }
  })

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => { //response doesnt really matter
    
    axios.post("http://localhost:3001/posts", data, {headers: {accessToken: localStorage.getItem("accessToken") } }).then((response) => {
      navigate("/");
    });
  };

  let navigate = useNavigate();
  return (
    <div className="createPostPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema = {validationSchema}>
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span"/>
          <Field id="inputCreatePost" name="title" placeholder="(Ex. Title...)" />
      
          <label>Post: </label>
          <ErrorMessage name="postText" component="span"/>
          <Field id="inputCreatePost" name="postText" placeholder="(Ex. Post...)" />


          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
    
  )
}

export default CreatePost;
