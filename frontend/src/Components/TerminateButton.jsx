//TerminateButton component
import { DeleteForeverOutlined } from '@mui/icons-material';
// Import icons from Material UI
import '../styles/TerminateButton.css';

const TerminateButton = ({ onTerminate }) => {
  return (
    <button 
      className="terminate-button" 
      onClick={onTerminate} 
      title="Terminate Account"
    >
      <DeleteForeverOutlined size={24} /> 
      Terminate Account
    </button>
  );
};

export default TerminateButton;