import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProfileView() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Card.Title>User Profile</Card.Title>
                    <Card.Text>
                        <strong>Username:</strong> {user.username || "Guest"}
                    </Card.Text>
                    <Card.Text>
                        <strong>Email:</strong> {user.email || "Not provided"}
                    </Card.Text>
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProfileView;
