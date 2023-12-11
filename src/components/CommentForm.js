import React, { useState } from 'react';

export default function CommentForm({ addComment }) {
    const [formData, setFormData] = useState({
        user: '',
        text: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You may want to add validation here

        // Call the addComment function with the new comment
        addComment(formData);

        // Clear the form after submitting
        setFormData({ user: '', text: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                User:
                <input
                    type="text"
                    name="user"
                    value={formData.user}
                    onChange={handleChange}
                />
            </label>
            <label>
                Comment:
                <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit Comment</button>
        </form>
    );
}