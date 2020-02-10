import React from 'react'
import { AppBar, Tab, Tabs, Typography, Box } from '@material-ui/core';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`request-tab-panel-${index}`}
            aria-labelledby={`request-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    )
}

function a11yProps(index) {
    return {
        id: `request-tab-${index}`,
        'aria-controls': `request-tab-panel-${index}`
    }
}

export default function RequestPanel() {
    const [value, setValue] = React.useState(0);
    
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    }
    
    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleTabChange}>
                    <Tab label="Waiting" {...a11yProps(0)} />
                    <Tab label="Confirmed" {...a11yProps(1)} />
                    <Tab label="Canceled" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Waiting request
            </TabPanel>
            <TabPanel value={value} index={1}>
                Confirmed request
            </TabPanel>
            <TabPanel value={value} index={2}>
                Canceled request
            </TabPanel>
        </div>
    )
}