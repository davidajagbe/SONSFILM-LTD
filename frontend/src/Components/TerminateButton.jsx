//TerminateButton component
import DeleteIcon from '@mui/icons-material/Delete';
// Import icons from Material UI
import '../styles/TerminateButton.css';

const TerminateButton = ({ onTerminate }) => {
  return (
    <button 
      className="terminate-button" 
      onClick={onTerminate} 
      title="Terminate Account"
    >
      <DeleteIcon size={24} /> 
      Terminate Account
    </button>
  );
};

export default TerminateButton;