import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./RecipeForm.css"; 

export default function RecipeForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    servings: "",
    ingredients: "",
    instructions: "",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      thumbnail: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to your email (replace with your email sending logic)
      console.log("Form data:", formData);

      // Clear the form data after submission
      setFormData({
        title: "",
        category: "",
        servings: "",
        ingredients: "",
        instructions: "",
        thumbnail: null,
      });

      // For demonstration purposes, you can add additional logic here
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f039' }} className="vh-100 d-flex align-items-center justify-content-center gradient-background">
    <div>
      <h2 className="mb-4">Do you have a recipe that is so good it should not be kept a secret? Send it to us!</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter recipe's name..."
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Category
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Appetizer, Dessert..."
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Servings
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              placeholder="How many servings..."
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="ingredients">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}  // Adjust the number of rows as needed
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Enter ingredients..."
          />
        </Form.Group>

        <Form.Group controlId="instructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}  // Adjust the number of rows as needed
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Enter instructions..."
          />
        </Form.Group>

        <Form.Group as={Row} className="mt-3">
          <Form.Label column sm="2">
            Image
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
          </Col>
        </Form.Group>

        <Button variant="dark" type="submit" className="mt-3">
          Send Recipe
        </Button>
      </Form>
      </div>
    </div>
  );
}