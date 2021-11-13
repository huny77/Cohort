import Button from '@mui/material/Button';
import { withRouter } from 'react-router';

const WriteButton = ({ history }) => {
  const onClick = (e) => {
    history.push('/write');
  };

  return (
    <Button variant="contained" onClick={onClick}>
      코드 작성
    </Button>
  );
};

export default withRouter(WriteButton);
