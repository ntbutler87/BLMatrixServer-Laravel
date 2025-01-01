import { useState, useEffect } from 'react'
import './App.css'

import matrixSDK, { MatrixStatus, statusSchema } from '@/config/MatrixSDK';
import appSettings, { AppConfig, blankConfig } from '@/config/AppSettings';
import OutputTile from '@/components2/OutputTile';
import SceneTile from '@/components2/SceneTile';
import InputTab from './Tabs/InputTab';
import OutputTab from './Tabs/OutputTab';
import ScenesTab from './Tabs/ScenesTab';
import MacrosTab from './Tabs/MacrosTab';

import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


function App() {
  const [matrixStatus, setMatrixStatus] = useState<MatrixStatus>(statusSchema);
  const [appConfig, setAppConfig] = useState<AppConfig>(blankConfig);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  
  const updateStatusState = (state: MatrixStatus) => {
    setMatrixStatus({ ...state });
  }
  useEffect(() => {
    Promise.resolve(matrixSDK.init(updateStatusState)).catch((e) => { console.log(e) });
    return (() => { Promise.resolve(matrixSDK.stopConnection()); })
  }, []);
  
  const updateConfig = (config: AppConfig) => {
    setAppConfig({...config});
  }
  useEffect( () => {
    Promise.resolve(appSettings.init(updateConfig))
      .catch((e) => { console.log(e) });
  }, [] );

  return (
    
    <div style={{background:'#006DB2', minHeight: '100svh'}}>
      <Box sx={{ bgcolor: '#006DB2', width: '100%'}}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Scenes" {...a11yProps(0)} />
            {/* <Tab label="Macros" {...a11yProps(1)} /> */}
            <Tab label="Inputs" {...a11yProps(1)} />
            <Tab label="Outputs" {...a11yProps(2)} />
            {/* <Tab label="Diagnostics" {...a11yProps(4)} /> */}
          </Tabs>
        </AppBar>
      </Box>
      <Box sx={{width: '90%', margin: '0 auto'}}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ScenesTab matrixStatus={matrixStatus} appConfig={appConfig} />
        </TabPanel>
        {/* <TabPanel value={value} index={1} dir={theme.direction}>
          <MacrosTab matrixStatus={matrixStatus} appConfig={appConfig} />
        </TabPanel> */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <InputTab matrixStatus={matrixStatus} appConfig={appConfig} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <OutputTab matrixStatus={matrixStatus} appConfig={appConfig} />
        </TabPanel>
        {/* <TabPanel value={value} index={4} dir={theme.direction}>
          <div style={{background:'rgb(225 225 225)',padding:'2em',marginTop:'1em'}}>
            <h2>Diagnostics</h2>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div>Config: {JSON.stringify(appConfig)}</div>
              <div>Status: {JSON.stringify(matrixStatus)}</div>
            </div>
          </div>
        </TabPanel> */}
      </Box>
    </div>
  )
}

export default App
