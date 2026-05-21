'use client';

import {useState} from "react";
import styles from "./LoginForm.module.css";

export default function LoginForm() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (event: any) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event: any) => {
        console.log("submit clicked");
        event.preventDefault();

        try {

            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message)
                return;
            }

            setMessage(data.message);
            localStorage.setItem("token", data.token);

        } catch (error) {
            console.error(error);
        }
    };

    return (

        <form onSubmit={handleSubmit} className={styles.form}>

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
                onClick={() => console.log("button clicked")}
            >Login</button>

            <p>{message}</p>

        </form>
    )
}