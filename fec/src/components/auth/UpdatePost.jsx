import { Box, Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { specificPost, updatePost } from '../../apis/PostApi'

const UpdatePost = () => {
    const specData = async () => {
        const sData = await specificPost(id)
        const fData = sData.data
        setPost(fData)
        // console.log(fData)
    }
    const { id } = useParams()
    useEffect( () => {
        specData()
    }, [])
    const initialValues = {
        title: "",
        categories: [],
        sdesc: "",
        fdesc: ""
    }
    const [ post, setPost ] = useState(initialValues)
    const { title, categories, sdesc, fdesc } = post
    const onChangeValues = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()
    const updateHandler = async (e) => {
        e.preventDefault()
        updatePost(id, post)
        navigate("/")
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
            Update <br /> Existing <br /> Article
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
                onSubmit={ updateHandler }
                >
                    <TextField
                    label="Title"
                    type="text"
                    fullWidth
                    required
                    onChange={ (e) => onChangeValues(e) }
                    name="title"
                    value={ title }
                    sx={{
                        marginBottom: 1
                    }}
                    />
                    <TextField
                    label="Category"
                    type="text"
                    fullWidth
                    required
                    onChange={ (e) => onChangeValues(e) }
                    name="categories"
                    value={ categories }
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
                    onChange={ (e) => onChangeValues(e) }
                    name="sdesc"
                    value={ sdesc }
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
                    row="2"
                    onChange={ (e) => onChangeValues(e) }
                    name="fdesc"
                    value={ fdesc }
                    sx={{
                        marginBottom: 1
                    }}
                    />
                    <Button
                    type="submit"
                    variant="outlined"
                    fullWidth
                    >
                Post
              </Button>
                </form>
            </Box>
        </Container>
    </Box>
    </>
  )
}

export default UpdatePost