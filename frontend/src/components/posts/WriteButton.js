import { Button, Box } from '@mui/material';
import { withRouter } from 'react-router';

const WriteButton = ({ history }) => {
  const onClick = (e) => {
    history.push('/write');
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'row-reverse', p: 1, m: 1}}>
      <Button variant="outlined" onClick={onClick}>
        코드 작성
      </Button>
    </Box>
  );
};

export default withRouter(WriteButton);
