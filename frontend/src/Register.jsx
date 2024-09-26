import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/web/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: confirmPassword, 
      }),
    });

    const data = await response.json(); 

    if (response.ok) {
      navigate('/'); 
    } else {
      console.error(data.message);
    }
  };
  

  return (
    <div style={{ width: '300px', marginInline: 'auto', paddingBlock: "50px"}}>
      <h2>Register</h2>
      <Form
        name="register_form"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ name, email, password, password_confirmation: confirmPassword }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter a valid email!', type: 'email' }]}
        >
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
          ]}
        >
          <Input.Password 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Account
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <p>Already have an account? <Link to="/">Login</Link></p>
      </div>

    </div>
  );
}

export default Register;
