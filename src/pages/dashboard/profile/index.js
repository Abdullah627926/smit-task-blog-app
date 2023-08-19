import React, { useState } from "react";
import { Card, Avatar, Input, Button, message, Layout, Typography, Menu } from "antd";
import { updatePassword } from "firebase/auth"; // Import the updatePassword function
import { useAuth } from "@/hooks";
import Link from "next/link";


const UserProfileCard = () => {
    const { user } = useAuth();
    const [newPassword, setNewPassword] = useState("");
    console.log(user);
    const handlePasswordUpdate = async () => {
        try {
            await updatePassword(user, newPassword);
            message.success("Password updated successfully.");
            setNewPassword("");
        } catch (error) {
            console.error("Error updating password:", error);
            message.error("An error occurred while updating the password.");
        }
    };
    const { Header } = Layout
    const { signout } = useAuth()
    return (
        <div>
            <div>
                <Header>

                    <Link href="/dashboard"><Button type="link">Dahshboard</Button></Link>
                    <Link href="/"><Button type="link" onClick={signout}>Signout</Button></Link>
                </Header>
            </div>
            <div className="flex justify-center  h-[80vh] items-center">
                <Card className="max-w-xs mx-auto border rounded-md shadow-md p-4 mt-50 h-[50vh] flex justify-center items-center" >
                    {user ? (
                        <div className="flex justify-center items-start  flex-col gap-5 ">
                            <div className="flex items-center space-x-4  mt-30">
                                <Avatar size={80} src={<Avatar src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" />} />
                                <div>
                                    <h2 className="text-xl font-semibold">{user.displayName}</h2>
                                    <p className="text-gray-600">@{user.email}</p>
                                </div>
                            </div>
                            <div className="mt-4 mb-5">
                                <Input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <Button
                                    type="primary"
                                    className="mt-2"
                                    onClick={handlePasswordUpdate}
                                >
                                    Update Password
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <p>No user signed in.</p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default UserProfileCard;