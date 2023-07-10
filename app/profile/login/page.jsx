"use client";

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button"
import { useState } from 'react';
import Link from 'next/link';


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setChange = (e) => {
    const { name, value } = e.currentTarget
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (res.ok) {
        console.log("successful login")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card style={{ width: '20rem' }} className='mx-auto mt-3'>
      <Card.Body>
        <Card.Header>
          <Card.Title>Login</Card.Title>
        </Card.Header>
        <Form onSubmit={submitHandler}>
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

          <Button variant="primary" type="submit" className='w-100'>
            Submit
          </Button>
        </Form>
      </Card.Body>

      <Card.Footer>
        First time user?
        <Link href={"/profile/signup"} className="fw-bold text-dark"> Register</Link>
      </Card.Footer>
    </Card>
  )
}

export default Login
