'use client';

import { useState } from "react";
import styles from "./RegistrationForm.module.css";

export default function RegistrationForm() {

    // to store form data
    const [formData, setFormData] = useState({
        username: "",
        age: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (event: any) => {

        // we also add checked here if we expect or have any checkbox field
        const { name, value, type } = event.target;

        setFormData({
            ...formData,
            [name]:
                type === "number" ? Number(value)
                // : type === "checkbox" ? checked
                :value
        });
    };

    const handleSubmit = async (event: any) => {

        event.preventDefault();

        try {

            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                return;
            }

            setMessage(data);

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <form onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.field}>
                <label>Username</label>

                <input
                    className={styles.input}
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label>Age</label>

                <input
                    className={styles.input}
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label>Email</label>

                <input
                    className={styles.input}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label>Password</label>

                <input
                    className={styles.input}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            <button
                className={styles.button}
                type="submit"
            > Register </button>

            <p>{message}</p>

        </form>
    );
}
