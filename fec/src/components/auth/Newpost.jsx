import { Box, Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../apis/PostApi'

const Newpost = () => {
    const [ title, setTitle ] = useState("")
    const [ sdesc, setSdesc ] = useState("")
    const [ fdesc, setFdesc ] = useState("")
    const [ categories, setCategories ] = useState([])
    const [ picture, setPicture ] = useState("")

    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("file", picture)
        data.append("upload_preset", "gs-blog-site")
        data.append("cloud_name", "dvlpr-202")
        axios({
            method: "post",
            url: "https://api.cloudinary.com/v1_1/dvlpr-202/image/upload/",
            data: data
        })
        .then((ddata) => {
            createPost({
                title,
                categories,
                sdesc,
                fdesc,
                url: ddata.data.secure_url
            })
            console.log("Posted!")
        })
        .catch((err) => {
            console.log(err)
        })
        setTimeout(() => {
            navigate("/profile")
        }, 500)
        // console.log(title, sdesc, fdesc, categories, picture)
    }

  return (
    <>
    <Box
    sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        minHeight: "85vh"
    }}
    >
        <Container
        maxWidth="xs"
        className="animate__animated animate__slideInLeft"
        >
            <Typography variant="h2" justifyContent="center">
            Post New Article
          </Typography>
        </Container>
        <Container
        maxWidth="xs"
        className="animate__animated animate__slideInRight"
        >
            <Box
            
            sx={{
                margin: 3
            }}>
                <form
                noValidate
                autoComplete="off"
                encType="multipart/form-data"
                onSubmit={ submitHandler }
                >
                    <TextField
                    label="Title"
                    type="text"
                    fullWidth
                    required
                    onChange={ (e) => setTitle(e.target.value) }
                    sx={{
                        marginBottom: 1
                    }}
                    />
                    <TextField
                    label="Category"
                    type="text"
                    fullWidth
                    required
                    onChange={ (e) => setCategories(e.target.value) }
                    sx={{
                        marginBottom: 1
                    }}
                    />
                    <TextField
                    label="Short Description"
                    type="text"
                    fullWidth
                    required
                    multiline
                    row="2"
                    onChange={ (e) => setSdesc(e.target.value) }
                    sx={{
                        marginBottom: 1
                    }}
                    />
                    <TextField
                    label="Description"
                    type="text"
                    fullWidth
                    required
                    multiline
                    row="3"
                    onChange={ (e) => setFdesc(e.target.value) }
                    sx={{
                        marginBottom: 1
                    }}
                    />
                    <TextField
                    type="file"
                    fullWidth
                    onChange={ (e) => setPicture(e.target.files[0]) }
                    sx={{
                        marginBottom: 1
                    }}
                    />
                    <Button type="submit" variant="outlined" fullWidth>
                Post
              </Button>
                </form>
            </Box>
        </Container>
    </Box>
    </>
  )
}

export default Newpost