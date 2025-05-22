import { Card, List, ListItem, ListItemText, Typography } from "@mui/material";
import './SideBar.css';
import { useState } from "react";

const SideBar = () => {
    const [examOpen, setExamOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const handleExamToggle = () => {
        setExamOpen((prev) => !prev);
    };

    const handleSettingsToggle = () => {
        setSettingsOpen((prev) => !prev);
    }

    return (
        <div className="sidebar-container">
            <div style={{ width: 250 }}>
                <Card className="exam-creation" variant="outlined" sx={{
                    mb: 2,
                    p: 2
                }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        onClick={handleExamToggle}
                        style={{ cursor: 'pointer' }}
                    >
                        Exam Management
                    </Typography>
                    {examOpen && (
                        <List>
                            <ListItem button>
                                <ListItemText primary="Exam Creation" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Manage Exams" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Schedule Exams" />
                            </ListItem>
                        </List>
                    )}
                </Card>

                <Card className="settings" variant="outlined" sx={{
                    p: 2
                }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        onClick={handleSettingsToggle}
                        style={{ cursor: 'pointer' }}>
                        Settings
                    </Typography>
                    {settingsOpen && (
                        <List>
                            <ListItem button>
                                <ListItemText primary="Account Settings" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Change Password" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Theme Mode" />
                            </ListItem>
                        </List>
                    )}
                </Card>
            </div>
        </div>
    );
}

export default SideBar;