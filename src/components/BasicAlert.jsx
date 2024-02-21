import { useContext } from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const BasicAlert = (props) => {
  const {alertSeverity, alertContent} = props


  return (
    <div className="basic-alert fade">
      <Stack spacing={2}>
        <Alert severity={alertSeverity}>{alertContent}</Alert>
      </Stack>
    </div>
  );
}

export default BasicAlert