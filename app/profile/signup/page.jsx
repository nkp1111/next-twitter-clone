"use client";

import Image from "next/image"
import Link from "next/link"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button"
import { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");

  const setChange = (e) => {
    const { name, value } = e.currentTarget
    // if image uploaded get image data
    if (name === "avatar") {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])

    } else {
      if (name === "name") {
        setName(value)
      } else if (name === "email") {
        setEmail(value)
      } else if (name === "password") {
        setPassword(value)
      } else if (name === "bio") {
        setBio(value)
      }
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar,
          bio,
        })
      })

      if (res.ok) {
        console.log("successful sign in")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card style={{ width: '20rem' }} className='mx-auto mt-3'>
      <Card.Body>
        <Card.Header>
          <Card.Title>Register</Card.Title>
        </Card.Header>
        <Form onSubmit={submitHandler}>
          {/* name */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="name"
              value={name} onChange={setChange} name="name" />
          </Form.Group>
          {/* email  */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="email@example.com"
              value={email} onChange={setChange} name="email" />
          </Form.Group>
          {/* password  */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password"
              value={password} onChange={setChange} name="password" />
          </Form.Group>
          {/* avatar  */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" placeholder=".png, .jpeg images" accept="image/*"
              onChange={setChange} name="avatar" />
          </Form.Group>
          {/* avatar preview */}
          {avatar &&
            <Image
              src={avatar}
              alt="avatar"
              width="50"
              height="45"
            />
          }
          {/* bio  */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Bio</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="write about yourself..."
              value={bio} onChange={setChange} name="bio" />
          </Form.Group>
          <Button variant="primary" type="submit" className='w-100'>
            Submit
          </Button>
        </Form>
      </Card.Body>

      <Card.Footer>
        Already a user?
        <Link href={"/profile/login"} className="fw-bold text-dark"> Login</Link>
      </Card.Footer>
    </Card>
  )
}

export default SignUp
